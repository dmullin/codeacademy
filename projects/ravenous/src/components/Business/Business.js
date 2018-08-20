import React from 'react';
import './Business.css';



class Business extends React.Component {
    render() {
        return (
            <div className="Business">
                <div className="image-container">
                    <img src={Business.imageSrc} alt=''/>
                </div>
                <h2>{Business.name}</h2>
                <div className="Business-information">
                    <div className="Business-address">
                        <p>{Business.address}</p>
                        <p>{Business.city}</p>
                        <p>{Business.state} {Business.zipCode}</p>
                    </div>
                    <div className="Business-reviews">
                        <h3>{Business.category}</h3>
                        <h3 className="rating">{Business.rating}</h3>
                        <p>{Business.reviewCount} reviews</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Business;