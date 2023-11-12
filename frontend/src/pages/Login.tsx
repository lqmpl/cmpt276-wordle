import { useState, useEffect } from "react"  
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar"




export default function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function sendLoginRequest(){
        try {
            const res = await fetch('https://0indrq4mb3.execute-api.us-east-1.amazonaws.com/Prod/signin', {
                method: "POST",
                body: JSON.stringify({_id: username, password: password}),
                credentials: "include"
            });
            const resJson = await res.json();

            if (res.ok){
                navigate('/')
            }
            else{
                throw new Error("bad request"); 
            }
        } catch (error) {
            console.log(error); 
        }
    }

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-5/6 flex justify-center items-center">
                <div className="w-96 mx-auto shadow-2xl">
                    <div className="text-center my-2 font-bold text-xl">Wordle</div>
                    <div className="text-center">Log in to continue</div>
                    <div className="w-4/5 mx-auto my-2">
                        <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" className="w-full h-full border-2 border-slate-100 p-2" placeholder="Enter your username" />

                    </div>
                    <div className="w-4/5 mx-auto mb-2">
                        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="text" className="w-full h-full border-2 border-slate-100 p-2" placeholder="Enter your password" />
                    </div>
                    <div className="w-4/5 mx-auto mb-4">
                        <div onClick={sendLoginRequest} className="w-full h-full bg-blue-800 text-white rounded-sm text-center p-2 cursor-pointer hover:bg-blue-500">Login</div>
                    </div>
                    <div className="w-4/5 mx-auto mb-4 flex gap-1 flex-col ">
                        <Link to={'/sign-up'} className=" text-blue-500 cursor-pointer border-b">Create an account</Link>
                        <Link to={'/'} className=" text-blue-500 cursor-pointer">Maybe later</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}