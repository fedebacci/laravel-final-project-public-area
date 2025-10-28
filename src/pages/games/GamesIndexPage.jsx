import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useLoader } from "../../contexts/LoaderContext";

import { Link } from "react-router-dom";
import pages from "../../assets/js/pages";


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
    const { setIsLoading } = useLoader();
    useEffect(() => {
        if (games.length == 0) {
            fetchGames(requestUrl);
        } else {
            console.warn("TMP NON VUOTO A CARICAMENTO", requestUrl);
            console.warn("TMP NON VUOTO A CARICAMENTO games", games);
        }
    }, []);
    function fetchGames (requestUrl) {
        setIsLoading(true);
        axios
            .get(`${requestUrl}`)
            .then(response => {
                console.info(response.data);
                // console.info(response.data.message);
                // console.info(response.data.data);
                setGames(response.data.data);
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
    


    const [ formData, setFormData ] =  useState({ ...formInitialData });
    const handleInputChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.type);
        // console.log(e.target.value);
        // console.log("formInitialData", formInitialData);
        // console.log("formData", formData);

        // // formData[formData.indexOf(formData.find(field => field.name === e.target.name))].value = e.target.value;
        // formData[e.target.name] = e.target.value;
        // setFormData([
        //     ...formData
        // ]);
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.debug("FORM DATA FOR FILTERED REQUEST formData", formData);
        
        if (formData.name == "") delete formData.name;
        if (formData.description == "") delete formData.description;
        const filters = new URLSearchParams(formData);
        // console.debug("formData", formData);
        // console.debug("filters", filters);
        // console.debug("filters.size", filters.size);
        // console.debug("requestUrl + '?' + filters", requestUrl + '?' + filters);




        if (filters.size != 0) {
            // console.debug('🟦');
            requestUrl = requestUrl + '?' + filters;
        }
        console.debug("⚠️ requestUrl", requestUrl);



        fetchGames(requestUrl);
        // setFormData({ ...formInitialData });
    };    
    


    return (
        <section id="GamesIndexPage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    GAMES
                </h2>

                <div className="card mb-3">
                    <div className="card-body">
                    <form>
                        <div className="mb-3">
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


                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Filter by description
                            </label>
                            <textarea 
                                value={formData.description}
                                onChange={handleInputChange}
                                name="description"

                                className="form-control" 
                                id="description" 
                                rows="5"
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
                                                <div className="card">
                                                    <div className="card-body">
                                                        {game.name}
                                                        <div className="mb-3">
                                                            <Link to={pages.SHOWGAME(game.id)} className="text-decoration-none">
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