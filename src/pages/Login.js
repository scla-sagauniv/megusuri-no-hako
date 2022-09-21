/* useStateをimport↓ */
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';
import { useNavigate, Navigate } from 'react-router-dom';
/* Login.js */
import '../css/Login.css';
import pic from '../img/loginmac.png';

const Login = () => {
  /* ↓state変数を定義 */
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert('メールアドレスまたはパスワードが間違っています');
    }
  };

  /* ↓ログインを判定する設定 */
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.debug('currentUser: ', currentUser);
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <div className='container'>
            <img src={pic} width={"250"} height={"250"} alt='macIcon'/>
            <h1 className='login-page'>ログインページ</h1>
            <form className='infobox' onSubmit={handleSubmit}>
              <div className='input'>
                <label className='email-label'>メールアドレス</label>
                <input
                      name='email'
                      type='email'
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
              </div>
              <div className='input'>
                <label className='password-label'>パスワード</label>
                <input
                      name='password'
                      type='password'
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
              </div>
              <div className='input'>
                <button className='login-button'>ログイン</button>
                <button className='register-button' onClick={() => navigate('/register/')}>新規登録</button>
              </div>
            </form>
          </div>
        </>
        )
      }
    </>
  )
}

export default Login;
