import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/UserDuck";

const Navbar = (user) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="uk-navbar uk-navbar-container" uk-navbar="true">

            <div className="uk-navbar-left uk-margin-left">
                <div>
                    <a className="uk-navbar-toggle" href="#">
                        <span uk-navbar-toggle-icon="true"></span>
                    </a>
                    <div uk-dropdown="mode: click">
                        <ul className="uk-nav uk-dropdown-nav">
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="#">
                                    <span className="uk-margin-small-right" uk-icon="users"></span>
                                    <span className="nav-name-text">Usuarios</span>
                                </a>
                            </li>
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="#">
                                    <span className="uk-margin-small-right" uk-icon="location"></span>
                                    <span className="nav-name-text">Tiendas</span>
                                </a>
                            </li>
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="#">
                                    <span className="uk-margin-small-right" uk-icon="list"></span>
                                    <span className="nav-name-text">Inventario</span>
                                </a>
                            </li>
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="#">
                                    <span className="uk-margin-small-right" uk-icon="cart"></span>
                                    <span className="nav-name-text">Ventas</span>
                                </a>
                            </li>
                            <li className="uk-active nav-name-text">
                                <a className="uk-text-capitalize" href="#">
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
                <img src="/images/cleanvel-logo.png" width={280} alt="logo" uk-img="true" />
            </div>

            <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                    <li>
                        <a className="uk-text-capitalize" href="#">
                            <span className="nav-name-text">{user.user.name} </span>
                            <span className="uk-margin-small-left" uk-icon="user"></span>
                        </a>
                    </li>
                    <li>
                        <a className="uk-text-capitalize" href="/" onClick={handleLogout}>
                            <span className="nav-name-text">Salir</span>
                            <span class="uk-margin-small-left" uk-icon="sign-out"></span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;


