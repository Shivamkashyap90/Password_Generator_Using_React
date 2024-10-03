import { useEffect, useRef } from "react";
import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowd] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*_?";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, passwordGenerator, charAllowed, numberAllowed]);

  const copyPasswordToClipbord = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="w-full max-w-sm mx-auto shadow-lg rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500">
        <h1 className="text-center mb-4">Password Generator</h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="outline-none w-full py-1 px-3 rounded-full"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipbord}
            className="outline-none bg-blue-700 text-white shrink-0 px-3 py-3 rounded-full"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer w-20"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowd((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowd((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
