import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AdminNavbar from './components/adminComponents/adminhomepage/AdminNavbar';
import AdminPage from './components/adminComponents/adminhomepage/AdminPage';
import ViewItems from './components/adminComponents/viewitems/ViewItems';
import ViewTemplates from './components/adminComponents/viewtemplates/ViewTemplates';
import ViewModules from './components/adminComponents/viewmodules/ViewModules';
import CreateItem from './components/adminComponents/createitem/CreateItem';
import CreateTemplate from './components/adminComponents/createtemplate/CreateTemplate';
import CreateModule from './components/adminComponents/createmodule/CreateModule';
import Login from './screen/loginPage/Login';
import User from './components/userComponent/User';
import UserTemplate from './components/userComponent/Usertemplates';
import UserItem from './components/userComponent/UserItem';
import DeleteItem from './components/adminComponents/deleteitems/DeleteItem';
import DeleteTemplate from './components/adminComponents/deletetemplate/DeleteTemplate';
import DeleteModule from './components/adminComponents/deletemodule/DeleteModule';
import UpdateItem from './components/adminComponents/updateitem/UpdateItem';
import UpdateTemplate from './components/adminComponents/updatetemplate/UpdateTemplate';
import UpdateModule from './components/adminComponents/updatemodule/UpdateModule';
import Homepage from './screen/homePage/HomePage';
import SignUp from './screen/signUpPage/Signup';
import FetchSr from './components/srComponent/FectchSr';
import FetchAllSr from './components/adminComponents/adminhomepage/FetchAllSr';
import MyAdService from './components/adminComponents/adminhomepage/srRequest';


function App() {
  const loc=useLocation();
  console.log(loc);
  return (
    <div className="app">
    <Header paths={loc.pathname}/>
      <Routes>
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {/* <Route index element={<Login/>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/adminnavbar" element={<AdminNavbar />} />
        <Route path="/viewitems" element={<ViewItems />} />
        <Route path="/viewtemplates" element={<ViewTemplates/>} />
        <Route path="/viewmodules" element={<ViewModules />} />
        <Route path="/createitem" element={<CreateItem/>}/>
        <Route path="/createtemplate" element={<CreateTemplate/>} />
        <Route path="/createmodule" element={<CreateModule/>} />
        <Route path="/user/fetchsr" element={<FetchSr/>}/>
        <Route path="/admin/fetchallsr" element={<FetchAllSr/>}/>
        <Route path="/sr" element={<MyAdService/>}/>
        <Route path="/user" element={<User/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/userTemplate" element={<UserTemplate/>} />
        <Route path="/userItem" element={<UserItem/>} />
        <Route path="deleteitem" element={<DeleteItem/>} />
        <Route path="deletetemplate" element={<DeleteTemplate/>} />
        <Route path="deletemodule" element={<DeleteModule/>} />
        <Route path="updateitem"  element={<UpdateItem/>} />
        <Route path="updatetemplate" element={<UpdateTemplate/>} />
        <Route path="updatemodule" element={<UpdateModule/>} />     
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
