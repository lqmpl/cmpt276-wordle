interface LGridProps {
    letter: string;
    value: number;
  }

function LetterGrid({letter, value} : LGridProps){
    return (
        <div className={`aspect-square flex justify-center items-center 
            border-2 border-gray-300 uppercase text-xl font-semibold 
            ${value === 0 && 'bg-slate-50'} ${value === 1 && ' bg-yellow-400'} 
            ${value === 2 && 'bg-greenlight'} ${value === 3 && 'bg-graydark'}
            ${value === 0 && 'text-gray-700'} ${value !== 0 && 'text-white'}`}>
            {letter}
        </div>
    )
}

export default LetterGrid