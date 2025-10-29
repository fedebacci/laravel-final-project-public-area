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
const isDebug = false;





export default function DecksIndexPage () {
    if (isDebug) console.debug(`⚙️ LOADING DECKS INDEX .......... .......... .......... .......... .......... .......... ..........`);
    
    let requestUrl = apiUrl + 'decks';
    if (isDebug) console.debug(`⚙️ DECKS INDEX requestUrl`, requestUrl);
    
    const [decks, setDecks] = useState([]);
    if (isDebug) console.debug(`⚙️ DECKS INDEX decks`, decks);
    const { setIsLoading } = useLoader();





    useEffect(() => {
        if (isDebug) console.info(`🔂 DECKS INDEX useEffect`);
        if (isDebug) console.debug(`🔂 DECKS INDEX useEffect requestUrl`, requestUrl);
        if (isDebug) console.debug(`🔂 DECKS INDEX useEffect formData`, formData);        
        fetchDecks(requestUrl);
    }, []);

   
   
   
   
    const [ formData, setFormData ] =  useState({ ...formInitialData });
    if (isDebug) console.debug(`⚙️ DECKS INDEX formData`, formData);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isDebug) console.clear();
        if (isDebug) console.info("⚠️ DECKS INDEX handleSubmit");
        if (isDebug) console.debug("⚠️ DECKS INDEX handleSubmit formData: ", formData);        
        
        if (formData) {
            if (isDebug) console.warn("⚠️ DECKS INDEX handleSubmit formData EXISTS");
            if (isDebug) console.debug("⚠️ DECKS INDEX handleSubmit formData: ", formData); 

            fetchDecks(requestUrl, formData);
        } else {
            if (isDebug) console.error("⚠️ DECKS INDEX handleSubmit formData DOES NOT EXIST");
            fetchDecks(requestUrl, null);
        }
    };    










    function fetchDecks (requestUrl, filters = null) {
        if (isDebug) console.info("⬜ DECKS INDEX fetchDecks");
        if (isDebug) console.debug("⬜ DECKS INDEX fetchDecks formData: ", formData);
        if (isDebug) console.debug("⬜ DECKS INDEX fetchDecks requestUrl: ", requestUrl);
        if (isDebug) console.debug("⬜ DECKS INDEX fetchDecks filters: ", filters);        

        if (filters?.name == "") delete filters.name;
        if (filters?.description == "") delete filters.description;
        if (filters?.min_price == "") delete filters.min_price;
        if (filters?.max_price == "") delete filters.max_price;         
        if (filters != null && Object.keys(filters).length > 0) {
            if (isDebug) console.debug("⬜ DECKS INDEX fetchDecks filters != null && Object.keys(filters).length > 0");

            const requestFilters = new URLSearchParams(filters);
            requestUrl = requestUrl + '?' + requestFilters;          
        } else {
            if (isDebug) console.debug("⬜ DECKS INDEX fetchDecks filters == null || Object.keys(filters) <= 0");
        }
        
        

        if (isDebug) console.debug("⬜⬜ DECKS INDEX fetchDecks requestUrl: ", requestUrl);
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                if (isDebug) console.info("🟨 DECKS INDEX fetchDecks response");
                if (isDebug) console.debug("🟨 DECKS INDEX fetchDecks response response.data: ", response.data);
                if (isDebug) console.debug("🟨 DECKS INDEX fetchDecks response formData: ", formData);
                const TMPdecks = response.data.data.map((deck) => {
                    return {
                        id: deck.id,
                        name: deck.name,
                        description: deck.description,
                        price: deck.price,
                    }
                });
                if (isDebug) console.debug('🟨 DECKS fetchDecks response TMPdecks', TMPdecks);
                setDecks(TMPdecks);
            })
            .catch(error => {
                if (isDebug) console.error("❌ DECKS INDEX error", error);
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
                    decks.length == 0 ?
                        <p className="alert alert-warning m-0">
                            No decks have been found.
                        </p>
                    :
                        <>
                            <div className="row g-3">
                                {
                                    decks.map(deck => {
                                        return (
                                            <div className="col-12 col-md-4 col-lg-3" key={deck.id}>
                                                <ResourceCard
                                                    resource={deck}
                                                    resourceType={'decks'}
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