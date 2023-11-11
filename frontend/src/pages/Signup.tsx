import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header"

export default function Signup(){
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 

    const [requestState, setRequestState] = useState({status: 'ok', visible: false,  message: ''}); 

    async function signUpRequest(){
        try {
            const res = await fetch('http://127.0.0.1:3000/signup', {
                method: "POST",
                body: JSON.stringify({
                    _id: username,
                    password: password                        
                }), 
                credentials: "include"
            });
            const jsonRes = await res.json(); 

            if (res.ok){
                navigate("/"); 
            }

        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(()=>{
        if (requestState.visible === true){
            setTimeout(()=>{
                setRequestState({status: 'ok', visible: false, message: ''})
            }, 3000); 
        }
    }, [requestState])

    return (
        <div className="w-screen h-screen">
            <div className="w-full h-5/6 flex justify-center items-center">
                <div className="w-96 mx-auto shadow-2xl">
                    <div className="text-center my-2 font-bold text-xl">Wordle</div>
                    <div className="text-center">Sign up to continue</div>
                    <div className="w-4/5 mx-auto my-2">
                        <input onChange={(e)=>{setUsername(e.target.value)}} value={username} type="text" className="w-full h-full border-2 border-slate-100 p-2" placeholder="Enter your username"/>
                    </div>
                    <div className="w-4/5 mx-auto mb-2">
                        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="text" className="w-full h-full border-2 border-slate-100 p-2" placeholder="Enter your password"/>
                    </div>
                    <div className="w-4/5 mx-auto mb-4">
                        <div onClick={signUpRequest} className="w-full h-full bg-blue-800 text-white rounded-sm text-center p-2 cursor-pointer hover:bg-blue-500">Sign up</div>
                    </div>
                    <div className="w-4/5 mx-auto mb-4 flex flex-col">
                        <Link to={'/login'} className=" text-blue-500 cursor-pointer border-b">Login</Link>
                        <Link to={'/'} className=" text-blue-500 cursor-pointer">Maybe later</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

