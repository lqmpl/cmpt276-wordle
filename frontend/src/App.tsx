import { Link } from "react-router-dom";
import { NavBar } from "./components/NavBar"
import Header from "./components/Header"
export default function App() {
  return (
    <>
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <Header pageType={'classic'}></Header>
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
      </div> 

      <div className="w-screen mt-4">
        <div className="w-1/2 mx-auto text-center text-xl font-bold">
          <div className="mb-6">SINGLE PLAYER</div>
          <div className="w-full flex justify-around gap-4">
            <Link to={"/classic"} className="w-1/3 bg-slate-200 rounded p-2 hover:bg-slate-100 transition-all">Classic Wordle</Link>
            <Link to={"/timed"} className="w-1/3 bg-slate-200 rounded p-2 hover:bg-slate-100 transition-all">Timed Wordle</Link>
          </div>
        </div>
      </div>
    </>
)}
