import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/AuthDuck";
import Profile from "./Profile";

const Navbar = (user) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="uk-navbar uk-navbar-container" uk-navbar="true">

            <div className="uk-navbar-left uk-margin-left">
                <div>
                    <a className="uk-navbar-toggle" href="/">
                        <span uk-navbar-toggle-icon="true"></span>
                    </a>
                    <div uk-dropdown="mode: click">
                        <ul className="uk-nav uk-dropdown-nav">
                            <li className="uk-active nav-name-text">
                                <Link className="uk-text-capitalize" to="/usuarios">
                                    <span className="uk-margin-small-right" uk-icon="users"></span>
                                    <span className="nav-name-text">Usuarios</span>
                                </Link>
                            </li>
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="/">
                                    <span className="uk-margin-small-right" uk-icon="location"></span>
                                    <span className="nav-name-text">Tiendas</span>
                                </a>
                            </li>
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="/">
                                    <span className="uk-margin-small-right" uk-icon="list"></span>
                                    <span className="nav-name-text">Inventario</span>
                                </a>
                            </li>
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="/">
                                    <span className="uk-margin-small-right" uk-icon="cart"></span>
                                    <span className="nav-name-text">Ventas</span>
                                </a>
                            </li>
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="/">
                                    <span className="uk-margin-small-right" uk-icon="folder"></span>
                                    <span className="nav-name-text">Reportes</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <span className="nav-name-text">Menu</span>
            </div>

            <div className="uk-navbar-center">
                <Link to="/">
                    <img src="/images/cleanvel-logo.png" width={280} alt="logo" uk-img="true" />
                </Link>
            </div>

            <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                    <li>
                        <a className="uk-text-capitalize uk-navbar-toggle" href="/">
                            <span className="nav-name-text">{user.user.name} </span>
                            <span className="uk-margin-small-left" uk-icon="user"></span>
                        </a>
                        <div className="profile-card uk-margin-remove uk-padding-remove" uk-dropdown="mode: click">
                            <Profile />
                        </div>
                    </li>
                    <li>
                        <a className="uk-text-capitalize" href="/" onClick={handleLogout}>
                            <span className="nav-name-text">Salir</span>
                            <span className="uk-margin-small-left" uk-icon="sign-out"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;