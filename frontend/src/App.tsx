import React, { useState, useRef, useEffect } from 'react';


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
        <h1 className='text-lg'>Wordle</h1>
      </header>
      <main className='h-full flex flex-col'>
        <div className='h-2/3 flex justify-center items-center'> 
          <div ref={grid} className='h-auto w-[75vw] max-w-[500px] grid grid-rows-6 grid-cols-5 gap-1 p-2'>
            {
              words[0].map((val, index) => {
                return <div key={index}
                  className={`aspect-square flex justify-center items-center border-2 ${val.value === 0 && 'bg-slate-50'} ${val.value === 1 && ' bg-yellow-400'} ${val.value === 2 && 'bg-green-400'}`}
                >
                  {val.letter}
                </div>
              })
            }
            {
              words[1].map((val, index) => {
                return <div key={index}
                  className={`aspect-square flex justify-center items-center border-2 ${val.value === 0 && 'bg-slate-50'} ${val.value === 1 && ' bg-yellow-400'} ${val.value === 2 && 'bg-green-400'}`}
                >
                  {val.letter}
                </div>
              })
            }
            {
              words[2].map((val, index) => {
                return <div key={index} className={`aspect-square flex justify-center items-center border-2 ${val.value === 0 && 'bg-slate-50'} ${val.value === 1 && ' bg-yellow-400'} ${val.value === 2 && 'bg-green-400'}`}
                >
                  {val.letter}
                </div>
              })
            }
            {
              words[3].map((val, index) => {
                return <div key={index} className={`aspect-square flex justify-center items-center border-2 ${val.value === 0 && 'bg-slate-50'} ${val.value === 1 && ' bg-yellow-400'} ${val.value === 2 && 'bg-green-400'}`}
                >{val.letter}</div>
              })
            }
            {
              words[4].map((val, index) => {
                return <div key={index} className={`aspect-square flex justify-center items-center border-2 ${val.value === 0 && 'bg-slate-50'} ${val.value === 1 && ' bg-yellow-400'} ${val.value === 2 && 'bg-green-400'}`}
                >
                  {val.letter}
                </div>
              })
            }
            {
              words[5].map((val, index) => {
                return <div key={index} className={`aspect-square flex justify-center items-center border-2 ${val.value === 0 && 'bg-slate-50'} ${val.value === 1 && ' bg-yellow-400'} ${val.value === 2 && 'bg-green-400'}`}
                >
                  {val.letter}
                </div>
              })
            }
          </div>
        </div>
        <div className='bg-red-300 h-1/3'>
            <p>keyboard here</p>
        </div>
      </main>
    </div>
  );
}

export default App;
