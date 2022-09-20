import React from 'react';
import Main from '../components/Main';
import Modal from "../components/Modal";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const ShowModal = () => {
		setShowModal(true);
	  };

  return (
    <div style={{ padding: '50px' }}>
      <button onClick={() => navigate('/login')}>ログイン</button>
      <button onClick={() => navigate('/register')}>新規登録</button>
      <h1 style={{ merginBottom: '20px' }}>タスク管理アプリ</h1>
      <button  id="task_add_btn" onClick={ShowModal}>タスク追加</button>
      
      <Main />
      <Modal showFlag={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Home;
