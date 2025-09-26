import logo from './logo.svg';
import './App.css';
import S3BucketList from './components/fetch.js'
import AccurateVideoValidate from './components/button.js'
import axios from "axios";

function App() {
  const openAccurateVideo = () => {
    const launchTemplate = 'https://accurate-video.s3.eu-north-1.amazonaws.com/custom_launchtemplate.json'
    window.open(`https://apps.accurate.video/launch/validate?launchTemplate=${launchTemplate}`, '_blank');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, world!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={openAccurateVideo}>
          CLICK ME!
        </button>
      </header>
    </div>
  );
}

export default App;
