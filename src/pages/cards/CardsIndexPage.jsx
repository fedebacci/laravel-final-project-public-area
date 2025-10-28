import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";

import { Link } from "react-router-dom";
import pages from "../../assets/js/pages";


export default function CardsIndexPage () {
    const requestUrl = apiUrl + 'cards';

    console.debug(`⚙️ LOADING CARDS INDEX .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ..........`);

    const [cards, setCards] = useState([]);
    const { setIsLoading } = useLoader();
    useEffect(() => {
        if (cards.length == 0) {
            fetchCards(requestUrl);
        } else {
            console.warn("TMP NON VUOTO A CARICAMENTO", requestUrl);
            console.warn("TMP NON VUOTO A CARICAMENTO cards", cards);
        }
    }, []);
    function fetchCards (requestUrl) {
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                setCards(response.data.data);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
                setCards([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    
    


    return (
        <section id="CardsIndexPage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    CARDS
                </h2>



                {
                    cards.length == 0 ?
                        <p className="alert alert-warning m-0">
                            No cards have been found.
                        </p>
                    :
                        <>
                            <div className="row g-3">
                                {
                                    cards.map(card => {
                                        return (
                                            <div className="col-12 col-md-3 col-lg-2" key={card.id}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        {card.name}
                                                        <div className="mb-3">
                                                            <Link to={pages.SHOWCARD(card.id)} className="text-decoration-none">
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