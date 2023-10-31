export default function Signup(){
    return (
        <> 
            <header className='flex justify-center align-center p-1 font-bold border-b-2 border-gray-300'>
            <h1 className='text-xl'>Wordle</h1>
            </header>
            <div className='max-w-4xl min-w-fit m-auto'>
                <div className={'min-h-fit max-h-60 m-24 py-24 px-10 border-2 border-gray-300 rounded  h-screen h-full flex flex-auto flex-col justify-center align-center font-sans'}>
                    <h1 className={'text-center text-4xl font-bold'} >Join us!</h1> <br></br><br></br><br></br><br></br>
                    <label className={'text-lg py-0.5'}>Username</label>
                    <input className={'h-8 border rounded border-gray-500'}type="text" id="signupUsername"/> <br></br>
                    <label className={'text-lg py-0.5'}>Password</label>
                    <input className={'h-8 border rounded border-gray-500'}type="text" id="signupPassword"/> <br></br>
                    <button className={'h-10 border rounded border-black bg-black text-white'} type="button">Sign Up</button><br></br>
                    <label className={'text-center text-[18px]'}>Already a member?    
                        <a href="../pages/Login.tsx link later" className='text-blue-500'> Login!</a>
                    </label>
                </div>
            </div>
        </>
    )
}