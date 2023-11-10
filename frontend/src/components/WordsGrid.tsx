import { cellValueInterface } from "../logic/baseWordle";
import LetterBox from "./LetterBox";

interface WGridProps {
    grid : any;
    words : cellValueInterface[][];
    smaller? : boolean;
}

export default function WordsGrid({grid, words, smaller}:WGridProps){
    return (
        <div ref={grid} className={`w-[50vh] ${smaller && 'w-[45vh] md:w-[50vh]'} grid grid-rows-6 grid-cols-5 gap-1 sm:p-1 md:p-2 `}>
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