import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { useTelegram } from "./hooks/useTelegram";
import axios from "axios";
import { useTimeContext } from "./context/TimeContextProvider";
import { toast } from "react-hot-toast";
import Footer from "./component/Footer";
import Friends from "./page/Friends";
import Leaderboard from "./page/Leaderboard";
import { ENDPOINT } from "./data";
import Splash from "./page/Splash";
import Task from "./page/Task";
import Admin from "./page/Admin";
// import { isMobileDevice } from './utils/mobileDetect'
import { rankAvatarThemes } from "./utils/constants";
import LandingLoader from "./component/LandingLoader";
import NotFound from "./page/NotFount";
// const user = {
//   id: "72025663314",
//   username: "SmartFox",
//   first_name: "Olaf",
//   last_name: "",
// };
// const start_param = "";
function App() {
  const hasShownWarningRef = useRef(false);
  const { user, start_param } = useTelegram();
  const [inviteMsg, setInviteMsg] = useState<boolean>(false);
  const [task, setTask] = useState<string[]>([]);
  const [setting, setSetting] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<string>("");
  const [totalPoint, setTotalPoint] = useState<number>(0.0);
  const {
    rank,
    setIncreasingAmount,
    setRank,
    setTotalPoints,
    setUserId,
  } = useTimeContext();

  useEffect(() => {
    injectSpeedInsights();
    // setIsMobile(isMobileDevice())
    if (!user) {
      hasShownWarningRef.current = true;
      axios
        .get(`${ENDPOINT}/api/setting/all`, {
          headers: {
            "ngrok-skip-browser-warning": "true", // or any value you prefer
          },
        })
        .then((res) => {
          setSetting(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (user && !hasShownWarningRef.current && (tab == "Channel" || tab == "Splash" || tab == "")) {
      setUserId(user?.id.toString());
      let data = {
        userName: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
        start_param: start_param,
        style: rankAvatarThemes[Math.floor(Math.random() * 21)],
      };
      axios
        .get(`${ENDPOINT}/api/setting/all`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        })
        .then((res) => {
          console.log("Initial Response Setting > ", res.data);
          setIncreasingAmount(res?.data?.dailyRevenue);
          setLoading(true);
          setSetting(res.data);
          axios
            .post(`${ENDPOINT}/api/user/${user?.id}`, data)
            .then((response) => {
              console.log("Initial Response > ", response);
              const userData = response.data.user;
              if (response.data.signIn) setTab("Channel");
              setTotalPoints(userData.totalPoints);
              setRank(userData?.joinRank);
              setTask(userData.task);
              if (start_param && !inviteMsg && start_param != userData.inviteLink) {
                toast.success("You are invited!");
                setInviteMsg(true);
              }
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              setTab("error");
              console.error("Error occurred during POST request:", error);
            });
        })
        .catch((err) => {
          setLoading(false);
          setTab("error");
          console.error(err);
        });
    }
  }, []);

  return (
    <Router>
      {loading ? (
        <LandingLoader />
      ) : user ? (
        <div className={`h-full relative max-h-screen overflow-hidden max-w-[560px] w-full font-roboto`}>
          <div className={`flex h-screen overflow-hidden pb-4 w-full`}>
            {tab == "Splash" && <Splash ranking={rank} setTab={setTab} />}
            {tab == "Friends" && <Friends user={user} inviteRevenue={setting.inviteRevenue} modal={false} />}
            {tab == "INVITE" && <Friends user={user} inviteRevenue={setting.inviteRevenue} modal={true} />}
            {tab == "error" && <NotFound />}
            {tab == "Channel" && (
              <Task
                user={user}
                totalPoint={totalPoint}
                setTotalPoint={setTotalPoint}
                setting={setting}
                task={task}
                setTask={setTask}
              />
            )}
            {tab == "Leaderboard" && <Leaderboard user={user} />}
          </div>
          {tab !== "Splash" && tab !== "Admin" && tab !== "error" && <Footer tab={tab} setTab={setTab} />}
        </div>
      ) : (
        <Admin setting={setting} setSetting={setSetting} />
      )}
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
