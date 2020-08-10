import React from 'react';

// TODO: Import axios
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seasons: [],
      episodes: [],
    }
  }

  async componentDidMount() {
    // TODO: get episode list of default season
    this.getSeasonsList();
  }
  
  getSeasonsList = () => {
    fetch('/api/greysanatomy/seasons')
    .then(res => res.json())
    .then(res => {
      let seasonsList = res.map(x => x.season );
      this.setState({
        seasons: seasonsList
      })
    });
  };

  render() {
    let seasonsList = this.state.seasons.length > 0
    && this.state.seasons.map((item, i) => {
    return (
      <option key={i} value={item}>{"Season " + item}</option>
    )
  }, this);
    return (
      <div>
        <h1>Grey's Anatomy Calculator</h1>
        <h3>How much time have you sunk on Grey's Anatomy? How much longer until you catch up?</h3>
        <h4>What season are you on?</h4>
          <select>
            {seasonsList}
          </select>
        <h4>What episode did you last watch?</h4>

      </div>
    )
  }
}

export default App;
