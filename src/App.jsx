import { useEffect, useState } from 'react';
import './App.css'

function App() {
  
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [emailDirty , setEmailDirty] =  useState(false)
  const [passwordDirty , setPasswordDirty] =  useState(false)
  const [emailError , setEmailError] = useState("email не может быть пустым")
  const [passwordError , setPasswordError] = useState("пароль не может быть пустым")
  const [formValid , setFormValid] = useState(false)

  const BlurHandler = (e) => {
    switch (e.target.name) {
      case "email": 
      setEmailDirty(true)
      break
      case "password":
        setPasswordDirty(true)
        break
    }
  }

  useEffect( () => {
    if (emailError || passwordError) {
       setFormValid(false)
    }else {
      setFormValid(true)
    }
  } , [emailError , passwordError])
   const emailHandler = (e) => {
     setEmail(e.target.value)
     const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(!re .test(String(email).toLowerCase())){
      setEmailError("не корректный email")
    }else {
      setEmailError("")
    }
   }
   const passwordHandler = (e) => {
     setPassword(e.target.value)
     if(e.target.value.length < 3  || e.target.value.length > 10) {
       setPasswordError("Пароль должен быть длиннее 3 и маньше 10")
       if (!e.target.value){
         setPasswordError("пароль не может быть пустым")
       }
     } else{
       setPasswordError("")
     }
   }

  return (
    <div className="App">
        <form>
          <h2>Registration</h2>
          {(emailDirty && emailError) && <div style={{color:"red"}}>{emailError}</div>}
          <input onChange={e => emailHandler(e)} value={email} onBlur={e => BlurHandler(e)} name='email' type={'text'} placeholder="Enter your email"/>

          {(passwordDirty && passwordError) && <div style={{color:"red"}}>{passwordError}</div>}
          <input onChange={e => passwordHandler(e)} value={password} onBlur={e => BlurHandler(e)} name='password' type={"password"} placeholder="Enter your password..."/>
           <button disabled={!formValid} type='submit'>Registration</button>
        </form>
        
    </div>
  );
}

export default App;
