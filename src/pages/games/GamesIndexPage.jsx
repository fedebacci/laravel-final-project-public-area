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





export default function GamesIndexPage () {
    if (isDebug) console.info(`⚙️ LOADING GAMES INDEX .......... .......... .......... .......... .......... .......... ..........`);
    
    let requestUrl = apiUrl + 'games';
    if (isDebug) console.debug(`⚙️ GAMES INDEX requestUrl`, requestUrl);
    
    const [games, setGames] = useState([]);
    if (isDebug) console.debug(`⚙️ GAMES INDEX games`, games);
    const { setIsLoading } = useLoader();





    useEffect(() => {
        if (isDebug) console.info(`🔂 GAMES INDEX useEffect`);
        if (isDebug) console.debug(`🔂 GAMES INDEX useEffect requestUrl`, requestUrl);
        if (isDebug) console.debug(`🔂 GAMES INDEX useEffect formData`, formData);
        fetchGames(requestUrl);
    }, []);
    
    
    
    
    
    const [ formData, setFormData ] =  useState({ ...formInitialData });
    if (isDebug) console.debug(`⚙️ GAMES INDEX formData`, formData);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isDebug) console.clear();
        if (isDebug) console.info("⚠️ GAMES INDEX handleSubmit");
        if (isDebug) console.debug("⚠️ GAMES INDEX handleSubmit formData: ", formData);        
        
        if (formData) {
            if (isDebug) console.warn("⚠️ GAMES INDEX handleSubmit formData EXISTS");
            if (isDebug) console.debug("⚠️ GAMES INDEX handleSubmit formData: ", formData); 

            fetchGames(requestUrl, formData);
        } else {
            if (isDebug) console.error("⚠️ GAMES INDEX handleSubmit formData DOES NOT EXIST");
            fetchGames(requestUrl, null);
        }
    };    
    






    function fetchGames (requestUrl, filters = null) {
        if (isDebug) console.info("⬜ GAMES INDEX fetchGames");
        if (isDebug) console.debug("⬜ GAMES INDEX fetchGames formData: ", formData);
        if (isDebug) console.debug("⬜ GAMES INDEX fetchGames requestUrl: ", requestUrl);
        if (isDebug) console.debug("⬜ GAMES INDEX fetchGames filters: ", filters);

        if (filters?.name == "") delete filters.name;
        if (filters?.description == "") delete filters.description;
        if (filters?.min_price == "") delete filters.min_price;
        if (filters?.max_price == "") delete filters.max_price;         
        if (filters != null && Object.keys(filters).length > 0) {
            if (isDebug) console.debug("⬜ GAMES INDEX fetchGames filters != null && Object.keys(filters).length > 0");

            const requestFilters = new URLSearchParams(filters);
            requestUrl = requestUrl + '?' + requestFilters;          
        } else {
            if (isDebug) console.debug("⬜ GAMES INDEX fetchGames filters == null || Object.keys(filters) <= 0");
        }



        if (isDebug) console.debug("⬜⬜ GAMES INDEX fetchGames requestUrl: ", requestUrl);
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                if (isDebug) console.info("🟨 GAMES INDEX fetchGames response");
                if (isDebug) console.debug("🟨 GAMES INDEX fetchGames response response.data: ", response.data);
                if (isDebug) console.debug("🟨 GAMES INDEX fetchGames response formData: ", formData);
                const TMPgames = response.data.data.map((game) => {
                    return {
                        id: game.id,
                        image: game.logo,
                        name: game.name,
                        description: game.description
                    }
                });
                if (isDebug) console.debug('🟨 GAMES INDEX fetchGames response TMPgames', TMPgames);
                setGames(TMPgames);
            })
            .catch(error => {
                if (isDebug) console.error("❌ GAMES INDEX error", error);
                setGames([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }










    return (
        <section id="GamesIndexPage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    GAMES
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
                    games.length == 0 ?
                        <p className="alert alert-warning m-0">
                            No games have been found.
                        </p>
                    :
                        <>
                            <div className="row g-3">
                                {
                                    games.map(game => {
                                        return (
                                            <div className="col-12 col-md-4 col-lg-3 col-xl-2" key={game.id}>
                                                <ResourceCard
                                                    resource={game}
                                                    resourceType={'games'}
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