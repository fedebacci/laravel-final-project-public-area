import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router-dom";



export default function GameShowPage () {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();




    const requestUrl = apiUrl + 'games/' + id;

    const [game, setGame] = useState(null);
    const { setIsLoading } = useLoader();

    // let payload = new FormData();
    //     // Add to request filter to get the right cards
    //     payload.append('game_id', id);


    useEffect(() => {
        fetchGame();
    }, []);
    function fetchGame () {
        setIsLoading(true);
        axios
            // .get(`${requestUrl}`, payload)
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                setGame(response.data.data);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
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
                    game != null ?
                        <>
                            <h2 className='text-center'>
                                {game.name}
                            </h2>
                            <div className="description mb-3">
                                <pre>
                                    {game.description}
                                </pre>
                            </div>
                        </>


                    :
                        <p className="alert alert-warning">
                            Game #{id} not found
                        </p>
                }


            </div>
        </section>
    );
};