// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link ,useNavigate} from 'react-router-dom';
import Passwordinput from '../../components/input/Passwordinput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate =useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please set a valid email address");
      return;
    }

    if(!password){
        setError("Please enter a password");
        return
    }
    setError("")


    // Handle login logic here
    try{
      const response=await axiosInstance.post("/login",{
        email:email,
        password:password
      });
      //Handle successfull login response
      if(response.data&&response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate('/dashboard')
      }
    }
    catch (error){
      //Handle error response
      if(error.response&&error.response.data&&error.response.data.message){
        setError(error.response.data.message);
        }
        else{
          setError("An unexpected error occured, Please try again.");
        }
      }
    }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-20 px-4 sm:px-0">
  <div className="w-full max-w-md border rounded bg-white px-7 py-10">
    <form onSubmit={handleLogin}>
      <h4 className="text-2xl mb-7 text-center">Login</h4>
      <input
        type="text"
        placeholder="Email"
        className="input-box mb-4 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Passwordinput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 w-full"
      />
      {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

      <button type="submit" className="btn-primary w-full py-2 mt-4">
        Login
      </button>
      <p className="text-sm text-center my-4">
        Not registered yet?{" "}
        <Link to="/" className="font-medium text-primary underline">
          Create an Account
        </Link>
      </p>
    </form>
  </div>
</div>
    </div>
  );
};

export default Login;
