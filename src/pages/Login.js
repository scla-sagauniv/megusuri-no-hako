/* Login.js */

import React from 'react';
import '../components/Login.css';
import pic from '../img/loginmac.png';

const Login = () => {
  return (
    <>
    <div className='container'>
      <img src={pic} width={"250"} height={"250"} alt='macIcon'/>
      <h1 className='login-page'>ログインページ</h1>
      <form className='infobox'>
        <div className='input'>
          <label className='email-label'>メールアドレス</label>
          <input name='email' type='email' />
        </div>
        <div className='input'>
          <label className='password-label'>パスワード</label>
          <input name='password' type='password' />
        </div>
        <div className='input'>
          <button className='login-button'>ログイン</button>
          <button className='register-button'>新規登録</button>
          </div>
      </form>
      </div>
    </>
  );
};

export default Login;
