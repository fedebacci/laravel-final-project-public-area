import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import pages from "../../assets/js/pages";

export default function Header () {
    return (
        <section id="main-header" className="sticky-top border-bottom shadow-sm bg-light">
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3">
                    <Link className='navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none' to={pages.HOME()}>
                        <img src="/vite.svg" alt={import.meta.env.VITE_APP_NAME + ' - Site logo'} />
                        <span className="fs-4" style={{color: '#EF3B2D'}}>
                            {import.meta.env.VITE_APP_NAME}
                        </span>
                    </Link>


                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}


                    {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <NavLink className='nav-link' to={pages.HOME()}>
                                    Home
                                </NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className='nav-link' to={pages.GAMES()}>
                                    Games
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to={pages.CARDS()}>
                                    Cards
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to={pages.DECKS()}>
                                    Decks
                                </NavLink>
                            </li> */}


                            <li className="nav-item dropdown">
                                <NavLink id="navbarDropdown" className="nav-link dropdown-toggle" to="/resources" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    Resources
                                </NavLink>

                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to={pages.GAMES()}>
                                        Games
                                    </NavLink>
                                    <NavLink className="dropdown-item" to={pages.CARDS()}>
                                        Cards
                                    </NavLink>
                                    <NavLink className="dropdown-item" to={pages.DECKS()}>
                                        Decks
                                    </NavLink>
                                </div>
                            </li>





                            {/* <li className="nav-item">
                                <NavLink className='nav-link' to="/test">
                                    Test 404
                                </NavLink>
                            </li> */}
                            <li className="nav-item">
                                <NavLink className='nav-link' target="_blank" to={import.meta.env.VITE_BACKOFFICE_URL}>
                                    Backoffice (Login) <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                </NavLink>
                            </li>
                        </ul>
                    {/* </div> */}
                </header>
            </div>
        </section>
    );
};