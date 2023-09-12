import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Guess the Color!</h1>

      <div className="score-board">
        <div className="remaninin-time-container">
          <h3>
            Remaining
            <br />
            Time(s)
          </h3>
          <p>30</p>
        </div>

        <div className="restart-container">
          <button>Restart</button>
        </div>

        <div className="scores-container">
          <div className="score">
            <h3>
              HIGH
              <br />
              SCORE
            </h3>
            <p>0</p>
          </div>

          <div className="high-score">
            <h3>SCORE</h3>
            <p>0</p>
          </div>
        </div>
      </div>

      <div className="color-container">
        <div className="color-name"></div>
      </div>

      <div className="color-selection-container">
        <div className="color1">
          <p>#FF0000</p>
        </div>
        <div className="color2">
          <p>#c98ca7</p>
        </div>

        <div className="color3">
          <p>#e76d83</p>
        </div>
      </div>
    </div>
  );
}

export default App;
