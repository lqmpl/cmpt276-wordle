import React, { useState, useRef, useEffect } from 'react'

interface timerProps {
    secs:number
}

export default function Timer({secs} : timerProps) {
    return (
        <>
        <div className={`md:pt-2 text-lg md:text-xl lg:text-3xl font-semibold
            ${secs > 10 && 'text-green-500'} ${secs <= 10 && secs > 5 && 'text-orange-400'} ${secs <= 5 && 'text-red-600'}
        `}>
            {Math.floor(secs/60)}:{(secs%60).toString().padStart(2,'0')}
        </div>
        </>
    )
}