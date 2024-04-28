import React from 'react';
import { FaChartPie } from 'react-icons/fa'
import { IoIosAddCircle, IoIosPeople, IoMdSettings } from 'react-icons/io'
import Logo from "../../../assets/images/icon.png";

export const SidebarData = [

  {
    title: '',
    path: '/admin',
    icon: <img src={Logo} alt="Logo" />,
    cName: 'sidebar-text'
  },
  {
    title: 'Overview',
    path: '/admin',
    icon: <FaChartPie />,
    cName: 'sidebar-text'
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: <IoIosPeople />,
    cName: 'sidebar-text'
  },
  {
    title: 'Challenges',
    path: '/admin/challenges',
    icon: <IoIosAddCircle />,
    cName: 'sidebar-text'
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: <IoMdSettings />,
    cName: 'sidebar-text'
  }

];