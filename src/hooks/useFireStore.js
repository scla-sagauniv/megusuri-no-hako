import { getDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../FirebaseConfig.js';

export const useFireStore = () => {
  const [data, setData] = useState();

  const getFireStoreList = async () => {
    try {
      const snapshot = await getDoc(doc(db, 'tomaTrelloUserId', 'todo'));
      console.log(snapshot);
      const res = snapshot.data();

      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  return { getFireStoreList, data };
};
