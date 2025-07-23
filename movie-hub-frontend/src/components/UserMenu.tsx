import { useAuth } from "@/context/authContext";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
const UserMenu = () => {

  const {dispatch} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
    localStorage.clear()
    navigate("/")
  }

  
  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-primary/10"
      >
        <User className="h-5 w-5" />
      </Button>

      <div className="absolute right-0  w-48 bg-white rounded-md shadow-lg group-hover:block hidden">
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <div className="flex gap-2 items-center">
              <User width={"15px"} />
              Profile
            </div>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <div className="flex gap-2 items-center">
              <Settings width={"15px"} />
              Settings
            </div>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <div className="flex gap-2 items-center" onClick={handleLogout}>
              <LogOut width={"15px"} color="red" />
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
