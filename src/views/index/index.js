import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { search,checkSignIn } from '../../actions/index'
import SongItem from './SongItem'
import './index.css'
import Spinner from 'react-spinkit'

class Index extends Component {
  constructor(){
    super();
    this.state = {
      song: ''
    }
  }
  componentWillMount(){
    this.props.checkSignIn();
  }
  getTokenPath(){
    let path = window.location.href;
    return path.substring(path.indexOf("#"), path.length);
  }
  getResultsCard(){
    if (this.props.songs.length > 0) {
      return(
        <div className="card Index-results-card">
          <div className="card-content">
            { this.props.songs.map((currentValue, index, array ) => {
              console.log(currentValue);
              return(
                <SongItem
                  key={ index }
                  songId={ currentValue._id }
                  tokenPath={ this.getTokenPath() }
                  albumPhoto={ currentValue.album.images[0].url}
                  albumName={ currentValue.album.name }
                  songName={ currentValue.name }
                  artistName={ currentValue.artists[0].name }
                  duration={ currentValue.duration_ms.name }
                  popularity={ currentValue.popularity }/>
              );
            })}
          </div>
        </div>
      );
    }
  }
  render(){
    const props = this.props;
    if (props.songs.type === "IS_FETCHING")
      return(<Spinner name='double-bounce' />);
    return(
      <div className="Index">
        <div className="card Index-card">
          <div className="card-content">
            <div className="Index-searchBox">
              <input
                type="text"
                className="Index-searchBox-input"
                onChange={ (e) => { this.setState({ song: e.target.value })}}
                value={ this.state.song }
                placeholder="Song"/>
              <a
                 className="waves-effect waves-light btn black"
                 onClick={() => { props.search( this.state.song ) }}>
                <i className="material-icons left">search</i>
              </a>
            </div>
          </div>
        </div>
        { this.getResultsCard()}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    routes: state.routes,
    songs: state.player
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    search,
    checkSignIn
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Index);
