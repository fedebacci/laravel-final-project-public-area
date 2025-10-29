import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router-dom";
import ResourceCard from "../../components/resources/ResourceCard";

export default function CardShowPage () {
    const { id } = useParams();
    // console.log(id);
    console.debug(`⚙️ LOADING CARD SHOW ${id} .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ..........`);
    const navigate = useNavigate();




    const requestUrl = apiUrl + 'cards/' + id;

    const [card, setCard] = useState(null);
    const { setIsLoading } = useLoader();



    useEffect(() => {
        if (!card) {
            fetchCard(requestUrl);
        } else {
            console.warn("TMP NON NULLO A CARICAMENTO", requestUrl);
            console.warn("TMP NON NULLO A CARICAMENTO card", card);
        }
    }, []);
    function fetchCard (requestUrl) {
        setIsLoading(true);
        axios
            // .get(`${requestUrl}`, payload)
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                setCard(response.data.data);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
                setCard(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    return (
        <section id="CardsShowPage-content">
            <div className="container my-5">

                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Go back
                </button>

                {/* <h2 className='text-center'>
                    CardShowPage - #{id}
                </h2> */}
                {
                    card == null ?
                        <p className="alert alert-warning">
                            Card #{id} not found
                        </p>
                    :
                        <>

                            <div className="row my-5">
                                {
                                    card.image &&
                                    <div className="col-12 col-md-4">
                                        <div className="resource-img text-center">
                                            <img src={import.meta.env.VITE_BACKOFFICE_URL + '/storage/' + card.image} alt={card.name} className="resource-img-full img-fluid d-block" />
                                        </div>
                                    </div>
                                }

                                <div className="col-12 col-md-8">
                                    <h2 className='text-center'>
                                        {card.name}
                                    </h2>
                                    {
                                        card.description != null ?
                                            <div className="description mb-3">
                                                <pre>
                                                    {card.description}
                                                </pre>
                                            </div>
                                        :
                                            <p className="mb-3">
                                                No description
                                            </p>
                                    }
                                    {
                                        card.price != null ?
                                            <div className="price mb-3">
                                                {card.price}
                                            </div>
                                        :
                                            <p className="mb-3">
                                                No price
                                            </p>
                                    }                                    
                                </div>                                   
                            </div>





                            {
                                card.game &&
                                <div className="my-5">
                                    <h4>
                                        {card.name} - game
                                    </h4>
                                    <div className="row g-3">
                                        <div className="col-12 col-md-4 col-lg-3 col-xl-2" key={card.game.id}>
                                            <ResourceCard
                                                resource={card.game}
                                                resourceType={'games'}
                                            />
                                        </div>
                                    </div>
                                </div>                                  
                            }
                            {
                                card.decks &&
                                <div className="my-5">
                                    <h4>
                                        {card.name} - decks
                                    </h4>
                                    <div className="row g-3">
                                        {
                                            card.decks.map(deck => {
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