import { useParams } from "react-router-dom";

export default function ResourcesShowPage ({ resourceType }) {
    const { id } = useParams();
    console.log(id);

    return (
        <section id="ResourcesShowPage-content">
            <div className="container my-5">
                <h2 className='text-center'>
                    ResourcesShowPage - {resourceType}: #{id}
                </h2>
            </div>
        </section>
    );
};