import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

const Modal = (props) => {
  //データベースに保存する処理を記述
  const closeModal = () => {
    props.setShowModal(false);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    closeModal();
    reset();
  };

  return (
    <>
      {props.showFlag ? (
        // showFlagがtrueだったらformを表示する
        <div id='overlay'>
          <div id='modalContent'>
            <input
              className='close_btn'
              type='submit'
              value='閉じる'
              onClick={closeModal}
            />
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
                />
              </div>

              <div className='setting_box'>
                <label className='settings_label'>優先度</label>
                <select id='task_priority' {...register('task_priority')}>
                  <option value='最重要'>最重要</option>
                  <option value='重要'>重要</option>
                  <option value='中'>中</option>
                  <option value='低'>低</option>
                </select>
              </div>
              <div className='setting_box'>
                <label className='settings_label'>期限を指定</label>
                <input
                  id='task_deadline'
                  type='date'
                  {...register('task_deadline')}
                />
              </div>
              <div className='setting_box'>
                <label className='settings_label'>タスクの説明</label>
                <input
                  id='task_description'
                  type='text'
                  {...register('task_description')}
                />
              </div>
              <input
                id='submit_btn'
                type='submit'
                value='追加'
                {...register('type', '追加')}
              />
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
