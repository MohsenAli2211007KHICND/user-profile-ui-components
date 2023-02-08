const Heading = ({text, className, type, optional}) => {

    let renderComponent;

    switch(type){
        case "small":
            renderComponent = <h5 className={className}>{text}<small><sub>{optional}</sub></small></h5>
            break;
        case "medium":
            renderComponent = <h3 className={className}>{text}<small><sub>{optional}</sub></small></h3>
            break;
        case "large":
            renderComponent = <h1 className={className}>{text}<small><sub>{optional}</sub></small></h1>
            break;
            
        default:
            renderComponent = <h2 className={className}>{text}<small><sub>{optional}</sub></small></h2>
            break;
    }

    return renderComponent;
}

export default Heading;