import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/AuthDuck";
import Profile from "../Home/Profile";
import "./stylesHome.css"

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);
    const isAdmin = user.role === "Administrador";

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="uk-flex uk-padding-remove" uk-sticky="true">
            <nav className="uk-nav navbar-container" uk-navbar="true" uk-height-viewport="true">
                <ul className="nav-list uk-margin-small-left uk-margin-right">
                    <li className="letter-logo">
                        <Link to="/"><img src="/images/cleanvel-letter.png" width={70} alt="logo-letter" uk-img="true" /></Link>
                    </li>

                    <li>
                        <Link to="/">
                            <span className="uk-margin-small-right nav-text text2" uk-icon="icon: grid; ratio: 1.1"></span>
                            <span className="nav-text">Tablero</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/inventario">
                            <span className="uk-margin-small-right nav-text" uk-icon="icon: list; ratio: 1.1"></span>
                            <span className="nav-text">Inventario</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/productos">
                            <span className="uk-margin-small-right nav-text" uk-icon="icon: database; ratio: 1.1"></span>
                            <span className="nav-text">Productos</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/ventas">
                            <span className="uk-margin-small-right nav-text" uk-icon="icon: tag; ratio: 1.1"></span>
                            <span className="nav-text">Ventas</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/tiendas">
                            <span className="uk-margin-small-right nav-text" uk-icon="icon: location; ratio: 1.1"></span>
                            <span className="nav-text">Tiendas</span>
                        </Link>
                    </li>

                    {isAdmin &&
                        <li>
                            <Link className="uk-text-capitalize" to="/usuarios">
                                <span className="uk-margin-small-right nav-text" uk-icon="icon: users; ratio: 1.1"></span>
                                <span className="nav-text">Usuarios</span>
                            </Link>
                        </li>
                    }

                    <hr></hr>
                    <div className="uk-inline">
                        <button className="nav-button" type="button">
                            <span className="nav-text uk-margin-small-right" uk-icon="icon: user; ratio: 1.1"></span>
                            <span className="nav-text">{user.name}</span>
                        </button>
                        <div className="profile-card" uk-dropdown="mode: click" uk-drop="pos: top-right">
                            <Profile />
                        </div>
                    </div>

                    <li>
                        <a href="/" onClick={handleLogout}>
                            <span className="nav-text uk-margin-small-right" uk-icon="icon: sign-out; ratio: 1.1"></span>
                            <span className="nav-text">Salir</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default Navbar;