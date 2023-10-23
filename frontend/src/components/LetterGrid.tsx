interface LGridProps {
    letter: string;
    value: number;
  }

function LetterGrid({letter, value} : LGridProps){
    return (
        <div className={`aspect-square flex justify-center items-center border-2 border-gray-400 ${value === 0 && 'bg-slate-50'} ${value === 1 && ' bg-yellow-400'} ${value === 2 && 'bg-green-400'}`}>
            {letter}
        </div>
    )
}

export default LetterGrid