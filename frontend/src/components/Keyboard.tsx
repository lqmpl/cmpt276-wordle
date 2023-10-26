interface KeyboardProps {
    keyClick: (letter: string) => void;
  }

function Keyboard({keyClick} : KeyboardProps){
    const keys:string[][] = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Del']];

    return (
    <div className="flex-1 flex flex-col justify-center gap-2">
        {keys.map((row) => (
            <div key={row[1]} className="flex justify-center gap-1">
                {row.map((letter) => (
                    <button type="button" key={letter} className={`min-w-[8%] p-1 sm:py-2 rounded border-1 text-center uppercase font-semibold bg-[rgb(219,219,219)] hover:bg-gray-400 active:bg-gray-500 
                    ${(letter === "Enter" || letter === "Del") && 'text-xs'}`} onClick={() => keyClick(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
        ))}
    </div>
    )
}

export default Keyboard;