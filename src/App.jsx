import { useState, useCallback, useEffect ,useRef} from 'react'
import './App.css'

function App() {
  const [len, setlen] = useState(8);
  const [numal, numallowed] = useState(false);
  const [charal, charallowed] = useState(false);
  const [pass, setpass] = useState("")
  //useref hook
  const passwrordref =useRef("NULL")



  const passWordgenerator = useCallback(() => {
    let password = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numal) str += "0123456789"
    if (charal) str += "!@#$&"

    for (let i = 0; i < len; i++) {
      let char = Math.floor(Math.random() * str.length)
      password += str.charAt(char)
    }

    setpass(password)
  }, [len, numal, charal])


  useEffect(() => {
    passWordgenerator()
  }, [len, numal, charal, passWordgenerator,setpass])

  const copypasstoclip =useCallback(()=>{
    window.navigator.clipboard.writeText(pass)
  },[pass])

  return (
    <>
      <div className=" h-screen flex items-center justify-center bg-gray-900">
    
    <div className='border-2 border-white w-full max-w-md shadow-md rounded-lg px-4 py-6 text-orange-500 bg-gray-700'>
      
      <h1 className='text-3xl text-center text-white mb-4 '>
        Password Generator
      </h1>

      <div className='flex items-center gap-2 bg-white'>
        <input
          type="text"
          value={pass}
          className='outline-none w-full py-2 px-3 rounded text-center'
          readOnly
          ref={passwrordref}
        />

        <button
        onClick={copypasstoclip}
         className=' bg-gray-700 text-white px-3 py-2 rounded shrink-0
         hover:bg-blue-800 hover:scale-105 
             active:scale-95 active:bg-blue-900 
             transition duration-200 ease-in-out'>
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type="range"
          min={6}
          max={42}
          value={len}
          className='cursor-pointer'
          onChange={(e) =>{setlen(e.target.value)}}
          />
          <label >Length:{len}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numal}
          id="numberInput"
          onChange={()=>{
            numallowed((prev)=> !prev);
          }}
          />
          <label >Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charal}
          id="numberInput"
          onChange={()=>{
            charallowed((prev)=> !prev);
          }}
          />
          <label >Characters</label>
        </div>
      </div>

    </div>

  </div>
     
        
      
     
    </>
  )
}

export default App           