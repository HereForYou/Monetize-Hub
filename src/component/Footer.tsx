import { footerTabs } from "../utils/constants";

interface IFooterProps {
  tab: string;
  setTab: (status: string) => void;
}

const Footer: React.FC<IFooterProps> = ({ tab, setTab }) => {
  const handleClick = (tab: string) => {
    setTab(tab);
  };
  return (
    <div className='footer flex justify-around absolute z-50 h-[60px] w-full bottom-0 items-center px-4 rounded-2xl'>
      {footerTabs.map((item, index) => (
        <div
          key={index}
          onClick={() => handleClick(item.id)}
          className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition 
              ${item.id === tab ? "scale-[110%]" : "opacity-60"}`}>
          <div
            className={`flex flex-col items-center justify-center font-extrabold ${
              item.id === tab && "border-b-2 border-[#fff]"
            } gap-1`}>
            <img src={item.img} alt='play' className='w-5 h-5' loading='lazy' />
            <h3 className='text-[10px]'>{item.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Footer;
