import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/register/`} element={<Register />} />
        <Route path={`/login/`} element={<Login />} />
        <Route path={`/`} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
