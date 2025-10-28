import { createContext, useContext } from "react";
// import { useEffect, useState } from "react";
import pages from "../assets/js/pages";
// import axios from "axios";
// import { useLoader } from "./LoaderContext";


const ResourcesContext = createContext();


// const apiUrl = import.meta.env.VITE_API_URL;


const ResourcesProvider = ({ children }) => {






    // /**
    //  * Function for creating dynamically the path to attach to the links. Depending on the presence of the second parameter 'resourceId' it can either take the user to an index or to a show page
    //  * @param {string} resourceType String that represents the type of the resources to attach the link to (games, cards, decks)
    //  * @param {number} resourceId Default: null - the id of the specific resource to show. If left null means that the route should go on the index page instead of the show page
    //  * @returns function that returns the string that represents the path to attach to the actual link
    //  */
    // function setPageLink (resourceType, resourceId = null) {
    //     if (resourceId == null) {
    //         if (resourceType == 'games') {
    //             return pages.GAMES();
    //         } else if (resourceType == 'cards') {
    //             return pages.CARDS();
    //         } else if (resourceType == 'decks') {
    //             return pages.DECKS();
    //         } else {
    //             return '#';
    //         };
    //     } else {
    //         if (resourceType == 'games') {
    //             return pages.SHOWGAME(resourceId);
    //         } else if (resourceType == 'cards') {
    //             return pages.SHOWCARD(resourceId);
    //         } else if (resourceType == 'decks') {
    //             return pages.SHOWDECK(resourceId);
    //         } else {
    //             return '#';
    //         };
    //     }
    // }
    // // todo: fix switch statement and use it instead of if-else
    // // switch (resourceType) {
    // //     case resourceType == 'games':
    // //         pageLink = pages.SHOWGAME(resource.id);
    // //         break;
    // //     case resourceType == 'cards':
    // //         pageLink = pages.SHOWCARD(resource.id);
    // //         break;
    // //     case resourceType == 'decks':
    // //         pageLink = pages.SHOWDECK(resource.id);
    // //         break;
    // //     default:
    // //         pageLink = '#';
    // //         break;
    // // }



    // const [resources, setResources] = useState([]);
    // const [homeGames, setHomeGames] = useState([]);
    // const [homeCards, setHomeCards] = useState([]);
    // const [homeDecks, setHomeDecks] = useState([]);
    // const { setIsLoading } = useLoader();

    // function fetchResources (requestUrl = "", isHome = null, resourceType = null) {
    //     if (requestUrl == "") return console.error("request URL empty");
    //     console.warn("New request to: ", requestUrl);
    //     setIsLoading(true);
    //     axios
    //         .get(`${requestUrl}`)
    //         .then(response => {
    //             console.info(response.data);
    //             // console.info(response.data.message);
    //             // setResources(response.data.resources);
                
    //             console.info("isHome in response", isHome);
    //             console.warn("New response to:", requestUrl);
    //             // if (isHome && resourceType == "games") {
    //             //     // setHomeGames([{test: "test GAMES "}]);
    //             //     setHomeGames(response.data.resources.data);
    //             // } else if (isHome && resourceType == "cards") {
    //             //     // setHomeCards([{test: "test CARDS "}]);
    //             //     setHomeCards(response.data.resources.data);
    //             // } else if (isHome && resourceType == "decks") {
    //             //     // setHomeDecks([{test: "test DECKS "}]);
    //             //     setHomeDecks(response.data.resources.data);
    //             // } else {
    //             //     // setResources(response.data.resources.data);
    //             //     setResources(response.data.resources);
    //             // };
    //             setResources(response.data.resources);
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





    // useEffect(() => {
    //     // fetchResources();
    //     // const addition = resourceType == 'cards' ? 'paginatedWithImages' : 'paginated';
    //     // console.log("addition", addition);      
    //     // requestUrl = apiUrl + resourceType + '/' + addition;
    //     fetchResources(apiUrl + 'games/paginated', true, 'games');
    //     fetchResources(apiUrl + 'cards/paginatedWithImages', true, 'cards');
    //     fetchResources(apiUrl + 'decks/paginated', true, 'decks');
    // }, []);


    const resourcesData = {



        // resources,
        // fetchResources,
        // homeGames,
        // homeCards,
        // homeDecks,

        // setPageLink,
    };

    return (
        <ResourcesContext.Provider value={resourcesData}>
            {children}
        </ResourcesContext.Provider>
    );
};

const useResources = () => useContext(ResourcesContext);



export { ResourcesProvider, useResources }