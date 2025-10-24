import { Link } from "react-router-dom";
import pages from "../../assets/js/pages";

export default function ResourceCard ({ resource, resourceType }) {
    // # Comment for error of resource not defined when going from game to card (but doen't give it when going to deck). See ResourceShowPage for more details about the part of the page that starts the chain that makes the error happen (even if the error happens here)
    // console.debug('🟡 resourceType inside: ResourceCard', resourceType);
    // console.debug('🟡 resource inside: ResourceCard', resource);
    
    let pageLink;
    if (resourceType == 'games') {
        pageLink = pages.SHOWGAME(resource.id);
    } else if (resourceType == 'cards') {
        pageLink = pages.SHOWCARD(resource.id);
    } else if (resourceType == 'decks') {
        pageLink = pages.SHOWDECK(resource.id);
    } else {
        pageLink = '#';
    };
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

    return (
        // <Link to="#" className="card h-100 text-decoration-none">
        <Link to={pageLink} className="card h-100 text-decoration-none">

            {
                resource.logo
                &&
                <img src={import.meta.env.VITE_BACKOFFICE_URL + '/storage/' + resource.logo} alt={resource.name} className="card-img-top" />
            }
            {/* {
                resource.game?.logo && resourceType != 'cards' ?
                <img src={import.meta.env.VITE_BACKOFFICE_URL + '/storage/' + resource.game.logo} alt={resource.game.name} className="card-img-top" />
                :
                ''
            } */}
            {
                resource.image
                &&
                <img src={import.meta.env.VITE_BACKOFFICE_URL + '/storage/' + resource.image} alt={resource.name} className="card-img-top" />
            }

            <div className="card-body">
                <h3 className="fs-5">
                    {resource.name}
                </h3>
                <p className="m-0">
                    {
                        resource.description != null
                        ?
                        resource.description.slice(0, 75) + (resource.description.length <= 75 ? '' : '...')
                        :
                        'No description available'
                    }
                </p>
            </div>
        </Link>
    );
};