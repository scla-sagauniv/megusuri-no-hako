import { getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { db, auth } from '../FirebaseConfig.js';

export const useFireStore = () => {
  const [data, setData] = useState();

  const getFireStoreList = async () => {
    try {
      console.log('auth', auth);
      const snapshot = await getDocs(db, 'tomaTrelloUserId', 'todo');
      // console.log(snapshot);
      // const res = snapshot.data();
      // const snapshot = await getDocs(collection(db, 'User'));
      let taskColumns = [];
      snapshot.forEach((doc) => {
        taskColumns.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
      console.log(taskColumns);
      setData(taskColumns);
    } catch (error) {
      console.log(error);
    }
  };

  return { getFireStoreList, data };
};
