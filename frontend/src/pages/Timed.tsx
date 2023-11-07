import { useState, useRef, useEffect } from 'react';

import { wordCheckResponseInterface, cellValueInterface, wordsArr, keyboardArr } from '../logic/baseWordle';
import { isLetter, concatStringArr } from '../logic/stringFunctions';

import Header from '../components/Header'
import Keyboard from '../components/Keyboard';
import WordsGrid from '../components/WordsGrid';

export default function Timed() {
  const grid = useRef(null);

  const [words, setWords] = useState<cellValueInterface[][]>(wordsArr);

  const [keyboardVals, setKeyboardVals] = useState<Map<string, number>>(keyboardArr);

  const [letter, setLetter] = useState<string>('');
  const [arrayIndex, setArrayIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

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
      <h3>TIMED MODE - WIP</h3>
      <a href={'/'} className='text-blue-500'>Back to Home</a>
      <main className='h-full flex flex-col'>
        <div className='flex-[2] flex justify-center items-center'>
          <WordsGrid
            grid = {grid}
            words = {words}
          />
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
