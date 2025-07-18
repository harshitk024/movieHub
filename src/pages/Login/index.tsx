import LoginBox from "../../components/auth/LoginBox";
import { Film } from "lucide-react";
import loginImage from "@/assets/samuel-regan-asante-wMkaMXTJjlQ-unsplash.webp";

import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [signupInput, setSignupInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2">
        <div className="absolute w-full">
          <img src={loginImage} className="h-screen w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-black/80 to-background/20" />
        </div>

        <div className="relative container flex items-center justify-center h-screen w-10">
          <h1 className="font-montserrat text-white ">Browse, explore, and get personalized recommendations—just for you.</h1>
        </div>
      </div>

      <div className="flex flex-col h-screen flex-1">
        <div>
          <div className="flex items-center space-x-3 p-10">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              MoviesHub
            </h1>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <LoginBox
          loginInput={loginInput}
          setLoginInput={setLoginInput}
          toggleLogin={() => {}}
        />
        </div>
        
      </div>
    </div>
  );
};

export default Login;
