interface KeyboardProps {
    keyClick: (letter: string) => void;
  }

function Keyboard({keyClick} : KeyboardProps){
    const keys:string[][] = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Del']];

    return (
    <div className="h-1/3 flex flex-col justify-center gap-2 bg-slate-700">
        {keys.map((row) => (
            <div key={row[1]} className="flex justify-center gap-2">
                {row.map((letter) => (
                    <button type="button" key={letter} className="min-w-[7%] p-1 rounded border-1  text-center uppercase bg-white hover:bg-slate-300 active:bg-slate-500" onClick={() => keyClick(letter)}>{letter}</button>
                ))}
            </div>
        ))}
    </div>
    )
}

export default Keyboard;