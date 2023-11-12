import { NavBar } from "./components/NavBar"
import Header from "./components/Header"
export default function App() {
  return (
    <>
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <Header></Header>
      <div className='max-w-full min-w-fit min-h-fit max-h-60'>
        <div className='w-fit m-auto h-96 flex flex-col justify-center'>
          <div className=''>
            <div className='rounded-none border-4 border-black h-8 w-8 bg-white float-left'></div> 
            <div className='rounded-none border-t-4 border-b-4 border-black h-8 w-6 bg-white float-left'></div>
            <div className='rounded-none border-4 border-black h-8 w-8 bg-white float-left'></div> <br /> <br />
          </div>
          <div className='-mt-4'>
            <div className='rounded-none border-l-4 border-r-4 border-black h-6 w-8 bg-white float-left'></div> 
            <div className='rounded-none  h-6 w-6 bg-yellow-400 float-left'></div>
            <div className='rounded-none border-l-4 border-r-4 border-black h-6 w-8 bg-[#00CC00] float-left'></div> <br /><br />
          </div>
          <div className='-mt-6'>
            <div className='rounded-none border-4 border-black h-8 w-8 bg-[#00CC00] float-left'></div> 
            <div className='rounded-none border-t-4 border-b-4 border-black h-8 w-6 bg-[#00CC00] float-left'></div>
            <div className='rounded-none border-4 border-black h-8 w-8 bg-[#00CC00] float-left'></div> <br /> <br />
          </div>
        </div>
        <div className='m-auto p-12 max-w-3xl'>
          <div className='font-semibold mb-2 text-gray-500'>
            <h1 className='float-left'>SINGLE PLAYER</h1>
            <h1 className='float-right mr-20'>MULTIPLAYER</h1> <br />
          </div>
          <a href="/pages/Classic.tsx" className='font-bold h-14 w-48 p-3 border rounded-2xl border bg-gray-300 float-right text-center float-left'>Classic Wordle</a> 
          <a href="/pages/Timed.tsx" className='font-bold h-14 w-48 p-3 border rounded-2xl border bg-gray-300 float-right text-center'>Race Against Time</a> <br /><br /><br />
          <a href="/pages/Campaign.tsx" className='font-bold h-14 w-48 p-3 border rounded-2xl border bg-gray-300 text-center float-left'>Campaign Mode</a> 
          <a href="/pages/GuessMyWord.tsx" className='font-bold h-14 w-48 p-3 border rounded-2xl border bg-gray-300 float-right text-center'>Guess My Word</a> 
        </div>
      </div> 
    </>
)}
