import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { ENDPOINT } from "../data";
import { formatNumberWithCommas } from "../utils/functions";
import Loader from "../component/Loader";
import { useTimeContext } from "../context/TimeContextProvider";

interface ITaskProps {
  user: any;
  totalPoint: number;
  setTotalPoint: (status: number) => void;
  task: string[];
  setTask: (status: string[]) => void;
  setting: any;
}

const Task: React.FC<ITaskProps> = ({ user, totalPoint, setTotalPoint, task, setTask, setting }) => {
  const [isLoading, setIsLoading] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(5);
  const [tracking, setTracking] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<any>({});
  const { setTotalPoints } = useTimeContext();

  const handleMouseEvent = () => {
    if (tracking) {
      setCount((prevCount) => prevCount + 1);
      let c = count;
      console.log("This is count", c);
    }
  };

  const startTracking = () => {
    setTracking(true);
    setCount(0); // Reset count when starting to track    https://v0.dev/chat
  };

  useEffect(() => {
    if (timeRemaining === 0) {
      console.log("Time's up!", count, "currentItem", currentItem);
      setTracking(false);
      setTimeRemaining(5);
      if (count == 1) {
        console.log(">>>>>Hey");
        setTimeout(() => {
          axios
            .put(`${ENDPOINT}/api/user/task/${user?.id}`, {
              link: currentItem.link,
              profit: 10,
            })
            .then((res) => {
              if (res.data) {
                console.log("This is response for task", res.data);
                let newPoints = totalPoint + currentItem.profit;
                setTotalPoint(newPoints);
                setTotalPoints((prev) => prev + currentItem.profit);
                setTask([...task, currentItem.id]);
                toast.success(`+${currentItem.profit} $Point!`, {
                  duration: 5000,
                  position: "top-center",
                  style: {
                    marginTop: "30px",
                  },
                });
              }
              console.log("heyhey", res.data);
            })
            .catch((err) => {
              console.error("err", err);
            });
        }, 300);
      }
      setIsLoading("");
    }
  }, [timeRemaining]);

  useEffect(() => {
    let interval: any;

    if (tracking) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      window.addEventListener("click", handleMouseEvent);
      window.addEventListener("keydown", handleMouseEvent); // Optional: Count key presses as well
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", handleMouseEvent);
      window.removeEventListener("keydown", handleMouseEvent);
    };
  }, [tracking]);

  const handleFollow = (item: any) => {
    setIsLoading(item.id);
    console.log("handleFollow button is clicked!", item);
    window.open(item.link, "_blank");
    // window.open("https://v0.dev/chat", "_blank");
    setCurrentItem(item);
    startTracking();
  };

  const handleVisit = (link: any) => {
    window.open(link, "_blank");
  };

  const handleItemClick = (item: any) => {
    console.log("handleItemClick button is clicked!", item);
    if (task.includes(item.id)) {
      handleVisit(item.link);
    } else {
      handleFollow(item);
    }
  };

  return (
    <div className='w-full h-[calc(100%-40px)] overflow-x-hidden overflow-y-auto hiddenScrollBar'>
      <div className='flex flex-col justify-center items-center gap-4 text-xl text-[#acacac] font-bold pt-16 pb-6 px-12'>
        <img src='/back.jpg' alt='' className='w-2/3' loading='lazy' />
        <div className='text-3xl text-white'>Youtube Marketing</div>
      </div>
      <div className='px-6'>
        <TransitionGroup className='px-6'>
          {setting?.taskList.map((item: any, index: number) => (
            <CSSTransition key={item.id} classNames='slide' timeout={300 + 200 * index}>
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                disabled={tracking}
                className='flex w-full justify-between items-center rounded-lg px-3 py-2 cursor-pointer my-2 text-sm bg-[#110d33]'>
                <div className='flex flex-row gap-1 items-center text-[#acacac]'>
                  <img
                    src={`${item.image ? item.image : "choose.svg"}`}
                    loading='lazy'
                    alt='icon'
                    className='w-10 aspect-square'
                  />
                  <div className='flex flex-col pl-2 gap-0.5'>
                    <div className='flex flex-col'>{item.title}</div>
                    <div className='flex flex-row items-center'>
                      <img src='buffy_icon.webp' alt='' className='w-4 h-4' loading='lazy' />
                      <div className='pl-1'>+{formatNumberWithCommas(item.profit)}</div>
                    </div>
                  </div>
                </div>
                <div className='w-[10%] flex justify-center'>
                  {isLoading === item.id ? (
                    <Loader width='20' />
                  ) : (
                    <img
                      src={`${task.includes(item.id) ? "/check_green.webp" : "/next_icon.webp"}`}
                      alt=''
                      className={`${task.includes(item.id) ? "w-6 h-6" : "w-2 h-3"}`}
                      loading='lazy'
                    />
                  )}
                </div>
              </button>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};
export default Task;
