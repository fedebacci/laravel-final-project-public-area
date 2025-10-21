import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";

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
                setResources(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <section className="py-3">
            Resources List: {resourceType}
            <br />
            {
                resources.length > 0 ?
                resources.map(resource => {
                    return (
                        <>
                            {resource.name} <br/>
                        </>
                    );
                })
                :
                'No resources'
            }
        </section>
    );
};