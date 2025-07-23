import { User } from "@/types/movie";
import { createContext, useContext, useReducer, ReactNode } from "react";

type State = {
  user: User;
  isAuthenticated: boolean,
  access: string,
  refresh: string

};

type Action =
  | { type: "LOGIN"; payload: any }
  | { type: "LOGOUT" };

const initialState: State = {
   user: null,
   isAuthenticated: false,
   access: null,
   refresh: null

}

// Reducer function
function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return action.payload
    case "LOGOUT":
      return initialState
    default:
      return state;
  }
}

// export const loginAction = (user) => {

//   return {type: "LOGIN", payload: {user,isAuthenticated: true}}

// }


const AuthContext = createContext(null)


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
