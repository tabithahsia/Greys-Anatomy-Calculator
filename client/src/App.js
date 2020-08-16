import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEpisode: 0,
      currentSeason: 0,
      episodes: [],
      seasons: [],
      timeSpent: 2580000,
      timeLeft: 0,
    }
  }

  async componentDidMount() {
    await this.getSeasonsList();

  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.currentSeason !== this.state.currentSeason){
      await this.getEpisodesList();
    }

    if(this.state.currentEpisode > 0 && this.state.currentSeason > 0 && (prevState.currentSeason !== this.state.currentSeason || prevState.currentEpisode !== this.state.currentEpisode)){
      await this.getTimeYouveSpent(this.state.currentSeason, this.state.currentEpisode);
      await this.getTimeLeft(this.state.currentSeason, this.state.currentEpisode);
    }
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
      currentSeason: Number(event.target.value),
      currentEpisode: 1
    })
  }

  getEpisodesList = () => {
    fetch('/api/greysanatomy/episodes', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentSeason: this.state.currentSeason })    
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        episodes: res,
        currentEpisode: res[0].episode
      })
    })
  }

  getTimeYouveSpent = () => {
    fetch('/api/greysanatomy/timeYouveSpent', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ season: this.state.currentSeason, episode: this.state.currentEpisode} )    
    })
    .then(res => res.json())
    .then(res => {
      console.log("res", res);
      this.setState({
        timeSpent: Number(res[0].sum),
      })
    })
  }

  getTimeLeft= () => {
    fetch('/api/greysanatomy/timeLeft', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ season: this.state.currentSeason, episode: this.state.currentEpisode} )    
    })
    .then(res => res.json())
    .then(res => {
      console.log("res", res);
      this.setState({
        timeLeft: Number(res[0].sum),
      })
    })
  }

  millisecondsToDaysHoursMinutesSeconds = (milliSeconds) => {
    let milliseconds, days, hours, minutes, seconds; 
    if(milliSeconds > 0) {
      milliseconds = milliSeconds;
      days= Math.floor( milliseconds / ( 24 * 60 * 60 * 1000 ) );
      if ( days < 0 ) { days = 0; }  
      milliseconds -= days * 24 * 60 * 60 * 1000;
      hours = Math.floor( milliseconds / ( 60 * 60 * 1000 ) );
      if ( hours < 0 ) { hours = 0; } 
      milliseconds  -= hours * 60 * 60 * 1000;

      minutes  = Math.floor( milliseconds / ( 60 * 1000 ) );
      if ( minutes < 0 ) { minutes = 0; } 
      milliseconds  -= minutes * 60 * 1000;

      seconds  = Math.floor( milliseconds / ( 1000 ) );
      if ( seconds < 0 ) { seconds = 0; }

  }else{
   days = hours = minutes = seconds = 0;
  }
  return `Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds:${seconds}`;
 };


  changeEpisode = (event) => {
    this.setState({
      currentEpisode: Number(event.target.value)
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
      <option key={i} value={item.episode}>{"Episode " + item.episode + " - " + item.title}</option>
    )
  }, this);

    return (
      <div>
        <h1>Grey's Anatomy Time Calculator</h1>
        <h3>Find out how much time you've sunk on Grey's Anatomy...</h3>
        <h3>and how much time is left</h3>
        <h4>What season are you on?</h4>
          <select value={this.state.currentSeason} onChange={this.changeSeason}>
            {seasonsList}
          </select>
        <h4>What episode did you last watch?</h4>
          <select value={this.state.currentEpisode} onChange={this.changeEpisode}>
            {episodesList}
          </select>
          <br/>
        <div>
          <h4>{`You've spent: ${this.millisecondsToDaysHoursMinutesSeconds(this.state.timeSpent)}`}</h4>
          <h4>{`You have: ${this.millisecondsToDaysHoursMinutesSeconds(this.state.timeLeft)} left`}</h4>
        </div>
      </div>
    )
  }
}

export default App;
