import React from 'react';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineCampaign, MdOutlinePayments } from "react-icons/md";
import { PiHandWithdraw } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import '../css/Sidebar.css'; // Import your custom CSS file

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul className="list-unstyled">
                <li>
                    <a href="/">
                        <RxDashboard />
                    </a>
                </li>
                <li>
                    <a href="/profile">
                        <MdOutlineCampaign />
                    </a>
                </li>
                <li>
                    <a href="/settings">
                        <MdOutlinePayments />
                    </a>
                </li>
                <li>
                    <a href="/logout">
                        <CgProfile />
                    </a>
                </li>
                <li>
                    <a href="/logout">
                        <PiHandWithdraw />
                    </a>
                </li>
                <li>
                    <a href="/logout">
                        <IoIosLogOut />
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
