import React, {useContext} from 'react';
import '../assets/style/MenuNav.css'
import User from '../assets/icons/User.png';
import {useNavigate} from "react-router-dom";
import {MyContext} from "../global/MyProvider";
import {showConfirm} from "./ConfirmModal";

const MenuNav = () => {
  const navigate = useNavigate()
  const { currentUserLoggedIn, setCurrentUserLoggedIn } = useContext(MyContext);
  const logoutAccount = async () => {
    await showConfirm("Are you sure you want to logout?").then(()=>{
      setCurrentUserLoggedIn(null)
      navigate("/")
    }).catch(()=>{
      setCurrentUserLoggedIn(currentUserLoggedIn)
    })
  }

  return (
    <div>
      <div className='h-[48px] bg-[#708090] flex'>
        <div className='h-[48px] w-1/2 flex items-center'>
          <div className='border-l-[1px] border-white/25 h-[48px]'></div>
          <div className='px-4'>
            <div className='navBarIconStyle text-center'>
              <img alt="logo" src="https://cdn2.iconfinder.com/data/icons/pharmacy-57/64/herbal-herbalism-pills-medicine-supplement-512.png"/>
            </div>
          </div>
          <p className='navBarTitleStyle'>DRUGGIES: Pharmaceutical Drug Inventory Management</p>
        </div>
        
        <div className='w-1/2 text-white'>
          <nav className='float-right'>
            <ul className='h-[48px] items-center flex'>
              <li><img className='px-4' src={User} alt='User Icon'/></li>
              <li className='px-4'>Welcome, {currentUserLoggedIn}</li>
              <li onClick={logoutAccount} style={{cursor:"pointer"}} className='p-4 hover:text-blue-500'>Logout</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MenuNav;