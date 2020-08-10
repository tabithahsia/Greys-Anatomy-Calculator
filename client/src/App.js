import React from 'react';

// TODO: Import axios
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seasons: [],
      episodes: [1, 2, 3],
      currentSeason: undefined
    }
  }

  async componentDidMount() {
    // TODO: get episode list of default season
    await this.getSeasonsList();
  }
  
  getSeasonsList = () => {
    fetch('/api/greysanatomy/seasons')
    .then(res => res.json())
    .then(res => {
      let seasonsList = res.map(x => x.season );
      this.setState({
        seasons: seasonsList,
        currentSeason: seasonsList[0]
      })
    });
  };

  changeSeason = (event) => {
    this.setState({
      currentSeason: event.target.value
    })
  }

  render() {
    let seasonsList = this.state.seasons.length > 0
    && this.state.seasons.map((item, i) => {
    return (
      <option key={i} value={item}>{"Season " + item}</option>
    )
  }, this);

  let episodesList= this.state.episodes.length > 0
  && this.state.episodes.map((item, i) => {
  return (
    // TODO: Add titles, ex: Episode 1 - The Pilot
    <option key={i} value={item}>{"Episode " + item}</option>
  )
}, this);
    return (
      <div>
        <h1>Grey's Anatomy Time Calculator</h1>
        <h3>Find out how much time you've sunk on Grey's Anatomy</h3>
        <h4>What season are you on?</h4>
          <select value={this.state.currentSeason} onChange={this.changeSeason}>
            {seasonsList}
          </select>
        <h4>What episode did you last watch?</h4>
          <select>
            {episodesList}
          </select>
      </div>
    )
  }
}

export default App;
