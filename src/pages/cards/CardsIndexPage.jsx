import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";

import { Link, useNavigate, useLocation } from "react-router-dom";
import pages from "../../assets/js/pages";



const formInitialData = {
    name: "",
    description: "",
    // max_price: null,
    // min_price: null,
};


export default function CardsIndexPage () {
    let requestUrl = apiUrl + 'cards';

    console.debug(`⚙️ LOADING CARDS INDEX .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ..........`);

    const [cards, setCards] = useState([]);
    const { setIsLoading } = useLoader();
    const location = useLocation();
    useEffect(() => {
        fetchCards(requestUrl);
    }, []);
    

    





    const [ formData, setFormData ] =  useState({ ...formInitialData });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name == "") delete formData.name;
        if (formData.description == "") delete formData.description;
        const filters = new URLSearchParams(formData);

        if (filters.size != 0) {
            fetchCards(requestUrl, formData);
        } else {
            fetchCards(requestUrl);
        }
        navigate(pages.CARDS() + filters.size != 0 ? '?' + filters: '');
    };






    function fetchCards (requestUrl, filters = null) {


        const urlFilters = new URLSearchParams(location.search);
        if (filters) {
            if (filters.name == "") delete filters.name;
            if (filters.description == "") delete filters.description;

            const filtersToAddToRequestFromFiltersObject = new URLSearchParams(filters);
            requestUrl = requestUrl + '?' + filtersToAddToRequestFromFiltersObject;
        } else if (formData.name == undefined && formData.description == undefined) {
            setFormData({...formInitialData})
        } else if (!filters && urlFilters.size > 0) {
            requestUrl = requestUrl + '?' + urlFilters;
        }        

        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                const TMPcards = response.data.data.map((card) => {
                    return {
                        id: card.id,
                        image: card.image,
                        name: card.name,
                        description: card.description,
                    }
                });
                console.info('TMPcards', TMPcards);
                // setCards(response.data.data);
                setCards(TMPcards);
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


                <div className="card mb-3">
                    <div className="card-body">
                    <form className="row g-3">
                        <div className="col-12 col-md-6">
                            <label htmlFor="name" className="form-label">
                                Filter by name
                            </label>
                            <input 
                                value={formData.name}
                                onChange={handleInputChange}
                                name="name"

                                type="text" 
                                className="form-control" 
                                id="name" 
                            />
                        </div>


                        <div className="col-12 col-md-6">
                            <label htmlFor="description" className="form-label">
                                Filter by description
                            </label>
                            <textarea 
                                value={formData.description}
                                onChange={handleInputChange}
                                name="description"

                                className="form-control" 
                                id="description" 
                                rows="1"
                            >
                            </textarea>
                        </div>


                        <button 
                            onClick={handleSubmit}

                            type="submit" 
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </form>
                    </div>
                </div>


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
                                            <div className="col-12 col-md-4 col-lg-3" key={card.id}>
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <h3>
                                                            {card.name}
                                                        </h3>
                                                        {/* {card.name} */}
                                                        <p>
                                                            {
                                                                card.description != null && card.description.length > 50 ? 
                                                                    card.description.slice(0,50) + '...' 
                                                                : 
                                                                    card.description != null ?
                                                                        card.description
                                                                    :
                                                                        'No description'
                                                            }
                                                        </p>
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