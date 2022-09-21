import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../FirebaseConfig.js';

const Modal = (props) => {
  //データベースに保存する処理を記述
  const closeModal = () => {
    props.setShowModal(false);
    reset();
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    updateDoc(doc(db, 'tomaTrelloUserId', 'todo'), {
      tasks: [...props.todoList.tasks, data],
    });
    console.log(props.todoList);
    closeModal();
  };

  return (
    <>
      {props.showFlag ? (
        // showFlagがtrueだったらformを表示する
        <div id='overlay'>
          <div id='modalContent'>
            <div class='batsu' onClick={closeModal}>
              ×
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                id='task_uuid'
                type='hidden'
                value={uuidv4()}
                {...register('task_uuid')}
              />
              <div className='setting_box'>
                <input
                  id='task_title'
                  type='text'
                  {...register('task_title')}
                  placeholder='タイトルを入力'
                  required
                />
              </div>

              <div className='setting_box'>
                <label className='settings_label'>優先度</label>
                <select
                  id='task_priority'
                  {...register('task_priority')}
                  required
                >
                  <option id='most_high' value='最重要'>
                    最重要
                  </option>
                  <option id='high' value='重要'>
                    重要
                  </option>
                  <option id='middle' value='中' selected>
                    中
                  </option>
                  <option id='low' value='低'>
                    低
                  </option>
                </select>
              </div>
              <div className='setting_box'>
                <label className='settings_label'>期限を指定</label>
                <input
                  id='task_deadline'
                  type='date'
                  {...register('task_deadline')}
                  required
                />
              </div>
              <div className='setting_box'>
                <label className='settings_label'>タスクの説明</label>
                <input
                  id='task_description'
                  type='text'
                  {...register('task_description')}
                  autoComplete='off'
                />
              </div>
              <input id='submit_btn' type='submit' value='保存' />
            </form>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;
