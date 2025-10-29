import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router-dom";
import ResourceCard from "../../components/resources/ResourceCard";

const isDebug = true;



export default function GameShowPage () {
    if (isDebug) console.info(`⚙️ LOADING GAMES SHOW .......... .......... .......... .......... .......... .......... ..........`);

    const { id } = useParams();
    if (isDebug) console.debug(`⚙️ GAMES SHOW id`, id);
    const navigate = useNavigate();




    const requestUrl = apiUrl + 'games/' + id;
    if (isDebug) console.debug(`⚙️ GAMES SHOW requestUrl`, requestUrl);

    const [game, setGame] = useState(null);
    if (isDebug) console.debug(`⚙️ GAMES SHOW game`, game);
    const { setIsLoading } = useLoader();

    useEffect(() => {
        if (isDebug) console.info(`🔂 GAMES SHOW useEffect`);
        if (isDebug) console.debug(`🔂 GAMES SHOW useEffect game`,  game);
        if (isDebug) console.debug(`🔂 GAMES SHOW useEffect requestUrl`,  requestUrl);
        if (!game) {
            fetchGame(requestUrl);
        } else {
            if (isDebug) console.error("TMP NON NULLO A CARICAMENTO", requestUrl);
            if (isDebug) console.error("TMP NON NULLO A CARICAMENTO game", game);
        }
    }, []);
    function fetchGame (requestUrl) {
        if (isDebug) console.info("⬜ GAMES SHOW fetchGame");
        
        if (isDebug) console.debug("⬜⬜ GAMES SHOW fetchGames requestUrl: ", requestUrl);
        setIsLoading(true);
        axios
            // .get(`${requestUrl}`, payload)
            .get(`${requestUrl}`)
            .then(response => {
                if (isDebug) console.info("🟨 GAMES SHOW fetchGames response");
                if (isDebug) console.debug("🟨 GAMES SHOW fetchGames response response.data: ", response.data);
                setGame(response.data.data);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                if (isDebug) console.error("❌ GAMES SHOW error", error);
                setGame(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    return (
        <section id="GamesShowPage-content">
            <div className="container my-5">

                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Go back
                </button>

                {/* <h2 className='text-center'>
                    GameShowPage - #{id}
                </h2> */}
                {
                    game == null ?
                        <p className="alert alert-warning">
                            Game #{id} not found
                        </p>
                    :
                        <>
                            <div className="row my-5">
                                    {
                                        game.logo &&
                                        <div className="col-12 col-md-4">
                                            <div className="resource-img text-center">
                                                <img src={import.meta.env.VITE_BACKOFFICE_URL + '/storage/' + game.logo} alt={game.name} className="resource-img-full img-fluid d-block" />
                                            </div>
                                        </div>
                                    }

                                    <div className="col-12 col-md-8">
                                        <h2 className='text-center'>
                                            {game.name}
                                        </h2>
                                        {
                                            game.description != null ?
                                                <div className="description mb-3">
                                                    <pre>
                                                        {game.description}
                                                    </pre>
                                                </div>
                                            :
                                                <p className="mb-3">
                                                    No description
                                                </p>
                                        }
                                    </div>                                   
                            </div>





                            {
                                game.cards &&
                                <div className="my-5">
                                    <h4>
                                        {game.name} - cards
                                    </h4>
                                    <div className="row g-3">
                                        {
                                            game.cards.map(card => {
                                                return (
                                                    <div className="col-12 col-md-4 col-lg-3 col-xl-2" key={card.id}>
                                                        <ResourceCard
                                                            resource={card}
                                                            resourceType={'cards'}
                                                        />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>                                  
                            }
                            {
                                game.decks &&
                                <div className="my-5">
                                    <h4>
                                        {game.name} - decks
                                    </h4>
                                    <div className="row g-3">
                                        {
                                            game.decks.map(deck => {
                                                return (
                                                    <div className="col-12 col-md-4 col-lg-3 col-xl-2" key={deck.id}>
                                                        <ResourceCard
                                                            resource={deck}
                                                            resourceType={'decks'}
                                                        />
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>                                  
                            }

                            
                        </>
                }


            </div>
        </section>
    );
};