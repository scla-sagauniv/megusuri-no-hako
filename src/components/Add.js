import React, { useState } from 'react'
import Form from './Form';
const Add = () => {
    const [flag, setFlag] = useState(false);
    

    const  setForm = () => {
        console.log(flag);//flagの値を確認する
        if(flag){
            //formを削除する
            setFlag(!flag);//flagの値を変更する

        }else{
            //formを画面に表示する
            setFlag(!flag);//flagの値を変更する
            
            
        }

        
    }

    return (
        <button onClick={setForm}>task</button>
    )

    
    
 
}

export default Add;