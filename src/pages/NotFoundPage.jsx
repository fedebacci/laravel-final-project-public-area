import { Link } from "react-router-dom";
import pages from "../assets/js/pages";


export default function NotFoundPage () {
    return (
        <div id="404-content">
            <div className="container my-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">
                            Page not found
                        </h2>
                        <p className="text-center">
                            <Link to={pages.HOME()}>
                                Back to homepage
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};