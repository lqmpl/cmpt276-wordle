import { cellValueInterface } from "../logic/baseWordle";
import LetterBox from "./LetterBox";

interface WGridProps {
    grid : any
    words : cellValueInterface[][]
}

export default function WordsGrid({grid, words}:WGridProps){
    return (
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
    )
}