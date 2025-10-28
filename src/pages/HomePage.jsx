import { useState, useEffect } from "react";
import { useLoader } from "../contexts/LoaderContext";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";
import pages from "../assets/js/pages";
import ResourceCard from "../components/resources/ResourceCard";

const gamesFilters = {
    // id: 1,
    name: "pok",
};
const cardsFilters = {
    // name: "char",
    // description: "phase",
    image: true,
    limit: 4,

    // ! For now works more like limit (gives back right number of resources but does not give back pagination links)
    // todo: differentiate from limit by managing pagination links both here and in private's area request filtering/response construction 
    // paginate: 8,
};
const decksFilters = {
    name: "pok",
};

export default function HomePage () {
    console.debug('⚙️ LOADING HOME .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ..........');

    const { setIsLoading } = useLoader();
    const [games, setGames] = useState([]);
    const [cards, setCards] = useState([]);
    const [decks, setDecks] = useState([]);



    useEffect(() => {
        fetchGames(apiUrl + 'games', gamesFilters); 
        fetchCards(apiUrl + 'cards', cardsFilters); 
        fetchDecks(apiUrl + 'decks', decksFilters); 
    }, []);







    function fetchGames (requestUrl, filters = null) {
        
        const urlFilters = new URLSearchParams(filters);
        requestUrl = requestUrl + '?' + urlFilters;
        console.info('requestUrl', requestUrl);
        
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                const TMPgames = response.data.data.map((game) => {
                    return {
                        id: game.id,
                        image: game.logo,
                        name: game.name,
                        description: game.description,
                    }
                });
                console.info('TMPgames', TMPgames); 
                setGames(TMPgames);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                setGames([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }













    function fetchCards (requestUrl, filters = null) {

        const urlFilters = new URLSearchParams(filters);
        requestUrl = requestUrl + '?' + urlFilters;
        console.info('requestUrl', requestUrl);

        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                const TMPcards = response.data.data.map((card) => {
                    return {
                        id: card.id,
                        image: card.image,
                        name: card.name,
                        description: card.description,
                    }
                });
                console.info('TMPcards', TMPcards);
                setCards(TMPcards);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                setCards([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }    











    function fetchDecks (requestUrl, filters = null) {

        const urlFilters = new URLSearchParams(filters);
        requestUrl = requestUrl + '?' + urlFilters;
        console.info('requestUrl', requestUrl);

        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                const TMPdecks = response.data.data.map((deck) => {
                    return {
                        id: deck.id,
                        name: deck.name,
                        description: deck.description,
                    }
                });
                console.info('TMPdecks', TMPdecks);
                setDecks(TMPdecks);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                setDecks([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }  


    return (
        <section id="homepage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    HOMEPAGE - {import.meta.env.VITE_APP_NAME}
                </h2>






                {
                    games.length == 0 ?
                        <div className="my-5">
                            <h4>
                                games Home
                            </h4>
                            <p className="alert alert-warning m-0">
                                No games have been found.
                            </p>
                        </div>
                    :
                        <div className="my-5">
                            <h4>
                                games Home
                            </h4>
                            <div className="row g-3">
                                {
                                    games.map(game => {
                                        return (
                                            <div className="col-12 col-md-4 col-lg-3" key={game.id}>
                                                <ResourceCard
                                                    resource={game}
                                                    resourceType={'games'}
                                                />
                                            </div>
                                            // <div className="col-12 col-md-4 col-lg-3" key={game.id}>
                                            //     <div className="card h-100">
                                            //         <div className="card-body">
                                            //             <h3>
                                            //                 {game.name}
                                            //             </h3>
                                            //             {/* {game.name} */}
                                            //             <p>
                                            //                 {
                                            //                     game.description != null && game.description.length > 50 ?
                                            //                         game.description.slice(0,50) + '...'
                                            //                     :
                                            //                         game.description != null ?
                                            //                             game.description
                                            //                         :
                                            //                             'No description'
                                            //                 }
                                            //             </p>
                                            //             <div className="mb-3">
                                            //                 <Link to={pages.SHOWGAME(game.id)} className="text-decoration-none">
                                            //                     Show
                                            //                 </Link>
                                            //             </div>
                                            //         </div>
                                            //     </div>
                                            // </div>
                                        );
                                    })
                                }
                            </div>
                        </div>             
                }   













                {
                    cards.length == 0 ?
                        <div className="my-5">
                            <h4>
                                cards Home
                            </h4>
                            <div className="mb-3">
                                <p className="alert alert-warning m-0">
                                    No cards have been found.
                                </p>
                            </div>
                        </div>
                    :
                        <div className="my-5">
                            <h4>
                                cards Home
                            </h4>
                            <div className="row g-3">
                                {
                                    cards.map(card => {
                                        return (
                                            <div className="col-12 col-md-4 col-lg-3" key={card.id}>
                                                <ResourceCard
                                                    resource={card}
                                                    resourceType={'cards'}
                                                />
                                            </div>                                            
                                            // <div className="col-12 col-md-4 col-lg-3" key={card.id}>
                                            //     <div className="card h-100">
                                            //         <div className="card-body">
                                            //             <h3>
                                            //                 {card.name}
                                            //             </h3>
                                            //             {/* {card.name} */}
                                            //             <p>
                                            //                 {
                                            //                     card.description != null && card.description.length > 50 ?
                                            //                         card.description.slice(0,50) + '...'
                                            //                     :
                                            //                         card.description != null ?
                                            //                             card.description
                                            //                         :
                                            //                             'No description'
                                            //                 }
                                            //             </p>
                                            //             <div className="mb-3">
                                            //                 <Link to={pages.SHOWCARD(card.id)} className="text-decoration-none">
                                            //                     Show
                                            //                 </Link>
                                            //             </div>
                                            //         </div>
                                            //     </div>
                                            // </div>
                                        );
                                    })
                                }
                            </div>
                        </div>                    
                } 










                {
                    decks.length == 0 ?
                        <div className="my-5">
                            <h4>
                                decks Home
                            </h4>
                            <p className="alert alert-warning m-0">
                                No decks have been found.
                            </p>
                        </div>
                    :
                        <div className="my-5">
                            <h4>
                                decks Home
                            </h4>
                            <div className="row g-3">
                                {
                                    decks.map(deck => {
                                        return (
                                            <div className="col-12 col-md-4 col-lg-3" key={deck.id}>
                                                <ResourceCard
                                                    resource={deck}
                                                    resourceType={'decks'}
                                                />
                                            </div>                                            
                                            // <div className="col-12 col-md-4 col-lg-3" key={deck.id}>
                                            //     <div className="card h-100">
                                            //         <div className="card-body">
                                            //             <h3>
                                            //                 {deck.name}
                                            //             </h3>
                                            //             {/* {deck.name} */}
                                            //             <p>
                                            //                 {
                                            //                     deck.description != null && deck.description.length > 50 ?
                                            //                         deck.description.slice(0,50) + '...'
                                            //                     :
                                            //                         deck.description != null ?
                                            //                             deck.description
                                            //                         :
                                            //                             'No description'
                                            //                 }
                                            //             </p>
                                            //             <div className="mb-3">
                                            //                 <Link to={pages.SHOWDECK(deck.id)} className="text-decoration-none">
                                            //                     Show
                                            //                 </Link>
                                            //             </div>
                                            //         </div>
                                            //     </div>
                                            // </div>
                                        );
                                    })
                                }
                            </div>
                        </div>

                    
                } 







            </div>
        </section>
    );
};