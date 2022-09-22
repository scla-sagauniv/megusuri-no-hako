import { useForm } from 'react-hook-form';

const DeleteModal = (props) => {
  const closeDeleteModal = () => {
    props.close();
    reset();
  };

  const deleteTask = () => {
    //削除機能を追加
    console.log(props.task.uuid);
    props.deleteTaskHandler(props.task.uuid);
    closeDeleteModal();
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data); //本来はデータを追加するコード
    props.changeTaskHandler(props.task.uuid, data);
    closeDeleteModal();
  };

  return (
    <>
      {props.showFlag ? (
        // showFlagがtrueだったらformを表示する

        <div id='overlay'>
          <div id='modalContent'>
            <div className='batsu' onClick={closeDeleteModal}>
              ×
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                id='uuid'
                type='hidden'
                value={props.task.uuid}
                {...register('uuid')}
              />
              <div className='setting_box'>
                <input
                  id='title'
                  type='text'
                  defaultValue={props.task.title}
                  {...register('title')}
                  required
                />
              </div>

              <div className='setting_box'>
                <label className='settings_label'>優先度</label>
                <select
                  id='priority'
                  defaultValue={props.task.priority}
                  {...register('priority')}
                  required
                  // defaultValue={props.task?.priority ?? '1'}
                >
                  <option value='1'>最重要</option>
                  <option value='2'>重要</option>
                  <option value='3'>中</option>
                  <option value='4'>低</option>
                </select>
              </div>
              <div className='setting_box'>
                <label className='settings_label'>期限を指定</label>
                <input
                  id='deadline'
                  type='date'
                  {...register('deadline')}
                  required
                  defaultValue={props.task?.deadline ?? '2022-09-28'}
                />
              </div>
              <div className='setting_box'>
                <label className='settings_label'>タスクの説明</label>
                <input
                  id='description'
                  type='text'
                  defaultValue={props.task.description}
                  {...register('description')}
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
