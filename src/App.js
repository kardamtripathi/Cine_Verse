import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner'; 
import Movies from './Components/Movies';
import Favorites from './Components/Favorites';
import { BrowserRouter as Router, Routes, BrowserRouter, Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* <Route path="/" element={<><Banner /><Movies/></>} render={(props) => (
          <>
            <Banner {...props} />
            <Movies {...props} />
          </>
        )} /> */}
        <Route path="/" element={<><Banner /><Movies/></>}/>
        <Route path="/favorites" element={<Favorites/>} />
        {/* <Banner/>
        <Movies/>
        <Favorites/> */}
      </Routes>
    </Router>
  );
}

export default App;
