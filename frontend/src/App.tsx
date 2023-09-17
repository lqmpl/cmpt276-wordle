import React, { useState, useRef, useEffect } from 'react';

function App() {
  const grid = useRef(null); 
  const [ wordArray, setWordArray ] = useState<string[]>([]) 
  const [ emptyCells, setEmptyCells ] = useState<number[]>([]); 
  const [ letter , setLetter ] = useState(''); 
  const [ delOperation, setDelOperation ] = useState(false); 


  useEffect(()=>{
    function handleKeyPress(event: KeyboardEvent){
      function isLetter(character: string) {
        return /^[a-zA-Z]$/.test(character);
      }
      
      if (isLetter(event.key)){
        setLetter(event.key);
      }
      else{
        if (event.key === 'Backspace'){
          setDelOperation(true); 
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [])

  useEffect(()=>{
    if (wordArray.length < 30 && letter !== ''){
      setWordArray([...wordArray, letter]); 

      setLetter('');
    }
  }, [letter])

  useEffect(()=>{
    let emptyArray: number[] = []
    for (let i = 0; i<30-wordArray.length; i++){
      emptyArray.push(i+wordArray.length-1);
    }

    setEmptyCells(emptyArray); 
  }, [wordArray]) 

  useEffect(()=>{
    if (delOperation === true){
      setWordArray(wordArray.slice(0, -1)) 

      setDelOperation(false);
    }
  }, [delOperation])

  return (
   <>
    <div className='w-full text-center'>Wordle Prototype 0</div>
    <div className='w-full'>
      <div className='w-1/2 mx-auto h-96 flex justify-center items-center'>
          <div ref={grid} className='w-2/4 h-5/6 grid gap-4 grid-cols-5 grid-rows-6'>
              {
                wordArray.map((letter, counter)=>{
                  return (
                  <div key={counter} className='border-2 flex items-center justify-center text-xl'>{letter}</div>
                  )
                })
              }
              {
                emptyCells.map((index)=>{
                  return <div key={index} className='border-2 flex items-center justify-center text-xl'></div>
                })
              }
 

            
          </div>
      </div>
    </div>
   </>
  );
}

export default App;
