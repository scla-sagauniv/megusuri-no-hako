import React from "react";
import { useForm } from "react-hook-form";



const Modal = (props) => {
    //データベースに保存する処理を記述
    const closeModal = () => {
        props.setShowModal(false);
      };

      const {
        register,
        handleSubmit,reset,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);
        
        closeModal()
        reset()
      }

  return (
    <>
      {props.showFlag ? ( 
        // showFlagがtrueだったらformを表示する
        <div id ="overlay" >
          <div id="modalContent">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="setting_box">
                  <input id="task_title" type="text" placeholder="タイトルを入力" {...register("task_title")}></input>
                </div>
                

                <div className="setting_box">
                    <label className="settings_label">優先度</label>
                    <select id="task_priority" {...register("task_priority")}>
                        <option value="最重要">最重要</option>
                        <option value="重要">重要</option>
                        <option value="中">中</option>
                        <option value="低">低</option>
                    </select>
                </div>
                <div className="setting_box" >
                    <label className="settings_label">期限を指定</label>
                    <input id="task_deadline" type="date" {...register("task_deadline")}></input>
                </div>
                <div className="setting_box">
                    <label className="settings_label">タスクの説明</label>
                    <input id="task_description" type="text" {...register("task_description")}></input>
                </div>
              <input id="submit_btn" type="submit"/>


        </form>

          </div>
        </div>
        
       
        
        
      ) : (
        <></>// showFlagがfalseの場合はModalは表示しない
      )}
    </>
   
  )
};

export default Modal;