import { useState, useEffect, Unsubscribe } from 'react';
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  Firestore,
  onSnapshot,
  addDoc
} from 'firebase/firestore';

import { db } from '../services/firebase';

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
  note?: string;
  emoji: string;
  isBought: boolean;
}

const useItems = (listId: string | undefined) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    if (unsubscribe) {
      unsubscribe();
    }
    if (!listId) {
        setLoading(false);
        setItems([]);
        return;
    }
    const q = query(collection(db, 'items'), where('listId', '==', listId));
    const unsubscribeFunc = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedItems: Item[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          quantity: doc.data().quantity,
          category: doc.data().category,
          note: doc.data().note,
          emoji: doc.data().emoji,
          isBought: doc.data().isBought ?? false,
        }));
        

        setItems(fetchedItems);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    setUnsubscribe(() => unsubscribeFunc);

    return () => {
        if (unsubscribe)
            unsubscribe()
    };
  }, [listId]);

  const createItem = async (item: Omit<Item, 'id'>) => {
    if (!listId) {
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'items'), { ...item, listId });
      setItems([...items, { ...item, id: docRef.id }]);
    } catch (err: any) {
      setError(err.message);
    }
  };


  const updateItem = async (itemId: string, updatedItem: Partial<Item>) => {
    try {
      await updateDoc(doc(db, 'items', itemId), updatedItem);
      setItems(items.map((item) => {
        if (item.id === itemId) {
            return { ...item, ...updatedItem };
        }
        return item;
      })));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
  };
};

export default useItems;