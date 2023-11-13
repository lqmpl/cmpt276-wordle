import { useState, useRef, useEffect } from 'react';

import { wordCheckResponseInterface, cellValueInterface, wordsArr, keyboardArr } from '../logic/baseWordle';
import { isLetter, concatStringArr } from '../logic/stringFunctions';

import Header from '../components/Header'
import Keyboard from '../components/Keyboard';
import WordsGrid from '../components/WordsGrid';
import Timer from '../components/Timer';
import ScoreDisplay from '../components/ScoreDisplay';
import GameOver from '../components/GameOver';
import { NavBar } from '../components/NavBar';

export default function Timed() {
  const grid = useRef(null);

  const [words, setWords] = useState<cellValueInterface[][]>(structuredClone(wordsArr));

  const [keyboardVals, setKeyboardVals] = useState<Map<string, number>>(keyboardArr);

  const [letter, setLetter] = useState<string>('');
  const [arrayIndex, setArrayIndex] = useState<number>(0);
  const [letterIndex, setLetterIndex] = useState<number>(0);

  // states are "ready". "running", & "over"
  const [gameStatus, setGameStatus] = useState<string>("ready");
  const [secs, setSecs] = useState<number>(0);

  const [score, setScore] = useState<number>(0);

  const [animate, setAnimate] = useState<{ i: number, type: string | null }>({ i: 0, type: null });

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


      wordLineCopy[prevLetterIndex]['letter'] = '';
      wordsCopy[arrayIndex] = wordLineCopy;

      setWords(wordsCopy);

      setLetterIndex(prevLetterIndex);
    }
  }

  async function handleEnter() {
    if (letterIndex > 4 && arrayIndex < 6) {
      let concatedStr = concatStringArr(words[arrayIndex]);

      try {
        const response = await fetch(`https://0indrq4mb3.execute-api.us-east-1.amazonaws.com/Prod/computescore`, {
          method: "POST",
          body: JSON.stringify({ word: concatedStr }),
          credentials: "include"
        });
        const jsonRes: wordCheckResponseInterface = await response.json();

        if (jsonRes.found) {
          let wordsCopy = structuredClone(words);
          let kValsCopy = new Map(keyboardVals);

          for (let i in jsonRes.optionsArray) {

            // if the letter's been checked & it's not in word, make val 3 (dark grey)
            // could probably fix this in backend - couldn't get to work
            if (jsonRes.optionsArray[i] === 0) {
              jsonRes.optionsArray[i] = 3;
            }

            wordsCopy[arrayIndex][i].value = jsonRes.optionsArray[i];

            const curLetter = wordsCopy[arrayIndex][i].letter;

            // if the letter val is already 2 (confirmed) or 3 (not present), colour shouldn't change
            //  otherwise, change its corresponding key in the keyboard to match cur value
            if (keyboardVals.get(curLetter)! < 2) {
              kValsCopy.set(curLetter, jsonRes.optionsArray[i]);
            }
          }

          let arrayIndexCopy: number = arrayIndex;
          arrayIndexCopy += 1;

          setAnimate({ i: arrayIndex, type: "blink" });
          setTimeout(() => setAnimate({ i: -1, type: null }), 300);

          setArrayIndex(arrayIndexCopy)
          setLetterIndex(0);

          setWords(wordsCopy);
          setKeyboardVals(kValsCopy);

          // win
          if (jsonRes.win === true) {
            setArrayIndex(6);
            setScore(score + (6 - arrayIndex));

            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // incorrect input (less than 5 chars)
      setAnimate({ i: arrayIndex, type: "shake" });
      setTimeout(() => setAnimate({ i: -1, type: null }), 300);
    }
  }

  function restartGame() {
    resetWord();
    setGameStatus("ready");
  }

  // clears the grid & keyboard
  function resetWord() {
    setWords(structuredClone(wordsArr));
    setLetter('');
    setArrayIndex(0);
    setLetterIndex(0);
    setKeyboardVals(keyboardArr);
    setScore(0);
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (gameStatus !== "over") {
      if (isLetter(letter) && letter !== '' && letterIndex <= 4 && arrayIndex < 6) {

        if (gameStatus === "ready") {
          setGameStatus("running");
        }

        let prevWords = [...words]
        prevWords[arrayIndex][letterIndex].letter = letter;
        setWords(prevWords)
        let prevIndex = letterIndex
        prevIndex += 1;
        setLetterIndex(prevIndex)

      } else if (letter === 'Backspace') {
        handleBackspace();

      } else if (letter === 'Enter') {
        handleEnter();
      }
    }

    setLetter('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter])

  // Countdown Timer Logic

  useEffect(() => {
    if (gameStatus === "ready") {
      setSecs(15);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (secs <= 0 && gameStatus === "running") {
      setGameStatus("over");
    }
    if (gameStatus === "running") {
      const interval = setInterval(() => {
        setSecs(secs - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

  }, [secs, gameStatus]);

  return (
    <div className='h-screen flex flex-col justify-between'>
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <Header pageType={'timed'} />

      <main className='h-full flex flex-col'>
        <div className='flex justify-center items-center gap-4 md:hidden'>
          <Timer
            secs={secs}
          />
          <ScoreDisplay
            score={score}
          />
        </div>
        <div className='flex-[2] flex justify-center items-center md:p-1 lg:p-2 2xl:p-4'>
          <div className='flex-1 hidden md:inline'></div>
          <div className=''>
            <WordsGrid
              grid={grid}
              words={words}
              animate={animate}
              smaller={true}
            />
          </div>
          <div className="flex-1 hidden md:flex flex-col items-center md:gap-4 lg:gap-8 2xl:gap-14 relative right-[5vw]">
            <Timer
              secs={secs}
            />
            <ScoreDisplay
              score={score}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1 sm:gap-2 p-2 pb-2 md:pb-4 lg:pb-8 2xl:pb-12">
          <Keyboard
            keyboardVals={keyboardVals}
            keyClick={keyClick}
          />
        </div>
        {gameStatus === "over" && <GameOver
          restartGame={restartGame}
          score={score}
        />}
      </main>
    </div>
  );
}
