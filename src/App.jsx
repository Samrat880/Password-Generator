import { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // Password generator function
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_+-=`[]{}"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  // Copy to clipboard
  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      alert("Password copied to clipboard!")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3 text-2xl font-bold'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 bg-gray-700 text-white'
          placeholder='Password'
          readOnly
        />
        <button
          onClick={copyPassword}
          className='bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 shrink-0 transition-colors'
        >
          Copy
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="accent-orange-500"
          />
          <label className='text-white'>Length: <span className='font-bold'>{length}</span></label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput" className='text-white'>Include Numbers</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            id="charInput"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput" className='text-white'>Include Special Characters</label>
        </div>
        <button
          onClick={passwordGenerator}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded transition-colors font-semibold"
        >
          Generate Password
        </button>
      </div>
    </div>
  )
}

export default App
