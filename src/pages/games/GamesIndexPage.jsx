import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";

import { Link } from "react-router-dom";
import pages from "../../assets/js/pages";

export default function GamesIndexPage () {
    const requestUrl = apiUrl + 'games';

    console.debug(`⚙️ LOADING GAMES INDEX .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ..........`);


    const [games, setGames] = useState([]);
    const { setIsLoading } = useLoader();
    useEffect(() => {
        if (games.length == 0) {
            fetchGames(requestUrl);
        } else {
            console.warn("TMP NON VUOTO A CARICAMENTO", requestUrl);
            console.warn("TMP NON VUOTO A CARICAMENTO games", games);
        }
    }, []);
    function fetchGames (requestUrl) {
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                setGames(response.data.data);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
                setGames([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    
    


    return (
        <section id="GamesIndexPage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    GAMES
                </h2>



                {
                    games.length == 0 ?
                        <p className="alert alert-warning m-0">
                            No games have been found.
                        </p>
                    :
                        <>
                            <div className="row g-3">
                                {
                                    games.map(game => {
                                        return (
                                            <div className="col-12 col-md-3 col-lg-2" key={game.id}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        {game.name}
                                                        <div className="mb-3">
                                                            <Link to={pages.SHOWGAME(game.id)} className="text-decoration-none">
                                                                Show
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </>                   
                }                
            </div>
        </section>
    );
};