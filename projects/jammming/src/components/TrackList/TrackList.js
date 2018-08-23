import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
    }


    render() {
        return (
            <div className="TrackList">
            {
                this.props.tracks.map(track => {
                    return <Track track={track} key={track.id} onAdd={this.props.onAdd} addTrack={this.props.track} onRemove={this.props.onRemove.removeTrack(this.props.track)} isRemoval={this.props.isRemoval} />
                })
            }
            </div>
        )
    }
}

export default TrackList;