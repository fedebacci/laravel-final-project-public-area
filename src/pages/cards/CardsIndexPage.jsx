import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";

import ResourceCard from "../../components/resources/ResourceCard";


const formInitialData = {
    name: "",
    description: "",
    min_price: "",
    max_price: "",
};


export default function CardsIndexPage () {
    console.info(`⚙️ LOADING CARDS INDEX .......... .......... .......... .......... .......... .......... ..........`);
    
    let requestUrl = apiUrl + 'cards';
    console.debug(`⚙️ CARDS INDEX requestUrl`, requestUrl);
    
    const [cards, setCards] = useState([]);
    console.debug(`⚙️ CARDS INDEX cards`, cards);
    const { setIsLoading } = useLoader();






    useEffect(() => {
        console.info(`🔂 useEffect`);
        console.debug(`🔂 useEffect requestUrl`, requestUrl);
        console.debug(`🔂 useEffect formData`, formData);
        fetchCards(requestUrl);
    }, []);
    

    





    const [ formData, setFormData ] =  useState({ ...formInitialData });
    console.debug(`⚙️ CARDS INDEX formData`, formData);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.clear();
        console.info("⚠️ handleSubmit");
        console.debug("⚠️ handleSubmit formData: ", formData);        
        
     

        if (formData) {
            console.warn("⚠️ handleSubmit formData EXISTS");
            console.debug("⚠️ handleSubmit formData: ", formData); 

            fetchCards(requestUrl, formData);
        } else {
            console.error("⚠️ handleSubmit formData DOES NOT EXIST");
            fetchCards(requestUrl, null);
        }
    };






    function fetchCards (requestUrl, filters = null) {
        console.info("⬜ fetchCards");
        console.debug("⬜ fetchCards formData: ", formData);
        console.debug("⬜ fetchCards requestUrl: ", requestUrl);
        console.debug("⬜ fetchCards filters: ", filters);




        if (filters?.name == "") delete filters.name;
        if (filters?.description == "") delete filters.description;
        if (filters?.min_price == "") delete filters.min_price;
        if (filters?.max_price == "") delete filters.max_price;         
        if (filters != null && Object.keys(filters).length > 0) {
            console.debug("⬜ fetchCards filters != null && Object.keys(filters).length > 0");

            const requestFilters = new URLSearchParams(filters);
            requestUrl = requestUrl + '?' + requestFilters;          
        } else {
            console.debug("⬜ fetchCards filters == null || Object.keys(filters) <= 0");
        }




        console.debug("⬜⬜ fetchCards requestUrl: ", requestUrl);
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info("🟨 fetchCards response");
                console.debug("🟨 fetchCards response response.data: ", response.data);
                console.debug("🟨 fetchCards response formData: ", formData);
                const TMPcards = response.data.data.map((card) => {
                    return {
                        id: card.id,
                        image: card.image,
                        name: card.name,
                        description: card.description,
                        price: card.price,
                    }
                });
                console.debug('🟨 fetchCards response TMPcards', TMPcards);
                setCards(TMPcards);
            })
            .catch(error => {
                console.error("❌ error", error);
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


                        <div className="col-12 col-md-6">
                            <label htmlFor=" " className="form-label">
                                Filter by min_price
                            </label>
                            <input 
                                value={formData.min_price}
                                onChange={handleInputChange}
                                name="min_price"

                                type="number" 
                                className="form-control" 
                                id="min_price" 
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor=" " className="form-label">
                                Filter by max_price
                            </label>
                            <input 
                                value={formData.max_price}
                                onChange={handleInputChange}
                                name="max_price"

                                type="number" 
                                className="form-control" 
                                id="max_price" 
                            />
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
                                                <ResourceCard
                                                    resource={card}
                                                    resourceType={'cards'}
                                                />
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