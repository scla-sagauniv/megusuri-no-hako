import React from 'react';

const Register = () => {
  return (
    <>
      <h1>新規登録</h1>
      <form>
        <div>
          <label htlmFor='email'>メールアドレス</label>
          <input id='email' name='email' type='email' />
        </div>
        <div>
          <label htmlFor='password'>パスワード</label>
          <input id='password' name='password' type='password' />
        </div>
        <button>ログイン</button>
      </form>
    </>
  );
};

export default Register;
