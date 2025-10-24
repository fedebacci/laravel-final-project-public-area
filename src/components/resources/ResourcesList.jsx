import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import ResourceCard from "./ResourceCard";
import { Link } from "react-router-dom";
import pages from "../../assets/js/pages";




export default function ResourcesList ({ resourceType }) {

    let pageLink;
    if (resourceType == 'games') {
        pageLink = pages.GAMES();
    } else if (resourceType == 'cards') {
        pageLink = pages.CARDS();
    } else if (resourceType == 'decks') {
        pageLink = pages.DECKS();
    } else {
        pageLink = '#';
    };

    const requestUrl = apiUrl + resourceType + '/' + (resourceType == 'cards' ? 'paginatedWithImages' : 'paginated');


    const [resources, setResources] = useState([]);
    const { setIsLoading } = useLoader();

    useEffect(() => {
        fetchResources();
    }, []);

    function fetchResources () {
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // setResources(response.data.resources);
                setResources(response.data.resources.data);
            })
            .catch(error => {
                // console.warn(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
                setResources([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <section className="py-3">
            <h2>
                <Link to={pageLink} className="text-decoration-none text-color-inherit">
                    {resourceType.toUpperCase()}
                </Link>
            </h2>
            {
                resources.length > 0 ?
                <div className="row g-3">
                    {
                        resources.map(resource => {
                            return (
                                <div className="col-12 col-md-3 col-lg-2" key={resource.id}>
                                    <ResourceCard resource={resource} resourceType={resourceType}/>
                                </div>
                            );
                        })
                    }
                </div>
                :
                <p className="alert alert-warning m-0">
                    No {resourceType} have been found.
                </p>
            }
        </section>
    );
};