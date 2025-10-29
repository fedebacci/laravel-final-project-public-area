import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router-dom";
import ResourceCard from "../../components/resources/ResourceCard";

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
                            <div className="row my-5">
                                {/* {
                                    deck.image &&
                                    <div className="col-12 col-md-4">
                                        <div className="resource-img text-center">
                                            <img src={import.meta.env.VITE_BACKOFFICE_URL + '/storage/' + card.image} alt={card.name} className="resource-img-full img-fluid d-block" />
                                        </div>
                                    </div>
                                } */}

                                {/* <div className="col-12 col-md-8"> */}
                                <div className="col-12">
                                    <h2 className='text-center'>
                                        {deck.name}
                                    </h2>
                                    {
                                        deck.description != null ?
                                            <div className="description mb-3">
                                                <pre>
                                                    {deck.description}
                                                </pre>
                                            </div>                
                                        :
                                            <p className="mb-3">
                                                No description
                                            </p>
                                    }
                                    {
                                        deck.price != null ?
                                            <div className="price mb-3">
                                                € {deck.price}
                                            </div>
                                        :
                                            <p className="mb-3">
                                                No price
                                            </p>
                                    }                                    
                                </div>                                   
                            </div>





                            {
                                deck.game &&
                                <div className="my-5">
                                    <h4>
                                        {deck.name} - game
                                    </h4>
                                    <div className="row g-3">
                                        <div className="col-12 col-md-4 col-lg-3 col-xl-2" key={deck.game.id}>
                                            <ResourceCard
                                                resource={deck.game}
                                                resourceType={'games'}
                                            />
                                        </div>
                                    </div>
                                </div>                                  
                            }
                            {
                                deck.cards &&
                                <div className="my-5">
                                    <h4>
                                        {deck.name} - cards
                                    </h4>
                                    <div className="row g-3">
                                        {
                                            deck.cards.map(card => {
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


                        </>
                }


            </div>
        </section>
    );
};