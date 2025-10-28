import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";

import { Link } from "react-router-dom";
import pages from "../../assets/js/pages";


export default function DecksIndexPage () {
    const requestUrl = apiUrl + 'decks';

    const [decks, setDecks] = useState([]);
    const { setIsLoading } = useLoader();
    useEffect(() => {
        fetchDecks();
    }, []);
    function fetchDecks () {
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                setDecks(response.data.data);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
                setDecks([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    
    


    return (
        <section id="DecksIndexPage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    DECKS
                </h2>



                {
                    decks.length > 0 ?

                    <>
                        <div className="row g-3">
                            {
                                decks.map(deck => {
                                    return (
                                        <div className="col-12 col-md-3 col-lg-2" key={deck.id}>
                                            <div className="card">
                                                <div className="card-body">
                                                    {deck.name}
                                                    <div className="mb-3">
                                                        <Link to={pages.SHOWDECK(deck.id)} className="text-decoration-none">
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


                    
                    :
                    <p className="alert alert-warning m-0">
                        No decks have been found.
                    </p>

                    
                }                
            </div>
        </section>
    );
};