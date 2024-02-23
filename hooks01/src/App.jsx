import { useState, useCallback , useEffect, useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setNumber] = useState(true);
  const [isCharacter, setChar] = useState(true);
  const [password, setPassword] = useState("");
  
  //useref hook
  const passwordRef = useRef(null);
  

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) str += "0123456789";

    if (isCharacter) str += "!@#$%^&*()_-+={}[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str[char];
    }
    setPassword(pass);
  }, [length, isCharacter, isNumber, setPassword]);

  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]) 

  useEffect(() => {
    passwordGenerator()
  }, [length, isNumber, isCharacter, passwordGenerator])
  return (
    <>
      <h1>Password Generator</h1>
      <div className="content-holder">
        <div>
          <input
            className="password"
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClip}
          >Copy</button>
        </div>
        <div>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => {
              
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
          <input
            type="checkbox"
            id="isNumber"
            defaultChecked={isNumber}
            onChange={() => {
              console.log(isNumber)
              setNumber(!isNumber)
            }}
          />
          <label htmlFor="isNumber">Number </label>

          <input
            type="checkbox"
            id="isChar"
            defaultChecked={isCharacter}
            onChange={() => setChar(!isCharacter)}
          />
          <label htmlFor="isChar">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
