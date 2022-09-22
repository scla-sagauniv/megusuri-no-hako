import '../App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Main from '../components/Main';
import Modal from '../components/Modal';
import DeleteModal from '../components/DeleteModal';
import { useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';
import '../css/Home.css';
import pic from '../img/MacIcon_mos.png';
// import { useFireStore } from '../hooks/useFireStore';
import { defaultTaskDefinition } from '../constants';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setShowModal] = useState(false);
  const [deletemodal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, selectTaskId] = useState();
  const [todoList, setTodoList] = useState(null);

  // const { data: todoList, getFireStoreList } = useFireStore();

  useEffect(() => {
    // getFireStoreList();

    const taskData = localStorage.getItem('taskData');
    if (taskData) {
      setTodoList(JSON.parse(taskData));
    } else {
      setTodoList(defaultTaskDefinition);
    }
  }, []);

  useEffect(() => {
    console.log('data', todoList);
    if (todoList) {
      localStorage.setItem('taskData', JSON.stringify(todoList));
    }
  }, [todoList]);

  //const [状態変数, 状態を変更するための関数] = useState(状態の初期値);

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

  const addTaskHandler = (newTask) => {
    setTodoList({
      ...todoList,
      todo: {
        ...todoList.todo,
        tasks: [newTask, ...todoList.todo.tasks /* newTask */],
      },
    });
  };

  const deleteTaskHandler = (taskUuid) => {
    // taskUuidと同じtaskを見つける
    // タスクを消す(消し方わからない)
    setTodoList({
      ...todoList,
      todo: {
        ...todoList.todo,
        tasks: todoList.todo.tasks.filter((task) => task.uuid !== taskUuid),
      },
      progress: {
        ...todoList.progress,
        tasks: todoList.progress.tasks.filter((task) => task.uuid !== taskUuid),
      },
      done: {
        ...todoList.done,
        tasks: todoList.done.tasks.filter((task) => task.uuid !== taskUuid),
      },
    });
    // ローカルストレージのtaskDataのuuidがtaskUuidと同じものを削除
    // localStorage.removeItem('taskData', todoList);
  };

  const changeTaskHandler = (taskUuid, updatedTask) => {
    console.log('changeTaskHandler', taskUuid, updatedTask);
    // deleteTaskHandler(taskUuid);
    // addTaskHandler(updatedTask);
    setTodoList({
      ...todoList,
      todo: {
        ...todoList.todo,
        tasks: todoList.todo.tasks.map((task) =>
          task.uuid === taskUuid ? updatedTask : task,
        ),
      },
      progress: {
        ...todoList.progress,
        tasks: todoList.progress.tasks.map((task) =>
          task.uuid === taskUuid ? updatedTask : task,
        ),
      },
      done: {
        ...todoList.done,
        tasks: todoList.done.tasks.map((task) =>
          task.uuid === taskUuid ? updatedTask : task,
        ),
      },
    });
  };

  const computedTask = useCallback(() => {
    console.debug('computedTask');
    const { todo, progress, done } = todoList;

    // console.debug(
    //   todo.tasks.filter((task) => task.id === selectedTaskId)[0],
    // );
    // console.debug(progress.tasks.filter((task) => task.id === selectedTaskId)[0]);
    // console.debug(done.tasks.filter((task) => task.id === selectedTaskId)[0]);

    if (todo.tasks.filter((task) => task.uuid === selectedTaskId)[0]) {
      return todo.tasks.filter((task) => task.uuid === selectedTaskId)[0];
    }

    if (progress.tasks.filter((task) => task.uuid === selectedTaskId)[0]) {
      return progress.tasks.filter((task) => task.uuid === selectedTaskId)[0];
    }

    if (done.tasks.filter((task) => task.uuid === selectedTaskId)[0]) {
      return done.tasks.filter((task) => task.uuid === selectedTaskId)[0];
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
                data={todoList}
                setData={setTodoList}
              />
              <Modal
                showFlag={modal}
                // task={computedTask()}
                todoList={todoList}
                addTaskHandler={addTaskHandler}
                setShowModal={setShowModal}
              />
              {selectedTaskId && (
                <DeleteModal
                  showFlag={deletemodal}
                  setShowDeleteModal={setShowDeleteModal}
                  close={closeDeleteModal}
                  task={computedTask()}
                  deleteTaskHandler={deleteTaskHandler}
                  changeTaskHandler={changeTaskHandler}
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
