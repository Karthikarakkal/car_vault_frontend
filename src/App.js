import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { VehicleProvider } from './components/VehicleContext'; // Import the VehicleProvider
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Main from './components/Main';

import Add from './components/Add';
import Search from './components/Search';

import Viewall from './components/Viewall'; // Import your ViewAll component
import Editvehicle from './components/Editvehicle';
import Navbar from './Navbar';
import Navb from './components/Navb';

function App() {
  return (
    <VehicleProvider>
      <BrowserRouter>
   
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Main" element={<Main />} />
          <Route path='/Add' element={<Add />} />
          <Route path='/Search' element={<Search />} />
          <Route path='/Editvehicle' element={<Editvehicle />} />
          <Route path='/nav' element={<Navb/>} />
          <Route path='/Viewall' element={<Viewall />} /> {/* Add route for ViewAll */}
        </Routes>
      </BrowserRouter>
    </VehicleProvider>
  );
}

export default App;
