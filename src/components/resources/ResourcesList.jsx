import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
// import { useLoader } from "../../contexts/LoaderContext";
import ResourceCard from "./ResourceCard";
import { Link } from "react-router-dom";
import { useResources } from "../../contexts/ResourcesContext";




export default function ResourcesList ({ resourceType, isHome = null }) {
    
    const { setPageLink, resources, fetchResources, homeGames, homeCards, homeDecks } = useResources();
    // const { setPageLink, resources, fetchResources } = useResources();
    // const { setPageLink } = useResources();
    console.debug('⚙️ LOADING RESOURCE-LIST .............................................');
    console.debug('⚙️ resourceType ..........', resourceType);
    console.debug('⚙️ ..........................................................');
    let pageLink = setPageLink(resourceType);

    console.log("resourceType", resourceType);
    console.log("isHome", isHome);
    console.log("resources", resources);
    console.log("homeGames", homeGames);
    console.log("homeCards", homeCards);
    console.log("homeDecks", homeDecks);



    // let homeGames_test;
    // let homeCards_test;
    // let homeDecks_test;
    // if (isHome) {
    //     homeGames_test = [{test: "test2"}];
    //     homeCards_test = [{test: "test2"}];
    //     homeDecks_test = [{test: "test2"}];
        
    //     // const { homeGames, homeCards, homeDecks } = useResources();
    //     // console.log("homeGames", homeGames);
    //     // console.log("homeCards", homeCards);
    //     // console.log("homeDecks", homeDecks);

    //     homeGames_test = homeGames;
    //     homeCards_test = homeCards;
    //     homeDecks_test = homeDecks;
    // } else {
    //     // console.log(" ❌ homeGames", homeGames != undefined ? homeGames : " AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    //     // console.log(" ❌ homeCards", homeCards);
    //     // console.log(" ❌ homeDecks", homeDecks);
    //     console.log(" ❌ homeGames");
    //     console.log(" ❌ homeCards");
    //     console.log(" ❌ homeDecks");

    //     homeGames_test = "❌ homeGames";
    //     homeCards_test = "❌ homeCards";
    //     homeDecks_test = "❌ homeDecks";        
    // }

    // console.log("homeGames_test", homeGames_test);
    // console.log("homeCards_test", homeCards_test);
    // console.log("homeDecks_test", homeDecks_test);      
    
    let requestUrl = "";
    if (isHome) {
        const addition = resourceType == 'cards' ? 'paginatedWithImages' : 'paginated';
        console.log("addition", addition);      
        requestUrl = apiUrl + resourceType + '/' + addition;
    } else {
        requestUrl = apiUrl + resourceType;
    }
    console.log("apiUrl", apiUrl);      
    console.log("resourceType", resourceType);      
    console.log("apiUrl + resourceType", apiUrl + resourceType);      
    console.log("requestUrl", requestUrl);      


    // const [resources, setResources] = useState([]);
    // const { setIsLoading } = useLoader();

    // // useEffect(() => {
    // //     fetchResources(requestUrl, isHome, resourceType);
    // // }, []);
    // useEffect(() => {
    //     console.warn('resourceType has changed: ', resourceType)
    //     fetchResources(requestUrl, isHome, resourceType);
    // }, [resourceType]);

    // function fetchResources () {
    //     setIsLoading(true);
    //     axios
    //         .get(`${requestUrl}`)
    //         .then(response => {
    //             console.info(response.data);
    //             // console.info(response.data.message);
    //             // setResources(response.data.resources);
    //             setResources(response.data.resources.data);
    //         })
    //         .catch(error => {
    //             // console.warn(`new error on request ${requestUrl}`);
    //             console.error(error);
    //             // console.error(error.message);
    //             // console.error(error.response);
    //             // console.error(error.response.data);
    //             setResources([]);
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    // }

    return (
        <section className="py-3">
            <h2>
                <Link to={pageLink} className="text-decoration-none text-color-inherit">
                    {resourceType.toUpperCase()}
                </Link>
            </h2>
            {
                isHome != null ?
                    resourceType == "games" ?
                        
                        <>
                            <div>
                                'GAMES SECTION HOME'
                            </div>
                            <div className="row g-3">
                                {
                                    
                                    homeGames &&
                                    homeGames.map(resource => {
                                        return (
                                            <div className="col-12 col-md-3 col-lg-2" key={resource.id}>
                                                <ResourceCard resource={resource} resourceType={resourceType}/>
                                            </div>
                                        );
                                    })
                                }                            
                            </div>
                        </>
                    :
                        resourceType == "cards" ?
                            
                            <>
                                <div>
                                    'CARDS SECTION HOME'
                                </div>
                                <div className="row g-3">
                                    {
                                        homeCards &&
                                        homeCards.map(resource => {
                                            return (
                                                <div className="col-12 col-md-3 col-lg-2" key={resource.id}>
                                                    <ResourceCard resource={resource} resourceType={resourceType}/>
                                                </div>
                                            );
                                        })
                                    }     
                                </div>                     
                            </>
                        :
                            resourceType == "decks" ?
                                
                                <>
                                    <div>
                                        'DECKS SECTION HOME'
                                    </div>
                                    <div className="row g-3">
                                        {
                                            homeDecks &&
                                            homeDecks.map(resource => {
                                                return (
                                                    <div className="col-12 col-md-3 col-lg-2" key={resource.id}>
                                                        <ResourceCard resource={resource} resourceType={resourceType}/>
                                                    </div>
                                                );
                                            })
                                        }    
                                    </div>                                
                                </>
                            :
                                <div>
                                    'Resource type error' {resourceType}
                                </div>
                            
                    
                    // resourceType == "decks" &&
                    //     <div>

                    //     </div>
                :
                    resources != null && resources.length > 0 ?
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