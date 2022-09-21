// import Register from './pages/Register';
// import Login from './pages/Login';
// import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from './pages/Test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={`/register/`} element={<Register />} />
        <Route path={`/login/`} element={<Login />} />
        <Route path={`/test`} element={<Home />} /> */}
        <Route path='/' element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
