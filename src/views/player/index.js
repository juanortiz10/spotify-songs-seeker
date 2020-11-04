import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { playTrack, checkSignIn, millisToMinutesAndSeconds } from '../../actions/index'

import 'materialize-css/dist/css/materialize.min.css'
import './index.css'

class Player extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: 'https://is4-ssl.mzstatic.com/image/thumb/Music111/v4/23/63/c0/2363c065-8874-55bb-b8f0-9eda248761ca/UMG_cvrart_00602557393187_01_RGB72_1800x1800_17UMGIM01262.jpg/1200x630bb.jpg',
      actualSong: 'Amarrame',
      artist: 'Mon Laferte',
      songId: this.props.match.params.songId
    }
  }
  componentWillMount(){
    this.props.checkSignIn();
    this.props.playTrack(this.state.songId);
  }
  render(){
    const props = this.props.player.payload;
    console.log(props);
    if (this.props.player.type === "COMPLETE_SONG") {
      return(
        <div className="Player">
          <div className="card" style={{ width: '50%'}}>
            <div className="card-content" style={{display: 'flex'}}>
              <div className="Player-card-leftBox">
                <img
                  src={ props.album.images[0].url }
                  alt={ props.album.images[0].url }
                  className="Player-card-leftBox-image"/>
              </div>
              <div className="Player-card-rightBox">
                <audio controls>
                  <source src={ props.preview_url } type="audio/mp3"/>
                    Your browser does not support the audio element.
                </audio>
                <h6 className="Player-card-rightBox-song">Track Title: { props.name }</h6>
                <h4 className="Player-card-rightBox-artist">Artist: { props.artists[0].name }</h4>
                <h2 className="Player-card-rightBox-artist">Duration: { millisToMinutesAndSeconds(props.duration_ms) }</h2>
                <h2 className="Player-card-rightBox-artist">Album: { props.album.name }</h2>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return(<div></div>);
  }
}

function mapStateToProps(state){
  return{
    routes: state.routes,
    player: state.player
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    playTrack,
    checkSignIn
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Player);
