'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useItems } from '@/hooks/useItems';
import { useEffect, useState } from 'react';


interface AddItemModalProps {
  listId: string;
  onCancel: () => void;
  item?: {
    id: string;
    name: string;
    quantity: number;
    category: string;
    emoji: string;
    note?: string;
    isBought: boolean;
  };
}

// eslint-disable-next-line react/display-name
const AddItemForm: React.FC<AddItemModalProps> = ({ listId, onCancel, item }) => {
  const [name, setName] = useState<string>(item?.name || '');
  const [quantity, setQuantity] = useState<number>(item?.quantity || 1);
  const [category, setCategory] = useState<string>(item?.category || '');
  const [emoji, setEmoji] = useState<string>(item?.emoji || '🛒');
  const [note, setNote] = useState<string>(item?.note ?? '');
  const [open, setOpen] = useState(true);
  const { createItem, updateItem } = useItems(listId);
  
  const handleSave = () => {
    item ? updateItem(item.id, { name, quantity, category, emoji, note }) : createItem({ name, quantity, category, emoji, note });
    setName('');
    setQuantity(1);
    setCategory('');
    setEmoji('🛒');
    setNote('');
    onCancel();
  };
  
  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setCategory(item.category);
      setEmoji(item.emoji);
      setNote(item.note);
    }
  }, [item]);

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader>
          <DialogTitle className="font-bold">{item ? 'Edit item' : 'Add item'}</DialogTitle>
          <DialogDescription>{item ? 'Modify item info' : 'Add a new item to your list.'}</DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Quantity"
            id="quantity"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <Input
            label="Category"
            id="category"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            label="Emoji"
            id="emoji"
            type="text"
            placeholder="Emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
          <Input
            label="Note"
            id="note"
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <DialogFooter className="p-4">
          <Button
            type="button"
            onClick={onCancel}
            variant={'outline'}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="ml-3 flex-1"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddItemForm;
