import React from 'react';
import './Business.css';



class Business extends React.Component {
    render() {
        return (
            <div className="Business">
                <div className="image-container">
                    <img src={this.props.imageSrc} alt=''/>
                </div>
                <h2>{Business.name}</h2>
                <div className="Business-information">
                    <div className="Business-address">
                        <p>{this.props.address}</p>
                        <p>{this.props.city}</p>
                        <p>{this.props.state} {Business.zipCode}</p>
                    </div>
                    <div className="Business-reviews">
                        <h3>{this.props.category}</h3>
                        <h3 className="rating">{Business.rating}</h3>
                        <p>{this.props.reviewCount} reviews</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Business;