import React from "react";



const Modal = (props) => {
    //データベースに保存する処理を記述
    const closeModal = () => {
        props.setShowModal(false);
      };
  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div id="overlay">
          <div id="modalContent">

            <form id="task_form">

                <div className="setting_box">
                    <input id="task_title" type="text" placeholder="タイトルを入力"></input>
                </div>

                <div className="setting_box">
                    <label className="settings_label">優先度</label>
                    <select id="task_priority" name="color">
                        <option value="最重要">最重要</option>
                        <option value="重要">重要</option>
                        <option value="中">中</option>
                        <option value="低">低</option>
                    </select>
                </div>

                <div className="setting_box">
                    <label className="settings_label">期限を指定</label>
                    <input id="task_deadline" type="date"></input>
                </div>

                <div className="setting_box">
                    <label className="settings_label">タスクの説明</label>
                    <input id="task_description" type="text"></input>
                </div>
                
                <button onClick={closeModal}>保存</button>
            </form>

            
            
        
          </div>
        </div>
      ) : (
        <></>// showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;