import { useState, useRef, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { wordCheckResponseInterface, cellValueInterface, wordsArr, keyboardArr } from '../logic/baseWordle';
import { isLetter, concatStringArr } from '../logic/stringFunctions';

import { GlobalContext } from '../globalState';

import Header from '../components/Header'
import Keyboard from '../components/Keyboard';
import WordsGrid from '../components/WordsGrid';
import GameOver from '../components/GameOver';
import { NavBar } from '../components/NavBar';

export default function Classic() {
  const grid = useRef(null);

  const [words, setWords] = useState<cellValueInterface[][]>(structuredClone(wordsArr));

  const [keyboardVals, setKeyboardVals] = useState<Map<string, number>>(keyboardArr);

  const [letter, setLetter] = useState<string>('');
  const [arrayIndex, setArrayIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);

  // states are "running", "victory", & "lost"
  const [gameStatus, setGameStatus] = useState<string>("running");

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
            setGameStatus("victory");

            return;
          }

          let arrayIndexCopy = arrayIndex;
          arrayIndexCopy += 1;

          let letterIndexCopy = letterIndex;
          letterIndexCopy = 0;

          setArrayIndex(arrayIndexCopy)
          setLetterIndex(letterIndexCopy);

          if (arrayIndexCopy >= 6){
            setGameStatus("lost");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function restartGame(){
    setWords(structuredClone(wordsArr));
    setLetter('');
    setArrayIndex(0);
    setLetterIndex(0);
    setKeyboardVals(keyboardArr);
    setGameStatus("running");
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
    <div className='h-screen flex flex-col justify-between gap-1'>
      
        
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
        
      <Header pageType={'classic'}/>

      <main className='h-full flex flex-col'>
        <div className='flex-[2] flex justify-center items-center md:p-1 lg:p-2 2xl:p-4'>
          <WordsGrid
            grid = {grid}
            words = {words}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 sm:gap-2 p-2 pb-2 md:pb-4 lg:pb-8 2xl:pb-12">
          <Keyboard
            keyboardVals = {keyboardVals}
            keyClick = {keyClick}
          />
        </div>
        {gameStatus !== "running" && <GameOver 
            restartGame = {restartGame}
            gameStatus = {gameStatus}
          />}
      </main>
    </div>
  );
}
