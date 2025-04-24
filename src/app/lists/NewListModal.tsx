import { useState, useEffect, FormEvent } from 'react';
import { List } from '@/types/list';
import { useLists } from '@/hooks/useLists';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface AddEditListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  list?: List;
}

export const AddEditListModal: React.FC<AddEditListModalProps> = ({
  open,
  onOpenChange,
  list,
}) => {
  const { createList, updateList } = useLists();

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    if (list?.name) {
      setName(list.name);
      setEmoji(list.emoji);
    }
  }, [list]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (name.trim() === '') return;

    if (list?.id) {
      const updatedList: List = {
        id: list.id,
        name,
        emoji,
        creationDate: list.creationDate,
      };
      await updateList(updatedList);
    } else {
      const newList: Omit<List, 'id'> = {
        name,
        emoji,
        creationDate: new Date(),
      };
      await createList(newList);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{list ? 'Edit List' : 'Add New List'}</DialogTitle>
          <DialogDescription className="text-center">
            {list ? 'Change the name and emoji of your list' : 'Create a new list to start shopping'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="List Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 px-4 py-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="emoji">Emoji</Label>
            <Input
              id="emoji"
              placeholder="Emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="h-10 px-4 py-2"
            />
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => onOpenChange(false)} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
