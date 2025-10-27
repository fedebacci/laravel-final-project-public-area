import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import ResourceCard from "../../components/resources/ResourceCard";
import { useNavigate } from "react-router-dom";
import ResourcesList from "../../components/resources/ResourcesList";

export default function ResourcesShowPage ({ resourceType }) {
    // # Comment for error of resource not defined when going from game to card (but doen't give it when going to deck)
    // console.debug('⚪ resourceType inside: ResourcesShowPage', resourceType);

    const { id } = useParams();
    // console.log(id);
    const navigate = useNavigate();




    const requestUrl = apiUrl + resourceType + '/' + id;

    const [resource, setResource] = useState(null);
    const { setIsLoading } = useLoader();

    // let payload = new FormData();
    // if (resourceType == 'games') {
    //     // Add to request filter to get the right cards
    //     payload.append('game_id', id);
    // }


    useEffect(() => {
        fetchResources();
    }, [resourceType]);
    function fetchResources () {
        setIsLoading(true);
        axios
            // .get(`${requestUrl}`, payload)
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.resource);
                setResource(response.data.resource);
                // setResource(response.data);
            })
            .catch(error => {
                // console.warn(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
                setResource(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    return (
        <section id="ResourcesShowPage-content">
            <div className="container my-5">

                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Go back
                </button>

                {/* <h2 className='text-center'>
                    ResourcesShowPage - {resourceType.slice(0, -1)}: #{id}
                </h2> */}
                {
                    resource != null ?
                        <>
                            <h2 className='text-center'>
                                {resource.name}
                            </h2>
                            <div className="description mb-3">
                                <pre>
                                    {resource.description}
                                </pre>
                            </div>
                            {
                                resourceType == 'games' ?
                                    <>
                                        <h3>
                                            Cards
                                        </h3>
                                        <div className="row g-3 mb-3">
                                            {
                                                resource.cards?.map(card => {
                                                    // # First test of solving error of resource not defined when going from game to card (but doen't give it when going to deck)
                                                    // - test not working but not so important, leaving from now
                                                    // todo: if there is time come back to solve this, if not leave this way 
                                                    // card.game = resource;
                                                    return (
                                                        <div className="col-12 col-md-3 col-lg-2" key={card.id}>
                                                            <ResourceCard resource={card} resourceType={'cards'}/>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                        <h3>
                                            Decks
                                        </h3>
                                        <div className="row g-3 mb-3">
                                            {
                                                resource.decks?.map(deck => {
                                                    return (
                                                        <div className="col-12 col-md-3 col-lg-2" key={deck.id}>
                                                            <ResourceCard resource={deck} resourceType={'decks'}/>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>                                        
                                    </>
                                :
                                    <>
                                        {
                                            resourceType == 'cards' ?
                                                <>
                                                    <h3>
                                                        Decks that contain this card
                                                    </h3>
                                                    <div className="row g-3 mb-3">
                                                        {
                                                            resource.decks?.map(deck => {
                                                                return (
                                                                    <div className="col-12 col-md-3 col-lg-2" key={deck.id}>
                                                                        <ResourceCard resource={deck} resourceType={'decks'}/>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>                                        
                                                </>
                                            :
                                                <>
                                                    <h3>
                                                        Cards contained in this deck
                                                    </h3>
                                                    <div className="row g-3 mb-3">
                                                        {
                                                            resource.cards?.map(card => {
                                                                return (
                                                                    <div className="col-12 col-md-3 col-lg-2" key={card.id}>
                                                                        <ResourceCard resource={card} resourceType={'cards'}/>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>                                        
                                                </>   
                                        }    


                                        {/* # # If present gives error of resource not defined when going from game to card (but doen't give it when going to deck) */}
                                        {/* <h3>
                                            Game: 
                                        </h3>  
                                        <div className="row g-3">
                                            <div className="col-12 col-md-3">
                                                <ResourceCard resource={resource.game} resourceType={'games'}/>
                                            </div>
                                        </div> */}
                                    </> 
                            }

                            
                            <hr />
                            <div>
                                <ResourcesList resourceType={'games'}/>
                            </div>
                        </>


                    :
                        <p className="alert alert-warning">
                            Resource not found
                        </p>
                }


            </div>
        </section>
    );
};