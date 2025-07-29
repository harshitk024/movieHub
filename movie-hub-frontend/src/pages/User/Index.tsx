import Header from "@/components/Header";
import { useAuth } from "@/context/authContext";
import { CircleUserRound, RefreshCcwDotIcon } from "lucide-react";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Typewriter } from "react-simple-typewriter";
import AuthorizedServicies from "@/services/authorized_reqs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ title, value, navigate }) => {
  const navigateTo = useNavigate();
  return (
    <div
      className="flex flex-col items-center p-5 font-semibold"
      onClick={() => navigateTo(navigate)}
    >
      <div>{title}</div>
      <div className="font-light">{value}</div>
    </div>
  );
};

const Index = () => {
  const { state } = useAuth();
  const [summary, setSummary] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [showTypewriter, setShowTypeWriter] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const itemsList = [
    {
      title: "Ratings",
      value: JSON.parse(localStorage.getItem("ratings")).length,
      navigate: "/ratings",
    },
    {
      title: "Watchlist",
      value: JSON.parse(localStorage.getItem("watchlist")).length,
      navigate: "/watchlist",
    },
    {
      title: "Favourites",
      value: JSON.parse(localStorage.getItem("fav")).length,
      navigate: "/favourites",
    },
    {
      title: "Other",
      value: 0,
      navigate: "/",
    },
  ];

  const handleGenerateSummary = async (e) => {
    const actionsSum = itemsList.reduce(
      (curr, initial) => curr + initial.value,
      0
    );

    if (actionsSum === 0) {
      window.alert("Rate and add your favourite movies to get the summary");
      return;
    }
    e.preventDefault();

    setIsloading(true);

    const summary = await AuthorizedServicies.getUserProfile();
    setSummary(summary.message);
    console.log(summary.message);
    setShowTypeWriter(true);
    setIsloading(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    localStorage.setItem("user-profile", JSON.stringify(summary));
    setShowTypeWriter(false);
    setIsGenerated(false);
  };

  useEffect(() => {
    if (showTypewriter && summary) {
      const estimatedTime = summary.length * 30 + 1000;
      const timer = setTimeout(() => {
        setIsGenerated(true);
      }, estimatedTime);

      return () => clearTimeout(timer);
    }
  }, [showTypewriter, summary]);

  useEffect(() => {
    const savedSummary = JSON.parse(localStorage.getItem("user-profile"));

    setSummary(savedSummary);
    setIsSaved(true);
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row w-full bg-gradient-to-r from-primary/50 via-primary/20 to-background border-b border-border backdrop-blur-sm">
        <div className="flex flex-1 justify-start items-center p-5">
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center md:items-start w-full">
            <div>
              <CircleUserRound
                strokeWidth={0.5}
                height={"15em"}
                width={"15em"}
              />
            </div>
            <div className="mt-7">
              <h1 className="text-5xl">{state.user.username}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="grid grid-cols-2 gap-5 p-10 md:p-0">
            {itemsList.map(({ title, value, navigate }) => (
              <div
                key={title}
                className="bg-primary/30 w-40 hover:bg-primary/50 "
              >
                <Item title={title} value={value} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="p-10 flex-1">
          <div>
            <h1 className="text-4xl font-light">Your Movie Profile</h1>
          </div>
          <div className="mt-6 text-lg text-muted-foreground">
            Ever wondered what kind of movie lover you are? 🎥
            <br />
            Click below to discover your personalized{" "}
            <span className="font-medium text-primary">Movie Persona</span> —
            built from your favorite films and ratings.
          </div>
          <h2 className="text-xl font-semibold text-foreground mt-6">
            What’s This About?
          </h2>
          <p className="text-md text-muted-foreground mt-1 max-w-prose">
            This feature analyzes your ratings and liked movies to create a fun,
            AI-style description of your movie-watching personality.
          </p>
          <button
            className="mt-6 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition"
            onClick={handleGenerateSummary}
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
            {isLoading ? null : (
              <>
                {" "}
                <span>Generate Summary</span>
                <PsychologyIcon fontSize="small" />
              </>
            )}
          </button>{" "}
          {showTypewriter ? (
            <div className="max-w-2xl mt-6 px-4 py-4 bg-white shadow-md rounded-lg text-base leading-relaxed text-gray-800 space-y-4">
              {isLoading ? (
                <div>Generating....</div>
              ) : (
                <Typewriter
                  words={[summary]}
                  key={summary}
                  loop={1}
                  cursorStyle="_"
                  typeSpeed={30}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              )}
            </div>
          ) : null}
          {isGenerated ? (
            <div className="mt-5 flex gap-4">
              <Button variant="outline" onClick={handleSave}>
                Save
              </Button>
              <Button variant="default">
                Regenerate <RefreshCcwDotIcon />
              </Button>
            </div>
          ) : null}
        </div>
        <div className="flex-1 p-5 flex justify-center items-start">
          <div className="w-full h-[60vh] mt-6 p-7 bg-white shadow-md rounded-lg leading-relaxed  space-y-4 overflow-auto">
            <div className="text-3xl font-light">
              {state.user.username} Movie Profile
            </div>
            <div>
              <div className="h-full w-full flex items-center flex-col justify-center text-gray-500 mt-10">
                {isSaved ? (
                  summary
                ) : (
                  <>
                    <p>No profile generated yet</p>
                    <p>
                      Click on{" "}
                      <span className="bg-primary text-white p-1 text-xs rounded-sm">
                        Generate Summary
                      </span>{" "}
                      to generate your Movie Profile and Save
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            MovieMind - Your gateway to cinematic discovery
          </p>
          <p className="text-muted-foreground/70 text-sm mt-2">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
