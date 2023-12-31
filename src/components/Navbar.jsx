import { NavLink as ReactLink, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';

function CustomNavbar(args) {

  let navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const email = localStorage.getItem('email');

  const [login,setLogin] = useState(false)
  const [user,setUser] = useState(undefined)

  useEffect(()=>{

    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())

  },[login])

  const toggle = () => setIsOpen(!isOpen);

  const logout=()=>{
    doLogout(()=>{
      setLogin(false)
      navigate("/")
    })
  }

  return (
    <div>
      <Navbar color="info" light expand="md" className='px-5'>
        <NavbarBrand tag={ReactLink} to="/">Skill-Bucks</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        <Nav className="ml-auto" navbar> {/* Added new Nav element */}
        {
          login && (
            <>
            <NavItem>
              <NavLink tag={ReactLink} to="/user/profile-info">
                Profile Info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/user/dashboard">
                {email}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{cursor:"pointer"}} onClick={logout}>
                Logout
              </NavLink>
            </NavItem>
            </>
          )
        }
        {
          !login && (
            <>
            <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                Signup
              </NavLink>
            </NavItem>
            </>
          )
        }   
          
        </Nav>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
