import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function Header () {
    return (
        <section id="main-header" className="sticky-top border-bottom shadow-sm">
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3">
                    <Link className='navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none' to="/">
                        <img src="/vite.svg" alt={import.meta.env.VITE_APP_NAME + ' - Site logo'} />
                        <span className="fs-4" style={{color: '#EF3B2D'}}>
                            {import.meta.env.VITE_APP_NAME}
                        </span>
                    </Link>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <NavLink className='nav-link' to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to="/test">
                                404
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' target="_blank" to={import.meta.env.VITE_BACKOFFICE_URL}>
                                Backoffice <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            </NavLink>
                        </li>
                    </ul>
                </header>
            </div>
        </section>
    );
};