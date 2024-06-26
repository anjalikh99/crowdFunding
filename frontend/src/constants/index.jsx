import { RxDashboard } from "react-icons/rx";
import { MdOutlineCampaign, MdOutlinePayments } from "react-icons/md";
import { PiHandWithdraw } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: <RxDashboard></RxDashboard>,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: <MdOutlineCampaign></MdOutlineCampaign>,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: <MdOutlinePayments></MdOutlinePayments>,
    link: '/',
  },
  {
    name: 'withdraw',
    imgUrl: <PiHandWithdraw></PiHandWithdraw>,
    link: '/',
  },
  {
    name: 'profile',
    imgUrl: <CgProfile></CgProfile>,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: <IoIosLogOut></IoIosLogOut>,
    link: '/',
  },
];
