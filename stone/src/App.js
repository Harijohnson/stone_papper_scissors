import {HashRouter as Router ,Route,Routes} from 'react-router-dom'
import HomeScreen from './screenss/HomeScreen'
import ScoreScreen from './screenss/ScoreScreen'
function App() {
  return (
    <div>
      <main>
        <Router>
          <Routes>
            <Route path='/' Component={HomeScreen}  exact />
            <Route path='/results' Component={ScoreScreen}  />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
