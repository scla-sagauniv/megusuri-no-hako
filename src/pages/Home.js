import '../App.css';
import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import Modal from '../components/Modal';
import DeleteModal from '../components/DeleteModal';
import { useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setShowModal] = useState(false);
  const [deletemodal, setShowDeleteModal] = useState(false);

  const showModal = () => {
    setShowModal(true);
  };

  const showDeleteModal = (id) => {
    setShowDeleteModal(true);
    console.log(id);
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
            <div style={{ padding: '50px' }}>
              <button onClick={() => navigate('/login')}>ログイン</button>
              <button onClick={() => navigate('/register')}>新規登録</button>
              <h1 style={{ merginBottom: '20px' }}>タスク管理アプリ</h1>
              <button id='task_add_btn' onClick={showModal}>
                タスク追加
              </button>

              <p>{user?.email}</p>
              <button onClick={logout}>ログアウト</button>
              <Main setShowDeleteModal={setShowDeleteModal} />
              <Modal showFlag={modal} setShowModal={setShowModal} />
              <DeleteModal
                showFlag={deletemodal}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
