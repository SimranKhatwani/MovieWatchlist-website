import React , {useState }from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email , setEmail] = useState("");
      const [password ,setPassword] = useState("");
      const navigate = useNavigate();

      const handleSignup = (e) => {
  e.preventDefault();
  alert(`Logging  with email: ${email} and password: ${password}`);
  navigate('/homepage');
}

 return (
    
      <div className='flex flex-col items-center  h-screen bg-black'>

<h1 className='text-white text-7xl font-bold text-center mt-20 '>Log In </h1> <br />

  <form onSubmit={ handleSignup} className='flex flex-col space-y-4 mt-8'>
    <input type="email"
    placeholder =" Enter the existing Email"
    value ={email}
    onChange = {(e) => setEmail (e.target.value)}
    className='w-80   px-3 py-3 rounded-lg text-white text-xl placeholder-gray-400 bg-gray-900 border border-gray-700 shadow-lg  focus:outline-none focus:ring-2 focus:ring-gray-800
' /> 

     
    <input type="password" 
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className='w-80 px-3 py-3 rounded-lg text-white text-xl placeholder-gray-400 bg-gray-900 border border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-800
'/>

    
    
    <button
    type ="submit"
    className='text-white bg-red-600 w-80 font-semibold rounded-lg py-3  text-xl shadow-lg hover:bg-red-700 transition duration-200'
     >
      Log In
    </button>
    </form>

    <p className='text-white text-lg font-light text-center mt-10'>
      By logging you agree to the Terms Of Service and <br /> Privacy Policy
    </p>

    </div>
  )
}  
    

export default Login