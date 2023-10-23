import React, { useState, useRef, useEffect } from 'react';

import Keyboard from './components/Keyboard';
import LetterGrid from './components/LetterGrid';

interface wordCheckResponseInterface {
  message: string,
  value: number,
  found: boolean,
  optionsArray: number[]
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
  function keyClick(letter: string){
    letter === "Del" ? setLetter("Backspace") : setLetter(letter);
  }

  function handleBackspace() {
    let prevLetterIndex = letterIndex - 1;
    if (prevLetterIndex >= 0) {
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

  async function handleEnter() {
    if (letterIndex > 4) {
      let concatedStr = concatStringArr(words[arrayIndex]);
      console.log(concatedStr)

      try {
        const response = await fetch(`http://localhost:4000/api/checkWord?word=${concatedStr}`);
        const jsonRes: wordCheckResponseInterface = await response.json();
        console.log(jsonRes);

        if (jsonRes.found) {
          //setLetterRowColors(jsonRes.optionsArray); 
          let wordsCopy = [...words];

          for (let i = 0; i < jsonRes.optionsArray.length; i++) {
            wordsCopy[arrayIndex][i].value = jsonRes.optionsArray[i];
          }

          setWords(wordsCopy);

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
    if (isLetter(letter) && letter !== '' && letterIndex <= 4) {
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
  }, [letter])

  return (
    <div className='h-screen flex flex-col justify-between'>
      <header className='flex justify-center align-center p-1 bg-blue-200'>
        <h1 className='text-xl'>Wordle</h1>
      </header>
      <main className='h-full flex flex-col'>
        <div className='flex-[2] flex justify-center items-center'> 
          <div ref={grid} className='w-[50vmin] min-w-[250px] max-w-[500px] grid grid-rows-6 grid-cols-5 gap-1 p-2'>
            {words.map( (word) => (
                word.map((val, index) => (
                  <LetterGrid 
                    key = {index}
                    letter = {val.letter}
                    value = {val.value}
                  />
                ))
            ) )}
          </div>
        </div>
        <Keyboard 
          keyClick = {keyClick}
        />
      </main>
    </div>
  );
}

export default App;
