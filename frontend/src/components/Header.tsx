import { useEffect } from "react"
import { Link } from "react-router-dom"
import { AiOutlineFieldTime } from "react-icons/ai"

interface propType {
    pageType: string
}

export default function Header(props: propType) {
    return (
        <>
            <div className="w-full h-20 flex justify-around gap-10 border-b-2 border-black">
                <div className="w-1/4"></div>
                <div className="w-1/4 text-center flex flex-col justify-center text-4xl font-bold">Wordle</div>


                <div className="w-1/4 flex items-center gap-4">
                    <Link to={'/sign-up'} className="w-1/4 flex justify-center items-center h-1/2 bg-blue-500 text-white rounded-sm cursor-pointer">Sign up</Link>
                    <Link to={'/login'} className="w-1/4 flex justify-center items-center h-1/2 bg-blue-500 text-white rounded-sm cursor-pointer">Login</Link>

                    {
                        props.pageType === 'classic' ?
                            (<Link to={'/timed'} className="w-1/3 flex justify-center items-center h-1/2 bg-red-500 text-white rounded cursor-pointer gap-1">
                                Timed mode
                                <AiOutlineFieldTime></AiOutlineFieldTime>
                            </Link>)
                            :
                            (<Link to={'/'} className="w-1/3 flex justify-center items-center h-1/2 bg-green-500 text-white rounded cursor-pointer gap-1">
                                Classic mode
                                <AiOutlineFieldTime></AiOutlineFieldTime>
                            </Link>)
                    }


                </div>
            </div>
        </>
    )
}