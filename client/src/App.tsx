import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext} from 'react';
import styles from './App.module.scss';
import { ProfileLogout } from './components/profile-logout/profile-logout';
import { Login } from './components/login/login';
import { Footer } from './components/footer/footer';
import { Home } from './components/home/home';
import { CategorySolo } from './components/category-solo/category-solo';
import { AdminProfile } from './components/admin-profile/admin-profile';
import { UserProfile } from './components/user-profile/user-profile';
import { About } from './components/about/about';
import { Search } from './components/search/search';
import { Register } from './components/register/register';
import { Create } from './components/create/create';
import { BlogSingle } from './components/blog-single/blog-single';
import { AuthContext } from './context/authContext';



function App() {


    return <div className={styles.App}>
        <BrowserRouter>
        <Routes>
           <Route path='/' Component={Home}/>
         </Routes>
         <Routes>
           <Route path='/login' Component={Login}/>
         </Routes>
         <Routes>
           <Route path='/register' Component={Register}/>
         </Routes>
         <Routes>
           <Route path='/solo' Component={CategorySolo}/>
         </Routes>
         <Routes>
           <Route path='/about' Component={About}/>
         </Routes>
         <Routes>
           <Route path='/contact' Component={About}/>
         </Routes>
         <Routes>
           <Route path='/search' Component={Search}/>
         </Routes>
         <Routes>
           <Route path='/profile/:id' Component={UserProfile}/>
         </Routes>
         <Routes>
           <Route path='/adminprofile/:id' Component={AdminProfile}/>
         </Routes>
         <Routes>
           <Route path='/edit/:id' Component={Create}/>
         </Routes>
         <Routes>
           <Route path='/post/:id' Component={BlogSingle}/>
         </Routes>

       </BrowserRouter>   

    </div>;
}

export default App;
