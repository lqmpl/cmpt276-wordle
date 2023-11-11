import { createContext, useState } from "react" 

export const GlobalContext = createContext('GlobalState');

export default function GlobalStateProvider({children}: any){
    return (
        <GlobalContext.Provider value={'hi'}>
            {
                children
            }
        </GlobalContext.Provider>
    )
}