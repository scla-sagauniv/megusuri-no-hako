import '../App.css';
import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import Modal from '../components/Modal';
import { useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import '../css/Home.css';
import pic from '../img/MacIcon_mos.png';
import pulsImg from '../img/addButton.png';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setShowModal] = useState(false);

  const showModal = () => {
    setShowModal(true);
  };

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate('/login/');
  };

  return (
    <>
      {!loading && (
        <>
          {/* ↓ログインしていない場合はログインページにリダイレクトする設定 */}
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <div>
              <div className='header'>
                <div className='left'>
                <img src={pic} width={"70"} height={"100"} alt='MacIcon_Mos'/>
              <h1 className='apptitle'>タスク管理アプリ</h1>
              {/* <button className='task_add_btn' onClick={showModal}>
                <img src={pulsImg}/>
              </button> */}
              <input type="button" className='task_add_button'  onClick={showModal}/>
              </div>
              <div className='right'>
              <p className='user'>{user?.email}</p>
              <button className='logout' onClick={logout}>ログアウト</button>
              </div>
              </div>
              <Main />
              <Modal showFlag={modal} setShowModal={setShowModal} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
