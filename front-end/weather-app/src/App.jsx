import './App.css'
import Landingpage from './pages/landingpage'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Todayweatherpage from './pages/Todayweatherpage';


function App() {


  return (
    <>
    <Router>
    <Routes>
      <Route path='/'element={<Landingpage/>}></Route>
      <Route path='/Todayweatherpage' element={<Todayweatherpage/>}></Route>
    </Routes>
    </Router>
    </>
  )
}

export default App
