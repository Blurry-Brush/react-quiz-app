import React, { useState } from 'react'

export default function Start({setUsername}) {

    const [input,setInput] = useState("anonymous");
    const handleClick = () => {
        //when there is a value entered then only update the username
        setUsername(input);
    }
  return (
    <div className='start'>
    <input onChange={(e)=> setInput(e.target.value)} placeholder='Enter Your Name' name="inputbtn" className='startInput'/>
    <button onClick={handleClick} type="submit" className='startButton'>Start</button>

    </div>
  )
}
