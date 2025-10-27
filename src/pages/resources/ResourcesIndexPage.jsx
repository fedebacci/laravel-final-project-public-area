import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import ResourceCard from "../../components/resources/ResourceCard";
import ResourcesList from "../../components/resources/ResourcesList";

export default function ResourcesIndexPage ({ resourceType }) {
    const requestUrl = apiUrl + resourceType;

    const [resources, setResources] = useState([]);
    const { setIsLoading } = useLoader();
    useEffect(() => {
        fetchResources();
    }, [resourceType]);
    function fetchResources () {
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // setResources(response.data.resources);
                setResources(response.data.resources);
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
        <section id="ResourcesIndexPage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    {resourceType.toUpperCase()}
                </h2>



                {
                    resources.length > 0 ?

                    <>
                        'NORMAL'
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
                        {/* <hr />
                        <div>
                            <ResourcesList resourceType={'games'}/>
                        </div> */}
                        <hr />
                        'CLONE'
                        <div>
                            <ResourcesList resourceType={resourceType}/>
                        </div>
                    </>


                    
                    :
                    <p className="alert alert-warning m-0">
                        No {resourceType} have been found.
                    </p>

                    
                }                
            </div>
        </section>
    );
};