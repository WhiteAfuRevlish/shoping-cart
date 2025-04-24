'use client';

import React, { useEffect, useState } from 'react';
import { ListCard } from './ListCard';
import { List, useLists } from '@/hooks/useLists';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Button } from '../ui/button';
import { useAlert } from '@/hooks/useAlert';
import { useRouter } from 'next/navigation';

export const Lists: React.FC = () => {
  const { lists, deleteList, selectedList, setSelectedList, fetchLists, loading } = useLists();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
      fetchLists();
  }, [fetchLists]);

  const { openAlert } = useAlert();

  const handleDeleteList = (list: List) => {
    openAlert({
      title: `Delete ${list.name}?`,
      message: 'Are you sure you want to delete this list?',
      onConfirm: async () => {
        try {
          await deleteList(list.id);

            if (list.id === selectedList?.id) {
              setSelectedList(null);
            }
        } catch (error) {}
      },
      onCancel: () => {}
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-4 ">
      <div className="flex flex-col w-full max-w-md">
        {lists.length === 0 ? (
          <p className="text-gray-500">No Lists</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 w-full ">
            {lists.map((list) => (
              <ListCard key={list.id} name={list.name} emoji={list.emoji} creationDate={list.creationDate} onDelete={() => handleDeleteList(list)} onClick={() => {}}/>
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4">
        <Button variant={'outline'}>
          <AiFillPlusCircle size={32} />
        </Button>
      </div>
    </div>
  );
};
