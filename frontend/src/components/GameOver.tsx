interface GOProps {
    restartGame: () => void;
}

export default function GameOver({ restartGame }:GOProps){

    return (
        <>
        <div className="z-20 fixed inset-x-1/4 top-1/4 bg-gray-600 p-4
            flex flex-col justify-center items-center gap-3
        ">
            <h3>Game Over!</h3>
            <button type="button" onClick={restartGame} className="bg-white rounded p-1">Restart</button>
        </div>
        <div className="z-10 fixed w-full h-[100vh] bg-black opacity-40"></div>
        </>
    )
}