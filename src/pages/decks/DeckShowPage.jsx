import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router-dom";

export default function DeckShowPage () {
    const { id } = useParams();
    // console.log(id);
    console.debug(`⚙️ LOADING DECK SHOW ${id} .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ..........`);
    const navigate = useNavigate();




    const requestUrl = apiUrl + 'decks/' + id;

    const [deck, setDeck] = useState(null);
    const { setIsLoading } = useLoader();



    useEffect(() => {
        if (!deck) {
            fetchDeck(requestUrl);
        } else {
            console.warn("TMP NON NULLO A CARICAMENTO", requestUrl);
            console.warn("TMP NON NULLO A CARICAMENTO deck", deck);
        }
    }, []);
    function fetchDeck (requestUrl) {
        setIsLoading(true);
        axios
            // .get(`${requestUrl}`, payload)
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                setDeck(response.data.data);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
                setDeck(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    return (
        <section id="DecksShowPage-content">
            <div className="container my-5">

                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Go back
                </button>

                {/* <h2 className='text-center'>
                    DeckShowPage - #{id}
                </h2> */}
                {
                    deck == null ?
                        <p className="alert alert-warning">
                            Deck #{id} not found
                        </p>
                    :
                        <>
                            <h2 className='text-center'>
                                {deck.name}
                            </h2>
                            <div className="description mb-3">
                                <pre>
                                    {deck.description ?? 'No description'}
                                </pre>
                            </div>
                        </>
                }


            </div>
        </section>
    );
};