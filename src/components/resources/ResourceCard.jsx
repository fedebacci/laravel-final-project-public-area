export default function ResourceCard ({ resource }) {

    return (
        <div className="card h-100">

            {
                resource.logo
                &&
                <img src={import.meta.env.VITE_BACKOFFICE_URL + '/storage/' + resource.logo} alt={resource.name} className="card-img-top" />
            }
            {
                resource.image
                &&
                <img src={import.meta.env.VITE_BACKOFFICE_URL + '/storage/' + resource.image} alt={resource.name} className="card-img-top" />
            }

            <div className="card-body">
                <h3 className="fs-5">
                    {resource.name}
                </h3>
                <p className="m-0">
                    {
                        resource.description != null
                        ?
                        resource.description.slice(0, 75) + (resource.description.length <= 75 ? '' : '...')
                        :
                        'No description available'
                    }
                </p>
            </div>
        </div>
    );
};