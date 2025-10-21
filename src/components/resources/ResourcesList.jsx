import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import ResourceCard from "./ResourceCard";

export default function ResourcesList ({ resourceType }) {

    const [resources, setResources] = useState([]);
    const { setIsLoading } = useLoader();

    useEffect(() => {
        fetchResource(resourceType);
    }, []);

    function fetchResource (type) {
        setIsLoading(true);
        axios
            .get(`${apiUrl}${type}`)
            .then(response => {
                // console.info(response.data);
                // console.info(response.data.message);
                setResources(response.data.resources);
            })
            .catch(error => {
                console.error(error);
                setResources([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <section className="py-3">
            <h2>
                {resourceType.toUpperCase()}
            </h2>
            {
                resources.length > 0 ?
                <div className="row g-3">
                    {
                        resources.map(resource => {
                            return (
                                <>
                                    <div className="col-12 col-md-3 col-lg-2">
                                        <ResourceCard resource={resource} key={resource.id}/>
                                    </div>
                                </>
                            );
                        })
                    }
                </div>
                :
                <p className="alert alert-warning m-0">
                    No {resourceType} has been found
                </p>
            }
        </section>
    );
};