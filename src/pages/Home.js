import React from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={() => navigate('/login')}>ログイン</button>
      <button onClick={() => navigate('/register')}>新規登録</button>
      <h1 style={{ merginBottom: '20px' }}>タスク管理アプリ</h1>
      <Main />
    </div>
  );
};

export default Home;
