import { NavBar } from "./components/NavBar"

export default function App() {
  return (
    <>
      <NavBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <h3>HOMEPAGE - WIP</h3>
      <ul className='text-blue-500'>
        <li><a href={'/pages/Signup.tsx'}>Signup</a></li>
        <li><a href={'./pages/Login.tsx'}>Login</a></li>
        <li><a href={'/pages/Classic.tsx'}>Classic</a></li>
        <li><a href={'/pages/Timed.tsx'}>Timed Mode</a></li>
      </ul>
    </>
)}
