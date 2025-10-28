// import ResourcesList from "../components/resources/ResourcesList";

// import { useResources } from "../contexts/ResourcesContext";

export default function HomePage () {
    console.debug('⚙️ LOADING HOME .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... .......... ..........');
    // const { homeGames, homeCards, homeDecks } = useResources();
    // console.debug('⚙️homeGames', homeGames);
    // console.debug('⚙️homeCards', homeCards);
    // console.debug('⚙️homeDecks', homeDecks);

    return (
        <section id="homepage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    HOMEPAGE - {import.meta.env.VITE_APP_NAME}
                </h2>

                {/* <ResourcesList resourceType={'games'} isHome="true"/>
                <ResourcesList resourceType={'cards'} isHome="true"/>
                <ResourcesList resourceType={'decks'} isHome="true"/> */}
                <hr />
                {/* <ResourcesList resourceType={'games'}/> */}
            </div>
        </section>
    );
};