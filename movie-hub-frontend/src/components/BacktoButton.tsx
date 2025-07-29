import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const BackToButton = ({ page }:{page: string | Number}) => {

  const navigateTo = () => {


    if (page === -1) {

       navigate(-1)


    } else if (page === "home"){

      navigate("/")


    } else {

      navigate(`/${page}`)


    }
  }



  const navigate = useNavigate()
  return (
    <Button
      onClick={navigateTo}
      variant="ghost"
      className="mb-6 hover:bg-primary/10"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back
    </Button>
  );
};

export default BackToButton;
