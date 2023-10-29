import { keyboard } from "@testing-library/user-event/dist/keyboard";

interface KeyboardProps {
    keyboardVals: Map<string, number>;
    keyClick: (letter: string) => void;
  }

function Keyboard({keyboardVals, keyClick} : KeyboardProps){
    const keys:string[][] = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Del']];

    return (
    <div className="flex-1 flex flex-col justify-center gap-2">
        {keys.map((row) => (
            <div key={row[1]} className="flex justify-center gap-1">
                {row.map((letter) => (
                    <button type="button" key={letter} className={`min-w-[8%] p-1 sm:py-2 
                        rounded border-1 text-center uppercase font-semibold 
                        bg-[rgb(219,219,219)] hover:bg-gray-400 active:bg-gray-500 
                        ${keyboardVals.get(letter)===1 && 'bg-yellow-400 hover:bg-[rgb(255,170,121)] active:bg-orange-500'}
                        ${keyboardVals.get(letter)===2 && 'bg-[rgb(100,209,67)] hover:bg-[rgb(78,146,57)] active:bg-[rgb(56,104,41)]'}
                        ${keyboardVals.get(letter)===3 && 'bg-[rgb(97,95,95)] hover:bg-[rgb(80,76,76)] active:bg-[rgb(53,51,51)]'}
                        ${keyboardVals.get(letter)!==0 && 'text-white'}
                        ${(letter === "Enter" || letter === "Del") && 'text-xs text-black'}`} onClick={() => keyClick(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
        ))}
    </div>
    )
}

export default Keyboard;