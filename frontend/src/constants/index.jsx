import { RxDashboard } from "react-icons/rx";
import { MdOutlineCampaign, MdOutlinePayments } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

export const navlinks = [
  {
    id: 0,
    name: 'dashboard',
    imgUrl: <RxDashboard></RxDashboard>,
    link: '/',
  },
  {
    id: 1,
    name: 'campaign',
    imgUrl: <MdOutlineCampaign></MdOutlineCampaign>,
    link: '/create-campaign',
  },
  {
    id: 2,
    name: 'My Campaigns',
    imgUrl: <MdOutlinePayments></MdOutlinePayments>,
    link: '/my-campaigns',
  },
  {
    id: 3,
    name: 'logout',
    imgUrl: <IoIosLogOut></IoIosLogOut>,
    link: '/',
  },
];
