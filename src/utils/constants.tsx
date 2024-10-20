const rankAvatarThemes = [
  "bg-white text-black",
  "bg-orange-500 text-white",
  "bg-green-300 text-black",
  "bg-blue-600 text-black",
  "bg-purple-700 text-black",
  "bg-pink-200 text-black",
  "bg-pink-300 text-black",
  "bg-gray-300 text-black",
  "bg-blue-300 text-black",
  "bg-orange-300 text-black",
  "bg-purple-300 text-black",
  "bg-indigo-300 text-black",
  "bg-sky-400 text-black",
  "bg-lime-400 text-black",
  "bg-fuchsia-500 text-black",
  "bg-violet-500 text-black",
  "bg-rose-500 text-black",
  "bg-yellow-300 text-black",
  "bg-red-600 text-black",
  "bg-amber-200 text-black",
  "bg-emerald-400 text-black",
];

const ChannelData = [
  {
    id: "INVITE",
    title: "INVITE YOUR FIRST FRIEND",
    comment: "Invite a friend and earn from their Buffies",
    src: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='lucide lucide-user-plus'>
        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <line x1='19' x2='19' y1='8' y2='14' />
        <line x1='22' x2='16' y1='11' y2='11' />
      </svg>
    ),
    btnTitle: "Invite",
  },
  {
    id: "Buffy",
    title: "EARN BUFFY",
    comment: "join Buffy community and complete daily tasks",
    src: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='lucide lucide-users'>
        <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
        <path d='M16 3.13a4 4 0 0 1 0 7.75' />
      </svg>
    ),
    btnTitle: "Join",
  },
];

const earnCategories = ["Social", "Daily task"];

const footerTabs = [
  {
    id: "Channel",
    name: "Videos",
    img: "home.svg",
  },
  {
    id: "Leaderboard",
    name: "Leaderboard",
    img: "leaderboard.svg",
  },
  {
    id: "Friends",
    name: "Friends",
    img: "friend.svg",
  },
];

const cycleTime = 28800;

export { rankAvatarThemes, ChannelData, cycleTime, earnCategories, footerTabs };
