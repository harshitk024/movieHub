// import GoogleLogin from "../ui/GoogleLogin";
import React, { useState } from "react";
import {Input} from "../ui/input";
import UserService from "@/services/user"
import { UserState } from "@/types/movie";
import { useNavigate } from "react-router-dom";
// import {loginUser} from "../../services/users";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";


interface LoginInput{

  username: string,
  password: string,

}

interface LoginBoxProps{

  toggleLogin: () => void;
  loginInput: LoginInput,
  setLoginInput: React.Dispatch<React.SetStateAction<LoginInput>>
  setUser: React.Dispatch<React.SetStateAction<UserState>>

}

const LoginBox: React.FC<LoginBoxProps> = ({toggleLogin,loginInput,setLoginInput,setUser}) => {

  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    setIsLoading(true)
    const user =  await UserService.login_user(loginInput)
    setUser(user)
    setLoginInput({
      username: "",
      password: ""
    })
    setIsLoading(false)
    navigate("/")


  }



  return (
    <div className="flex flex-col items-center justify-center ">
      <div className = " flex flex-col p-5 items-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <div>
            <div className="h-primary">Welcome Back</div>
          </div>
          {/* <GoogleLogin login = {login} /> */}
        </div>
        {/* <div className = "flex items-center justify-center p-8">
            <div className = "text-base opacity-50">or</div>
        </div> */}
        <form className="flex flex-col gap-2 mt-5" onSubmit={handleLogin}>
            <Input placeholder = "Enter email or username" value = {loginInput.username} onChange = {(e) => setLoginInput({...loginInput,username: e.target.value})}/>
            <Input placeholder = "Enter Password" type = "password" value = {loginInput.password} onChange = {(e) => setLoginInput({...loginInput,password: e.target.value})}/>
            <div className = "flex items-center text-sm text-cyan-700 justify-end cursor-pointer hover:underline">
                Forgot Password?
            </div>
<button
            type="submit"
            className="bg-primary mt-4 text-white px-10 py-3 rounded-xl hover:bg-secondary-500 flex justify-center gap-8"
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="6"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isLoading ? null : "Submit"}
          </button>        </form>
        <div className = "flex flex-col w-50 mt-4  ">
            <div className = "text-sm text-center opacity-50 hover:underline cursor-default" onClick={() => toggleLogin()}>Don’t have an  account?
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;