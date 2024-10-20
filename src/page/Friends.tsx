import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loader from "../component/Loader";
import { toast } from "react-hot-toast";
import InviteCard from "../component/InviteCard";
import FriendCard from "../component/FriendCard";
import LimiteModal from "../component/LimiteModal";
import InviteFriendModal from "../component/InviteFriendModal";
import { ENDPOINT } from "../data";
import { useTimeContext } from "../context/TimeContextProvider";
import { BOT_URL } from "../data";

const desText = `\nJoin me because there’s a reason for spreading the BUFFY buzz. It’s now or never for the BUFFY drop!🍖`;

const Friends = ({ user, inviteRevenue, modal }: { user: any; inviteRevenue: number; modal: boolean }) => {
  const [showModal, setShowModal] = useState<boolean>(modal);
  const [inviteLink, setInviteLink] = useState<string>("");
  const [friends, setFriends] = useState<object[]>([]);
  const hasShownWarningRef = useRef(false);
  const [limiteModal, setLimiteModal] = useState<boolean>(false);
  const auth = useTimeContext();

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setInviteLink(auth?.userId);
    if (!hasShownWarningRef.current && user) {
      setLoading(true);
      axios
        .get(`${ENDPOINT}/api/user/friend/${user?.id}`, {
          headers: {
            "ngrok-skip-browser-warning": "true", // or any value you prefer
          },
        })
        // .get(`${ENDPOINT}/api/user/friend/${user?.id}`)
        .then((res) => {
          console.log("friends > res.data", res.data);
          setFriends(res.data.friendsInfo);
        })
        .catch((err) => {
          console.error(err);
        });
      hasShownWarningRef.current = true;
      setLoading(false);
    }
  }, []);

  function legacyCopy(value: string) {
    const ta = document.createElement("textarea");
    ta.value = value ?? "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }

  const handleClipBoardCopy = async () => {
    legacyCopy(`${BOT_URL}?startapp=${inviteLink}${desText}`);
    toast.success("Successfully Copied!");
  };

  return (
    <div className='flex flex-col friends-content w-full justify-start px-5 gap-2 overflow-y-auto overflow-x-hidden hiddenScrollBar'>
      <div className='w-full flex flex-col items-center justify-center pt-20 gap-4'>
        <p className="text-lg font-extrabold">Invite friends and get more points</p>
        <img src='/back.jpg' alt='friends_bg' loading='lazy' className='w-2/3' />
      </div>
      <div className='flex flex-col'>
        {loading ? (
          <div className='flex items-center justify-center w-full'>
            <Loader width='30' />
          </div>
        ) : friends.length > 0 ? (
          friends.map((friend: any) => {
            return <FriendCard key={friend.Info.userName} name={friend.Info.userName} value={friend.revenue} />;
          })
        ) : (
          <div>
            <h4 className='py-2 text-white text-lg font-extrabold'>Tap on the button to invite your friends</h4>
          </div>
        )}
      </div>
      <div className='flex w-full pt-5 px-5'>
        <InviteCard title='Invite' profit={inviteRevenue} setShowModal={setShowModal} />
      </div>
      <InviteFriendModal
        showModal={showModal}
        setShowModal={setShowModal}
        inviteLink={inviteLink}
        handleClipBoardCopy={handleClipBoardCopy}
        setLimiteModal={setLimiteModal}
        desText={desText}
      />
      <LimiteModal limitModal={limiteModal} handleClose={() => setLimiteModal(false)} />
    </div>
  );
};
export default Friends;
