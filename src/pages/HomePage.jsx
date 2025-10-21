import ResourcesList from "../components/resources/ResourcesList";

export default function HomePage () {
    return (
        <section id="homepage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    HOMEPAGE - {import.meta.env.VITE_APP_NAME}
                </h2>

                <ResourcesList resourceType={'games'} />
                <ResourcesList resourceType={'cards'} />
                <ResourcesList resourceType={'decks'} />
            </div>
        </section>
    );
};