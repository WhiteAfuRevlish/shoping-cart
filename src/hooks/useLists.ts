import { useState, useEffect } from 'react'; 
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from './useAuth';

export interface List {
  id: string;
  name: string;
  emoji: string;
  creationDate: Date;
}

export const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const [selectedList, setSelectedList] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('selectedList');

    }
    return null;
  });

  

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const listsCollection = collection(db, 'users', user.uid, 'lists');
    const q = query(listsCollection, orderBy('creationDate', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedLists = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as List[];
        setLists(fetchedLists);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const createList = async (listData: Omit<List, 'id'>) => {
    if (!user) return;
    try {
      const docRef = await addDoc(
        collection(db, 'users', user.uid, 'lists'),
        {
            ...listData,
            creationDate: listData.creationDate.toISOString(),
        }
      );
        setLists([...lists, { id: docRef.id, ...listData }]);
    } catch (err) {
        console.error("Error creating list:", err);
    }
  };
  
  const deleteList = async (listId: string) => {
    if (!user) return;
    try {
        await deleteDoc(doc(db, 'users', user.uid, 'lists', listId));
        setLists(lists.filter((list) => list.id !== listId));
    } catch (err: any) {
        console.error("Error deleting list:", err.message);
    }
  };

    const updateList = async (listId: string, listData: Partial<Omit<List, "id">>) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'lists', listId), {...listData});
      setLists(
        lists.map((list) =>
          list.id === listId ? { ...list, ...listData } : list
        )
      );
    } catch (err) {
    }
  };

  useEffect(() => {
        if(selectedList){
            localStorage.setItem('selectedList', selectedList);
        }
    }, [selectedList]);
  return {
    lists,
    loading,
    error,
    createList,
    deleteList,
    updateList,
    selectedList,
    setSelectedList
  };
};