/** @format */

import React, { useState, useEffect, useRef, useContext } from "react";
// import useLocalStorage from "../components/useLocalStorage";

import Avatar from "@mui/material/Avatar";

import logo from "../media/images/Shopy-logo.png";
import "../styles/Header.css";
import { Link } from "react-router-dom";

import LoginModal from "../components/LogInModal";
import SearchBar from "./SearchBar";

import { LoginModalContext } from "../contexts/LoginModalContext";
import { CartContext } from "../contexts/CartContext";
import { LoginContext } from "../contexts/LoginContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faCartShopping,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import Badge from "@mui/material/Badge";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap/";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
// import Catalogue from "../pages/Catalogue";

function Header({ qty }) {
  const { quantity, setQuantity } = qty;

  const { isLoggedIn, setIsLoggedIn, user } = useContext(LoginContext);

  const [showDrop, setShowDrop] = useState(false);

  ////////////////////////MODAL

  const [show, setShow] = useContext(LoginModalContext);
  const { cart, setCart } = useContext(CartContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  ///////////////////// Closing div when click outside in searchbar
  const searchDivRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen);

  const handleDivBack = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handleDivBack);

    document.addEventListener("change", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (!searchDivRef.current.contains(e.target)) {
      // console.log(e.target);
      setIsOpen(false);
      // setIsOpen((val) => !val);
    }
  };

  // console.log(cart);

  const cartTotal = () => {
    const quantities = cart.map((product) => {
      return product.quantity;
    });

    const sum = quantities.reduce((prev, cur) => prev + cur, 0);

    return sum;
  };

  return (
    <>
      <nav className="nav-480">
        <div className="nav-480-container">
          <Link to="/">
            <div className="div-nav-480">
              <img className="logo-home" src={logo} alt="logo" />
            </div>
          </Link>
          <SearchBar
            searchDivRef={searchDivRef}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </nav>

      <Navbar
        bg="light"
        expand="lg"
        className="navbar-fix-top bottom-border nav-wrapper nav-wrapper-480"
        // className="navbar-fix-top bottom-border "
      >
        <Container fluid className="container">
          <Link to="/">
            <div>
              <img className="logo-home" src={logo} alt="" />
            </div>
          </Link>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="d-flex justify-content-between"
          >
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="cat-btn" to="/catalogue">
                <FontAwesomeIcon icon={faBarsStaggered} /> &nbsp;
                <span>Catalogue</span>
              </Link>

              {/* <NavDropdown title='Location' id='navbarScrollingDropdown'>
                <NavDropdown.Item href='#action3'>Netanya</NavDropdown.Item>
                <NavDropdown.Item href='#action4'>Tel aviv</NavDropdown.Item>

                <NavDropdown.Item href='#action5'>Hadera</NavDropdown.Item>
              </NavDropdown> */}
              {/* <Nav.Link href='#' disabled>
                Link
              </Nav.Link> */}
            </Nav>

            <SearchBar
              searchDivRef={searchDivRef}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <div className="d-flex justify-content-md-center ">
              {/* <Link className='cart' to='/cart'>
                Cart <span className='cart-badge'>({cartTotal()})</span>
              </Link> */}
              <Link className="cart color" to="/cart">
                <Badge
                  badgeContent={cartTotal()}
                  // badgeContent={sendToLocal.length}
                  color="primary"
                >
                  {/* <Badge badgeContent={cartTotal()} color="primary"> */}
                  <FontAwesomeIcon icon={faCartShopping} size="xl" />
                </Badge>
                <span>Cart</span>
              </Link>{" "}
              {<LoginModal handleClose={handleClose} />}
              {/* <Button onClick={handleShow} variant='outline-success'></Button> */}
              {isLoggedIn ? (
                <div>
                  <div className="avatar-container">
                    <Avatar onClick={() => setShowDrop(!showDrop)}>
                      {user.map((user) => {
                        return user.user_firstname.slice(0, 1);
                      })}
                      {/* {`Hello, ${
                        user.length > 0 &&
                        user.map((userName) => userName.user_firstname)
                      }`} */}
                    </Avatar>
                  </div>
                  {showDrop && (
                    <Box
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                        position: "absolute",
                      }}
                    >
                      <nav aria-label="main mailbox folders">
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => setIsLoggedIn(false)}
                            >
                              <ListItemIcon>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                              </ListItemIcon>
                              <ListItemText primary="Logout" />
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </nav>
                    </Box>
                  )}
                </div>
              ) : (
                <div onClick={handleShow} className="login-btn color">
                  <FontAwesomeIcon icon={faUser} size="xl" />
                  <span> Login</span>
                </div>
              )}
            </div>
            {/* <FontAwesomeIcon icon='fa-solid fa-cart-shopping' /> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <div>
        <img src='' />
      </div>
      <div>
        <input type='text' />
      </div>
      <div></div> */}

      {/* <BottomNavigation
        className="bottom-nav"
        showLabels
        // value={value}
        onChange={(event, newValue) => {
          // setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Recents"
          // icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          //  icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          //  icon={<LocationOnIcon />}
        />
      </BottomNavigation> */}
    </>
  );
}

export default Header;
