export const DifferenceCard = (
    props: {
        image: string,
        description: string,
        title: string
    }
) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={props.image} alt={"Divvy is "+props.title} className="img-fluid" />
            </div>
            <div className="card-body">
                <h3 className="heading-sm"><span className="text-muted">Divvy is</span><br />{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    );
};
  