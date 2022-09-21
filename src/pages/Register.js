/* useStateをimport↓ */
import React, { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { Navigate } from 'react-router-dom';
import '../css/Register.css';
import pic from '../img/loginmac.png';

const Register = () => {
  /* ↓state変数を定義 */
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [user, setUser] = useState('');

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
    } catch (error) {
      alert('正しく入力してください');
    }
  };
  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {/* ↓ログインしていればマイページを表示 */}
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
        <div className='container'>
        <img src={pic} width={"250"} height={"250"} alt='macIcon'/>
          <h1 className='register-page'>新規登録</h1>
          <form className='infobox' onSubmit={handleSubmit}>
            <div className='input'>
              <label className='email-label'>メールアドレス</label>
              {/* ↓「value」と「onChange」を追加 */}
              <input
                name='email'
                type='email'
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div className='input'>
              <label className='password-label'>パスワード</label>
              <input
                name='password'
                type='password'
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <button className='register'> 登録</button>
          </form>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
