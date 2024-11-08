import './App.css'
import Navabar from './Components/Header/Navabar';
import LandingPage from './Components/Home/LandingPage/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Account/Log/Login';
import CreateNewAc from './Components/Account/Sign/CreateNewAc';
import Admin from './Components/Account/Admin/Admin';
import MainSection from './Components/Home/Section1/MainSection';
import { AppProvider } from '../Context/userAuthContext';
import AddNewBook from './Components/AddProduct/AddNewBook';
import ReadBook from './Components/Home/ReadBook/ReadBook';
function App() {
  
  return (
    <AppProvider>
    <main>
    <BrowserRouter>
    <Navabar></Navabar>
    <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/logIn" element={<Login></Login>}></Route>
        <Route path="/createNewAc" element={<CreateNewAc></CreateNewAc>}></Route>
        <Route path="/adminPage" element={<Admin></Admin>}></Route>
        <Route path="/mainSection" element={<MainSection></MainSection>}></Route>
        <Route path="/addNewBook" element={<AddNewBook></AddNewBook>}></Route>
        <Route path='/readWholeBook/:bookID' element={<ReadBook></ReadBook>}></Route>
     </Routes>
     </BrowserRouter>
    </main>
    </AppProvider>
  )
}

export default App
