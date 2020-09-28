import React from "react";
import soundFile0 from "./assets/audio/0.mp3";
import soundFile1 from "./assets/audio/1.mp3";
import soundFile2 from "./assets/audio/2.mp3";
import soundFile3 from "./assets/audio/3.mp3";
import soundFile4 from "./assets/audio/4.mp3";
import soundFile5 from "./assets/audio/5.mp3";
import soundFile6 from "./assets/audio/6.mp3";
import soundFile7 from "./assets/audio/7.mp3";
import Sound from "react-sound";

export class MarketHolder extends React.Component {
  constructor() {
    super();
    this.state = {
      apiKey: '',
      currentStock: '',
      currentStockPrice: '',
      startPriceTracking: false,
      previousStockPrice: '',
      notes: [false, false, false, false, false, false, false, false],
      apiCallInterval: 60,
      notePercentRange: 100,
      soundVolume: 50
    };
  }

  componentDidMount() {
    console.log('mounted');
    this.setState({ startPriceTracking: false });
    if (localStorage.getItem('apiKey')) {
      this.setState({ apiKey: localStorage.getItem('apiKey') });
    }
    if (localStorage.getItem('currentStock')) {
      this.setState({ currentStock: localStorage.getItem('currentStock') });
    }
  }

  callSound = () => {
      let notes = [false, false, false, false, false, false, false, false];
      let noteCalculation =
        (this.state.currentStockPrice - this.state.previousStockPrice)
         * (100 / this.state.notePercentRange);
      if (noteCalculation > 1) {
        notes[6] = true;
      }
      else if (noteCalculation < -1) {
        notes[2] = true;
      }
      else if (noteCalculation < 0) {
        notes[3] = true;
      }
      else if (noteCalculation > 0) {
        notes[5] = true;
      }
      else {
        notes[4] = true;
      }
      console.log(noteCalculation);
      console.log(notes)
      this.setState({ notes: notes });
  };

  callStockAPI = () => {
    this.setState({ notes: [false, false, false, false, false, false, false, false] });
    const finnhub = require('finnhub');
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = this.state.apiKey; // Replace this
    const finnhubClient = new finnhub.DefaultApi();

    //Quote
    finnhubClient.quote(this.state.currentStock, (error, data, response) => {
      if (error || data.c === undefined) {
        console.log(
          'Something went wrong. Please check your API key and ticker symbol'
        );
        this.setState({ startPriceTracking: false });
      } else {
        console.log(data);
        console.log(data.c);
        this.setState({ previousStockPrice: this.state.currentStockPrice });
        this.setState({ currentStockPrice: data.c });
        this.callSound();
      }
    });
  };

  priceTrackingCycle = () => {
    let externalThis = this;
    let intervalPrice = () => {
      if (externalThis.state.startPriceTracking === true) {
        externalThis.callStockAPI();
      } else {
        clearInterval(intervalPrice);
      }
    };
    setInterval(intervalPrice, 1000 * this.state.apiCallInterval);
  };

  onApiKeyChange = (event) => {
    this.setState({ apiKey: event.target.value });
  };

  onCurrentStockChange = (event) => {
    this.setState({ currentStock: event.target.value });
  };

  onApiIntervalChange = (event) => {
    this.setState({ apiCallInterval: event.target.value });
  };

  onNotePercentChange = (event) => {
    this.setState({ notePercentRange: event.target.value });
  };

  onSoundVolumeChange = (event) => {
    this.setState({ soundVolume: event.target.value });
  };

  onApiKeyEntered = () => {
    this.setState({ startPriceTracking: true });
    localStorage.setItem('apiKey', this.state.apiKey);
    localStorage.setItem('currentStock', this.state.currentStock);
    this.priceTrackingCycle();
  };

  stopTracking = () => {
    this.setState({ startPriceTracking: false });
  };

  render() {
    return (
      <div>
        <h1>
          Begin by creating an API key here:{' '}
          <a href='https://finnhub.io/'>Finnhub.io</a> and entering it within
          the field below
        </h1>
        <label>
          API Key-
          <input
            value={this.state.apiKey}
            onChange={this.onApiKeyChange}
            type='text'
          />
        </label>
        <label>
          Ticker Symbol-
          <input
            value={this.state.currentStock}
            onChange={this.onCurrentStockChange}
            type='text'
          />
        </label>
        <label>
          Refresh Interval({this.state.apiCallInterval} seconds) - seems to only refresh from API every 60 seconds
          <input
            value={this.state.apiCallInterval}
            onChange={this.onApiIntervalChange}
            type='range'
            min='5'
            max='120'
            step='1'
          />
        </label>
        <label>
          Variable Price Sensitivity ({this.state.notePercentRange} percent)-
          <input
            value={this.state.notePercentRange}
            onChange={this.onNotePercentChange}
            type='range'
            min='1'
            max='200'
            step='1'
          />
        </label>
        <label>
          Tone Volume ({this.state.soundVolume} percent)-
          <input
            value={this.state.soundVolume}
            onChange={this.onSoundVolumeChange}
            type='range'
            min='0'
            max='100'
            step='1'
          />
        </label>
        <hr />
        <br />
        <button
          disabled={this.state.startPriceTracking}
          onClick={this.onApiKeyEntered}
        >
          Submit Key and Ticker Symbol
        </button>
        <button
          disabled={!this.state.startPriceTracking}
          onClick={this.stopTracking}
        >
          Stop
        </button>
        {this.state.currentStockPrice ? (
          <p>
            Price: $<strong>{this.state.currentStockPrice}</strong>
          </p>
        ) : (
          ''
        )}
        {this.state.currentStockPrice && (this.state.previousStockPrice !== '') ? (
          <p>
            Change: <strong>
              <span style={{color: (this.state.currentStockPrice - this.state.previousStockPrice) < 0 ? 'red' : 'green'}}>
                {(this.state.currentStockPrice - this.state.previousStockPrice) < 0 ? '-' : '+'} {Math.abs(this.state.currentStockPrice - this.state.previousStockPrice)}
              </span>
              </strong>
          </p>
        ) : (
          ''
        )}
        {/* ===================== */}
        {this.state.notes[0] && this.state.startPriceTracking ? (
          <Sound
            url={soundFile0}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={this.state.soundVolume}
          />
        ) : (
          ''
        )}
        {this.state.notes[1] && this.state.startPriceTracking ? (
          <Sound
            url={soundFile1}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={this.state.soundVolume}
          />
        ) : (
          ''
        )}
        {this.state.notes[2] && this.state.startPriceTracking ? (
          <Sound
            url={soundFile2}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={this.state.soundVolume}
          />
        ) : (
          ''
        )}
        {this.state.notes[3] && this.state.startPriceTracking ? (
          <Sound
            url={soundFile3}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={this.state.soundVolume}
          />
        ) : (
          ''
        )}
        {this.state.notes[4] && this.state.startPriceTracking ? (
          <Sound
            url={soundFile4}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={this.state.soundVolume}
          />
        ) : (
          ''
        )}
        {this.state.notes[5] && this.state.startPriceTracking ? (
          <Sound
            url={soundFile5}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={this.state.soundVolume}
          />
        ) : (
          ''
        )}
        {this.state.notes[6] && this.state.startPriceTracking ? (
          <Sound
            url={soundFile6}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={this.state.soundVolume}
          />
        ) : (
          ''
        )}
        {this.state.notes[7] && this.state.startPriceTracking ? (
          <Sound
            url={soundFile7}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={this.state.soundVolume}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}
