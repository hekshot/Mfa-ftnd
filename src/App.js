import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './pages/user-routes/Userdashboard';
import Privateroute from './components/Privateroute';
import Profileinfo from './pages/user-routes/ProfileInfo';
import Qr from './pages/user-routes/Qr';
import Signuproute from './components/Signuproute';
import Signinroute from './components/Signinroute';
import Verify from './pages/Verify';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/verify' element={<Verify/>} />
      
      <Route path='/user' element={<Privateroute/>}>
          <Route path='dashboard' element={<Userdashboard/>} />
          <Route path='profile-info' element={<Profileinfo/>} />
          <Route path='qrscan' element={<Qr/>} />
      </Route>
      <Route path='/signup' element={<Signuproute/>}>
          <Route path='qrscan' element={<Qr/>} />
      </Route>
      <Route path='/signin' element={<Signinroute/>}>
          <Route path='verify' element={<Verify/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
