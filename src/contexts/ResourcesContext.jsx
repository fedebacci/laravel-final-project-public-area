import { createContext, useContext } from "react";
import { useState } from "react";
import pages from "../assets/js/pages";

const ResourcesContext = createContext();



const ResourcesProvider = ({ children }) => {

    /**
     * Function for creating dynamically the path to attach to the links. Depending on the presence of the second parameter 'resourceId' it can either take the user to an index or to a show page
     * @param {string} resourceType String that represents the type of the resources to attach the link to (games, cards, decks)
     * @param {number} resourceId Default: null - the id of the specific resource to show. If left null means that the route should go on the index page instead of the show page
     * @returns function that returns the string that represents the path to attach to the actual link
     */
    function setPageLink (resourceType, resourceId = null) {
        if (resourceId == null) {
            if (resourceType == 'games') {
                return pages.GAMES();
            } else if (resourceType == 'cards') {
                return pages.CARDS();
            } else if (resourceType == 'decks') {
                return pages.DECKS();
            } else {
                return '#';
            };
        } else {
            if (resourceType == 'games') {
                return pages.SHOWGAME(resourceId);
            } else if (resourceType == 'cards') {
                return pages.SHOWCARD(resourceId);
            } else if (resourceType == 'decks') {
                return pages.SHOWDECK(resourceId);
            } else {
                return '#';
            };
        }
    }
    // todo: fix switch statement and use it instead of if-else
    // switch (resourceType) {
    //     case resourceType == 'games':
    //         pageLink = pages.SHOWGAME(resource.id);
    //         break;
    //     case resourceType == 'cards':
    //         pageLink = pages.SHOWCARD(resource.id);
    //         break;
    //     case resourceType == 'decks':
    //         pageLink = pages.SHOWDECK(resource.id);
    //         break;
    //     default:
    //         pageLink = '#';
    //         break;
    // }

    const resourcesData = {
        setPageLink,
    };

    return (
        <ResourcesContext.Provider value={resourcesData}>
            {children}
        </ResourcesContext.Provider>
    );
};

const useResources = () => useContext(ResourcesContext);



export { ResourcesProvider, useResources }