import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SongItem extends Component {
  render(){
    const props = this.props;
    return(
      <div className="SongItem">
        <Link to={"player/" + props.songId + props.tokenPath}>
          <div className="SongItem-leftBox">
            <img
               src={ props.albumPhoto }
               alt={ props.albumPhoto }
               className="SongItem-leftBox-albumImage"/>
          </div>
          <div className="SongItem-rightBox">
            <h5 className="SongItem-rightBox-songName">{ props.songName }</h5>
            <h6 className="SongItem-rightBox-albumName">{ props.albumName }</h6>
            <h6 className="SongItem-rightBox-artistName">{ props.artistName }</h6>
            <h6 className="SongItem-rightBox-artistName">{ props.duration }</h6>
          </div>
        </Link>
      </div>
    );
  }
}

SongItem.propTypes = {
  songId: PropTypes.string.isRequired,
  albumPhoto: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  popularity: PropTypes.number.isRequired,
  tokenPath: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired
}

export default SongItem;
