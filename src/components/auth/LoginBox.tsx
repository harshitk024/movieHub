// import GoogleLogin from "../ui/GoogleLogin";
import {Input} from "../ui/input";
// import {loginUser} from "../../services/users";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";

const LoginBox = ({toggleLogin,loginInput,setLoginInput}) => {


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
        <form className="flex flex-col gap-2 mt-5">
            <Input placeholder = "Enter email or username" value = {loginInput.username} onChange = {(e) => setLoginInput({...loginInput,username: e.target.value})}/>
            <Input placeholder = "Enter Password" type = "password" value = {loginInput.password} onChange = {(e) => setLoginInput({...loginInput,password: e.target.value})}/>
            <div className = "flex items-center text-sm text-cyan-700 justify-end cursor-pointer hover:underline">
                Forgot Password?
            </div>
            <button type="submit" className="bg-primary mt-4 text-white px-10 py-3 rounded-xl hover:bg-secondary-500">Continue</button>
        </form>
        <div className = "flex flex-col w-50 mt-4  ">
            <div className = "text-sm text-center opacity-50 ">Don’t have an  account?
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;