import logo from './logo.svg';
import './App.css';
import S3BucketList from './components/fetch.js'
import AccurateVideoValidate from './components/button.js'
import axios from "axios";

function App() {
  const openAccurateVideo = () => {
    const licenseKey = '21A42B1E3745B8A8832230E8888804A0U60EBF1E05EA91A6A6ED0BBE9215D7F22';
    const launchTemplate = 'https://accurate-video.s3.eu-north-1.amazonaws.com/test.json';
    const url = `https://apps.accurate.video/launch/validate?launchTemplate=${launchTemplate}&licenseKey=${licenseKey}`;
    window.open(url, '_blank');
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
        <S3BucketList />
      </header>
    </div>
  );
}

export default App;
