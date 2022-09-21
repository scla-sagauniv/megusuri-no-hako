/* useStateをimport↓ */
import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig.js';
import { useNavigate, Navigate } from 'react-router-dom';

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
      {/* ↓ログインしている場合、マイページにリダイレクトする設定 */}
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>ログインページ</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              {/* ↓「value」と「onChange」を追加 */}
              <input
                name='email'
                type='email'
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              {/* ↓「value」と「onChange」を追加 */}
              <input
                name='password'
                type='password'
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button>ログイン</button>
          </form>
          <button onClick={() => navigate('/register/')}>新規登録</button>
        </>
      )}
    </>
  );
};

export default Login;
