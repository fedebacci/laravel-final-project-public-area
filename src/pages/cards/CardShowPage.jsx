import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";
import { useNavigate } from "react-router-dom";

export default function CardShowPage () {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();




    const requestUrl = apiUrl + 'cards/' + id;

    const [card, setCard] = useState(null);
    const { setIsLoading } = useLoader();



    useEffect(() => {
        fetchCard();
    }, []);
    function fetchCard () {
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
                    card != null ?
                        <>
                            <h2 className='text-center'>
                                {card.name}
                            </h2>
                            <div className="description mb-3">
                                <pre>
                                    {card.description}
                                </pre>
                            </div>
                        </>


                    :
                        <p className="alert alert-warning">
                            Card #{id} not found
                        </p>
                }


            </div>
        </section>
    );
};