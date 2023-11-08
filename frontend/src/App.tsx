import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <h3>HOMEPAGE - WIP</h3>
      <ul className='text-blue-500'>
        <li><Link to={'/sign-up'}>Sign up</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/classic'}>Classic mode</Link></li>
        <li><Link to={'/timed'}>Timed</Link></li>
      </ul>
    </>
)}

