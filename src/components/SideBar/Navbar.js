import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.scss';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(false)
  const showSidebar = () => setSidebar(!sidebar);
  const [loged, setLoged] = useState(false)

  function logOff() {
    sessionStorage.removeItem("user");
  }
  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem('user'));
    if(!data){
      setLoged(false)
      console.log(data)
    }
    else{
      if (data.rol !== "admin") {
       setLoading(true);
      }
    }
  }, [])



  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  {item.path === '/sign-in' ?
                    <Link to={item.path} onClick={logOff}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link> :
                    item.path === '/team' && loading !== true ?
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link> :
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>}
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
