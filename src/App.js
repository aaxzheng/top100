import React, { Component } from 'react';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wines: [],
      wineNotes: "",
      done:false,
      notesDone:false,
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }
  
  componentWillMount() {
    let wineList;
    fetch('https://top-100-example.s3.amazonaws.com/t100_2018.json').then((response) => {
      return response.json();
    }).then((myJson) => wineList = myJson).then(() =>
    this.setState({wines : wineList , done: true}, () => console.log("success"))
    );
  }
  
  updateNotes(id) {
    let notes;
    fetch('https://top-100-example.s3.amazonaws.com/' + id.toString() + '.json').then((response) => {
      return response.json();
    }).then((myJson) => notes = myJson).then(() =>
      this.setState({ wineNotes: notes, notesDone:true }, () => console.log("note success"))
    );
  }

  handleMouseOver(e) {
    let id = e.currentTarget.getAttribute("wineid");
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.updateNotes(id), 400);
  }

  render() {
    let wineScore;
    let wineNote;
    
    if (this.state.done) {
      wineScore = this.state.wines.map((wine) => {
        return (
          <div key={wine.id} wineid={wine.id} onMouseOver={this.handleMouseOver} className="wine-item">
            <div className="wine-info score">{wine.score}</div>
            <div className="wine-info">{wine.winery_full}</div>
            <div className="wine-info">{wine.wine_full}</div>
            <div className="wine-info">{wine.vintage}</div>
            <div className="wine-info">{wine.color}</div>
            <div className="wine-info">{wine.region}</div>
          </div>
          )
        });
    }

    if (this.state.notesDone) {
      wineNote = this.state.wineNotes.note;
    }


    return (
      <div className="wine-main">
        <div className="wine-list-wrapper">
          <div className="wine-list">
            <div className="legend-key">
              <span className="wine-info legend score">Score</span>
              <span className="wine-info legend">Winery</span>
              <span className="wine-info legend">Wine</span>
              <span className="wine-info legend">Year</span>
              <span className="wine-info legend">Color</span>
              <span className="wine-info legend">Region</span>

            </div>
            {wineScore}
          </div>
        </div>
        <div className="wine-notes-wrapper">
          <div className="wine-notes">
            <div className="wine-notes-text">{wineNote}</div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
