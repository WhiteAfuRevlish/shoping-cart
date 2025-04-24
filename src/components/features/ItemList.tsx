import React from 'react'
import ItemCard from '@/components/features/ItemCard'
import { Skeleton } from '../ui/skeleton';

interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
  note?: string | undefined;
  emoji: string;
  isBought: boolean;
}
interface ItemListProps {
  items: Item[];
  loading: boolean;
  onItemChange: (item: Item) => void
}

interface ItemCardProps extends Omit<Item, 'checked'> {
  onBoughtChange: (isBought: boolean) => void;
  onClick: () => void;
}
const ItemList: React.FC<ItemListProps> = ({ items, loading, onItemChange }) => {
  return (
    <div className="w-full p-4">
      {loading ? (
        <ul className="animate-pulse flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex items-center gap-4 w-full">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-full h-6" />
            </li>
          ))}
        </ul>
      ) : items.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-500">No Items</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              {...item}
              onBoughtChange={(isBought) => {
                onItemChange({ ...item, isBought });
              }}

              onClick={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
