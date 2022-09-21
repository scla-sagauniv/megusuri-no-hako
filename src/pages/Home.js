import '../App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Main from '../components/Main';
import Modal from '../components/Modal';
import DeleteModal from '../components/DeleteModal';
import { useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import '../css/Home.css';
import pic from '../img/MacIcon_mos.png';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setShowModal] = useState(false);
  const [deletemodal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, selectTaskId] = useState();

  //const [状態変数, 状態を変更するための関数] = useState(状態の初期値);
  const [data, setData] = useState();

  const showModal = () => {
    setShowModal(true);
  };

  const showDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    selectTaskId(undefined);
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

  const computedTask = useCallback(() => {
    console.debug('computedTask');
    const [pending, active, done] = data;

    // console.debug(
    //   pending.tasks.filter((task) => task.id === selectedTaskId)[0],
    // );
    // console.debug(active.tasks.filter((task) => task.id === selectedTaskId)[0]);
    // console.debug(done.tasks.filter((task) => task.id === selectedTaskId)[0]);

    if (pending.tasks.filter((task) => task.id === selectedTaskId)[0]) {
      return pending.tasks.filter((task) => task.id === selectedTaskId)[0];
    }

    if (active.tasks.filter((task) => task.id === selectedTaskId)[0]) {
      return active.tasks.filter((task) => task.id === selectedTaskId)[0];
    }

    if (done.tasks.filter((task) => task.id === selectedTaskId)[0]) {
      return done.tasks.filter((task) => task.id === selectedTaskId)[0];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTaskId]);

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
                  <img
                    src={pic}
                    width={'70'}
                    height={'100'}
                    alt='MacIcon_Mos'
                  />
                  <h1 className='apptitle'>タスク管理アプリ</h1>
                  {/* <button className='task_add_btn' onClick={showModal}>
                <img src={pulsImg}/>
              </button> */}
                  <input
                    type='button'
                    className='task_add_button'
                    onClick={showModal}
                  />
                </div>
                <div className='right'>
                  <p className='user'>{user?.email}</p>
                  <button className='logout' onClick={logout}>
                    ログアウト
                  </button>
                </div>
              </div>
              <Main
                setShowDeleteModal={showDeleteModal}
                selectTaskId={selectTaskId}
                data={data}
                setData={setData}
              />
              <Modal showFlag={modal} setShowModal={setShowModal} />
              {selectedTaskId && (
                <DeleteModal
                  showFlag={deletemodal}
                  setShowDeleteModal={setShowDeleteModal}
                  close={closeDeleteModal}
                  task={computedTask()}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
