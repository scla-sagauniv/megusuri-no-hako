import { useForm } from 'react-hook-form';

const DeleteModal = (props) => {
  const closeDeleteModal = () => {
    props.close();
  };

  const deleteTask = () => {
    //削除機能を追加
    console.log(props.task.id);
    closeDeleteModal();
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data); //本来はデータを追加するコード
    closeDeleteModal();
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
              onClick={closeDeleteModal}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                id='task_uuid'
                type='hidden'
                value={props.task.id}
                {...register('uuid')}
              />
              <div className='setting_box'>
                <input
                  id='task_title'
                  type='text'
                  defaultValue={props.task.title}
                  {...register('title')}
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
                  required
                />
              </div>
              <div className='setting_box'>
                <label className='settings_label'>タスクの説明</label>
                <input
                  id='task_description'
                  type='text'
                  defaultValue={props.task.title}
                  {...register('task_description')}
                />
              </div>

              <input id='submit_change' type='submit' value='変更' />

              <button id='submit_delete' onClick={deleteTask}>
                削除
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default DeleteModal;
