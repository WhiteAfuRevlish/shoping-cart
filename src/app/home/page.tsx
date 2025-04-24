'use client';

import React, { useEffect } from 'react';
import ItemList from '@/components/features/ItemList';
import useItems from '@/hooks/useItems';
import { Input } from '@/components/ui/input';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Button } from "@/components/ui/button"
import { useLists } from '@/hooks/useLists';
import AddItemModal from './AddItemModal'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import useModal from '@/hooks/useModal';

const HomePage: React.FC = () => {
  const { selectedList } = useLists();
  const { items, loading } = useItems(selectedList?.id ?? '');
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <div className="flex flex-col h-full w-full p-4 gap-4 overflow-hidden">
      <Card className='w-full'>
        <CardContent>
          <div className='text-center'>
            <p>You usually buy milk on Mondays. Add it?</p>
          </div>
        </CardContent>
      </Card>
      <div className='flex flex-col gap-2 w-full'>
        <Input
          type="text"
          placeholder="Search items..."
          className="w-full"
        />
      </div>
      <div className='grow relative w-full'>
        <ItemList items={items} loading={loading} onItemChange={() => {}} />
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogTrigger asChild>
            <div className='fixed bottom-6 right-6'>
              <Button
                className='rounded-full p-4 shadow-lg' onClick={onOpen}
              >
                <AiFillPlusCircle size={30} />
              </Button>
            </div >
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <AddItemModal listId={selectedList?.id ?? ''} onCancel={onClose} />
            <DialogClose asChild>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};


export default HomePage;
