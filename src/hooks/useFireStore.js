import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../FirebaseConfig.js';

export const useFireStore = () => {
  const [data, setData] = useState();

  const getFireStoreList = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'tomaTrelloUserId'));
      let taskColumns = [];
      snapshot.forEach((doc) => {
        taskColumns.push(doc.data());
        // console.log(doc.id, " => ", doc.data());
      });
      taskColumns.reverse();

      setData(taskColumns);
    } catch (error) {
      console.log(error);
    }
  };

  return { getFireStoreList, data };
};
