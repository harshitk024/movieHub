import React, { useState } from "react";
import { Input } from "../ui/input";
import UserService from "@/services/user";
import { UserState } from "@/types/movie";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";

interface SignupInput {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface SignupProps {
  toggleLogin: () => void;
  signupInput: SignupInput;
  setSignupInput: React.Dispatch<React.SetStateAction<SignupInput>>;
  setUser: React.Dispatch<React.SetStateAction<UserState>>
}

const SignUp: React.FC<SignupProps> = ({
  toggleLogin,
  signupInput,
  setSignupInput,
  setUser
}) => {

  const {dispatch} = useAuth()
  const navigate = useNavigate()

  
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const user = await UserService.create_user(signupInput);

    if(user !== undefined){

      dispatch({type: "LOGIN",payload: {...user,isAuthenticated:true}})
      navigate("/")

    } else {
      window.alert("Signup Failed, try again")
    }

    setSignupInput({
      name: "",
      email: "",
      username: "",
      password: "",
    });

    setUser(user)
    setIsLoading(false)
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col p-5 items-center">
        <div className="flex flex-col items-center justify-center gap-5">
          <div>
            <div className="text-center w-75 mb-3">
              <div className="h-primary">
                Welcome to <span className="text-primary">MoviesHub</span>
              </div>
              <div>Create an account and browse your favourite movies</div>
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-2 mt-5" onSubmit={handleSignup}>
          <Input
            value={signupInput.name}
            placeholder="Name"
            type="text"
            onChange={(e) =>
              setSignupInput({ ...signupInput, name: e.target.value })
            }
          />
          <Input
            value={signupInput.username}
            placeholder="Username"
            type="text"
            onChange={(e) =>
              setSignupInput({ ...signupInput, username: e.target.value })
            }
          />
          <Input
            value={signupInput.email}
            placeholder="Email"
            type="email"
            onChange={(e) =>
              setSignupInput({ ...signupInput, email: e.target.value })
            }
          />
          <Input
            value={signupInput.password}
            placeholder="Create password"
            type="password"
            onChange={(e) =>
              setSignupInput({ ...signupInput, password: e.target.value })
            }
          />

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
          </button>{" "}
        </form>
        <div className="flex flex-col w-60 my-5  ">
          <div className="text-sm text-center opacity-50 ">
            Already have an account?{" "}
            <span
              className="hover: underline cursor-pointer"
              onClick={toggleLogin}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
