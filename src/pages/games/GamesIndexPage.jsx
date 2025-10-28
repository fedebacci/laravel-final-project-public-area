import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";

import { Link } from "react-router-dom";
import pages from "../../assets/js/pages";
import { useNavigate, useLocation } from "react-router-dom";
import ResourceCard from "../../components/resources/ResourceCard";


const formInitialData = {
    name: "",
    description: "",
    // max_price: null,
    // min_price: null,
};


export default function GamesIndexPage () {
    let requestUrl = apiUrl + 'games';

    console.debug(`⚙️ LOADING GAMES INDEX .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ..........`);
    
    
    const [games, setGames] = useState([]);
    // console.debug(`⚙️ games`, games);
    const { setIsLoading } = useLoader();
    
    const location = useLocation();
    // const urlFiltersInPageLoading = new URLSearchParams(location.search);
    // console.debug(`⚙️ requestUrl`, requestUrl);
    // // console.debug(`⚙️ formData`, formData);
    // console.debug(`⚙️ urlFiltersInPageLoading`, urlFiltersInPageLoading); 

    useEffect(() => {
        // console.warn("🔂 STO RICARICANDO CON USEEFFECT requestUrl", requestUrl);
        // console.warn("🔂 STO RICARICANDO CON USEEFFECT games", games);
        // // if (games.length == 0) {
        // //     console.warn("🔂 TMP SI VUOTO A CARICAMENTO requestUrl", requestUrl);
        // //     console.warn("🔂 TMP SI VUOTO A CARICAMENTO games", games);
        // //     fetchGames(requestUrl);
        // // } else {
        // //     console.warn("🔂 TMP NON VUOTO A CARICAMENTO requestUrl", requestUrl);
        // //     console.warn("🔂 TMP NON VUOTO A CARICAMENTO games", games);
        // // }
        fetchGames(requestUrl);

        // // console.debug(`🔂 STO RICARICANDO CON USEEFFECT location`, location);
        // const urlFiltersInUseEffect = new URLSearchParams(location.search);
        // console.warn(`🔂 STO RICARICANDO CON USEEFFECT requestUrl`, requestUrl);
        // console.warn(`🔂 STO RICARICANDO CON USEEFFECT urlFiltersInUseEffect`, urlFiltersInUseEffect); 
        // console.warn(`🔂 STO RICARICANDO CON USEEFFECT urlFiltersInUseEffect.size`, urlFiltersInUseEffect.size); 
    }, []);

    


    const [ formData, setFormData ] =  useState({ ...formInitialData });
    // console.debug(`⚙️ formData`, formData);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.debug("FORM DATA FOR FILTERED REQUEST formData", formData);
        
        if (formData.name == "") delete formData.name;
        if (formData.description == "") delete formData.description;
        const filters = new URLSearchParams(formData);
        // console.debug("⚠️ requestUrl", requestUrl);
        // console.debug("⚠️ formData", formData);
        // console.debug("⚠️ filters", filters);
        // console.debug("⚠️ filters.entries", filters.entries);
        // console.debug("⚠️ filters.name", filters.name);
        // console.debug("⚠️ filters.description", filters.description);
        // console.debug("⚠️ filters.size", filters.size);
        // // console.debug("⚠️ requestUrl + '?' + filters", requestUrl + '?' + filters);

        // const urlFiltersInHandleSubmit = new URLSearchParams(location.search);
        // // console.debug(`⚠️ urlFiltersInHandleSubmit`, urlFiltersInHandleSubmit);



        // if (filters.size != 0) {
        //     // console.debug('🟦');
        //     requestUrl = requestUrl + '?' + filters;
        //     console.debug("⚠️ requestUrl MODIFICATA", requestUrl);
        // }



        // - Fetch new filtered resources
        // - Works but sharing not possible (does not navigate)
        // fetchGames(requestUrl);
        // - Fetch new filtered resources
        // navigate to new URL with updated parameters
        // navigate(pages.GAMES());

        if (filters.size != 0) {
            // console.debug('⚠️ ');
            // fetchGames(requestUrl, filters);
            fetchGames(requestUrl, formData);
        } else {
            fetchGames(requestUrl);
        }
        navigate(pages.GAMES() + filters.size != 0 ? '?' + filters: '');

        // setFormData({ ...formInitialData });
    };    
    






    function fetchGames (requestUrl, filters = null) {
        setIsLoading(true);

        // // console.debug(`➡️ requestUrl`, requestUrl);
        // console.debug(`➡️ formData`, formData);
        // console.debug(`➡️ filters`, filters);


        const urlFilters = new URLSearchParams(location.search);
        // console.debug(`➡️ urlFilters`, urlFilters);
        // // console.debug(`➡️ filters`, filters);
        
        if (filters) {
            if (filters.name == "") delete filters.name;
            if (filters.description == "") delete filters.description;

            const filtersToAddToRequestFromFiltersObject = new URLSearchParams(filters);
            // console.debug(`➡️ filtersToAddToRequestFromFiltersObject`, filtersToAddToRequestFromFiltersObject);
            // requestUrl = requestUrl + '?' + filters;
            requestUrl = requestUrl + '?' + filtersToAddToRequestFromFiltersObject;
            // console.debug(`➡️ ⚪⚪⚪⚪`);
        } else if (formData.name == undefined && formData.description == undefined) {
            // console.debug(`➡️ 🟡🟡🟡🟡`);
            setFormData({...formInitialData})
        } else if (!filters && urlFilters.size > 0) {
            // console.debug(`➡️ 🔵🔵🔵🔵`);
            // console.debug(`➡️ urlFilters`, urlFilters);
            // console.debug(`➡️ filters`, filters);
            // console.debug(`➡️ requestUrl`, requestUrl);
            // console.debug(`➡️ formData`, formData);
            requestUrl = requestUrl + '?' + urlFilters;
        }
        
        
        // console.debug(`➡️ requestUrl`, requestUrl);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                const TMPgames = response.data.data.map((game) => {
                    return {
                        id: game.id,
                        image: game.logo,
                        name: game.name,
                        description: game.description,
                    }
                });
                console.info('TMPgames', TMPgames);                
                // setGames(response.data.data);
                setGames(TMPgames);
            })
            .catch(error => {
                console.error(`new error on request ${requestUrl}`);
                console.error(error);
                // console.error(error.message);
                // console.error(error.response);
                // console.error(error.response.data);
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
                                            <div className="col-12 col-md-4 col-lg-3" key={game.id}>
                                                <ResourceCard
                                                    resource={game}
                                                    resourceType={'games'}
                                                />
                                            </div>                                             
                                            // <div className="col-12 col-md-4 col-lg-3" key={game.id}>
                                            //     <div className="card h-100">
                                            //         <div className="card-body">
                                            //             <h3>
                                            //                 {game.name}
                                            //             </h3>                                                        
                                            //             {/* {game.name} */}
                                            //             <p>
                                            //                 {
                                            //                     game.description != null && game.description.length > 50 ? 
                                            //                         game.description.slice(0,50) + '...' 
                                            //                     : 
                                            //                         game.description != null ?
                                            //                             game.description
                                            //                         :
                                            //                             'No description'
                                            //                 }
                                            //             </p>                                                        
                                            //             <div className="mb-3">
                                            //                 <Link to={pages.SHOWGAME(game.id)} className="text-decoration-none">
                                            //                     Show
                                            //                 </Link>
                                            //             </div>
                                            //         </div>
                                            //     </div>
                                            // </div>
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