import {Routes, Route} from 'react-router-dom';
import Home from './Pages/home.jsx';
import Auth from './Pages/auth.jsx';

export default function App() {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
        </Routes>
    )
}