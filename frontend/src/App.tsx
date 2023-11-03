import React, { useState, useRef, useEffect } from 'react';

import Header from './components/Header'
import Keyboard from './components/Keyboard';
import LetterBox from './components/LetterBox';

interface wordCheckResponseInterface {
  message: string,
  value: number,
  found: boolean,
  optionsArray: number[],
  win: boolean
}

interface cellValueInterface {
  letter: string,
  value: number,

}

function App() {
  const grid = useRef(null);

  let wordsArr: cellValueInterface[][] = [
    [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
    [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
    [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
    [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
    [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
    [{ letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }, { letter: '', value: 0 }],
  ]

  const [words, setWords] = useState<cellValueInterface[][]>(wordsArr);

  const keyboardArr = new Map<string, number>();
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 
  "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].forEach(letter => (
    keyboardArr.set(letter, 0)
  ));

  const [keyboardVals, setKeyboardVals] = useState<Map<string, number>>(keyboardArr);

  const [letter, setLetter] = useState<string>('');
  const [arrayIndex, setArrayIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  function isLetter(character: string) {
    return /^[a-zA-Z]$/.test(character);
  }

  function onKeyDown(event: KeyboardEvent) {
    setLetter(event.key);
  }
  // when clicking the onscreen keyboard
  function keyClick(letter: string) {
    letter === "Del" ? setLetter("Backspace") : setLetter(letter);
  }

  function handleBackspace() {
    let prevLetterIndex = letterIndex - 1;
    if (prevLetterIndex >= 0 && arrayIndex < 6) {
      let wordsCopy = [...words];
      let wordLineCopy = wordsCopy[arrayIndex];


      wordLineCopy[prevLetterIndex]['letter'] = ''
      wordsCopy[arrayIndex] = wordLineCopy;

      setWords(wordsCopy);

      setLetterIndex(prevLetterIndex);
    }
  }

  function concatStringArr(arr: cellValueInterface[]) {
    let concatedStr = '';
    for (let i = 0; i < arr.length; i++) {
      concatedStr = concatedStr + `${arr[i].letter}`
    }

    return concatedStr;
  }

  /*

  ['A', 'P', 'P', 'L', 'E'], ArrayIndex = 0 
  ['P', 'E', 'A', 'C', 'H'] ArrayIndex = 1 
              ^
              |
            letterIndex = 2 

  ArrayIndex describes location of current word
  LetterIndex describes location of current letter in current word

  */

  async function handleEnter() {
    console.log("hey?")
    if (letterIndex > 4 && arrayIndex < 6) {
      let concatedStr = concatStringArr(words[arrayIndex]);

      try {
        const response = await fetch(`https://2ev2xiv117.execute-api.us-east-1.amazonaws.com/Prod/api/checkWord?word=${concatedStr}`);
        const jsonRes: wordCheckResponseInterface = await response.json();



        if (jsonRes.found) {
          let wordsCopy = [...words];
          let newKVals = new Map(keyboardVals);

          for (let i in jsonRes.optionsArray) {

            // if the letter's been checked & it's not in work, make val 3 (dark grey)
            // could probably fix this in backend - couldn't get to work
            if (jsonRes.optionsArray[i] === 0){
              jsonRes.optionsArray[i] = 3;
            }

            wordsCopy[arrayIndex][i].value = jsonRes.optionsArray[i];
          
            const curLetter = wordsCopy[arrayIndex][i].letter;

            // if the letter val is already 2 (confirmed) or 3 (not present), colour shouldn't change
            //  otherwise, change its corresponding key in the keyboard to match cur value
            if (keyboardVals.get(curLetter)! < 2){
              newKVals.set(curLetter, jsonRes.optionsArray[i]);
            }
          }

          setWords(wordsCopy);
          setKeyboardVals(newKVals);

          if (jsonRes.win === true) {
            setArrayIndex(6);
            /*
            You win component
            */

            return;
          }

          let arrayIndexCopy = arrayIndex;
          arrayIndexCopy += 1;

          let letterIndexCopy = letterIndex;
          letterIndexCopy = 0;

          setArrayIndex(arrayIndexCopy)
          setLetterIndex(letterIndexCopy);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (isLetter(letter) && letter !== '' && letterIndex <= 4 && arrayIndex < 6) {
      let prevWords = [...words]
      prevWords[arrayIndex][letterIndex].letter = letter;
      setWords(prevWords)
      let prevIndex = letterIndex
      prevIndex += 1;
      setLetterIndex(prevIndex)
    }
    else {
      if (letter === 'Backspace') {
        handleBackspace();
      }
      else if (letter === 'Enter') {
        handleEnter();
      }
    }
    setLetter('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter])

  return (
    <div className='h-screen flex flex-col justify-between'>
      <Header />
      <a href={'/pages/Signup.tsx'}>Signup</a>
      <main className='h-full flex flex-col'>
        <div className='flex-[2] flex justify-center items-center'>
          <div ref={grid} className='w-[50vh] grid grid-rows-6 grid-cols-5 gap-1 p-2'>
            {words.map((word) => (
              word.map((val, index) => (
                <LetterBox
                  key = {index}
                  letter = {val.letter}
                  value = {val.value}
                />
              ))
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1 sm:gap-2 p-2 pb-4 md:pb-12">
          <Keyboard
            keyboardVals = {keyboardVals}
            keyClick = {keyClick}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
