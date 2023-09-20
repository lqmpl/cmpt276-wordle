import React, { useState, useRef, useEffect } from 'react';

function App() {
  const grid = useRef(null); 



  return (
   <>
    <div className='w-full text-center'>Wordle Prototype 0</div>
    <div className='w-full'>
      <div className='w-1/2 mx-auto h-96 flex justify-center items-center'>
          <div ref={grid} className='w-2/4 h-5/6 grid gap-4 grid-cols-5 grid-rows-6'>
         
          </div>
      </div>
    </div>
   </>
  );
}

export default App;
