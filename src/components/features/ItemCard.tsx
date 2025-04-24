import { Card } from '@/components/ui/card';
import { useModal } from '@/hooks/useModal';
import { Checkbox } from '@/components/ui/checkbox';

interface ItemCardProps {
  name: string;
  quantity: number;
  category: string;
  id: string;
  emoji: string;
  isBought: boolean;
  note?: string;
  onClick?: () => void;
  onBoughtChange?: (isBought: boolean) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  name,
  quantity,
  category,
  emoji,
  isBought,
  id,
  note,  
  onBoughtChange,
}) => {
  const { isOpen, onClose, onOpen } = useModal();

  const handleBoughtChange = () => {
    if (onBoughtChange) {
      onBoughtChange(!isBought);
    }
  };

  const handleEditClick = () => {
    onOpen();
  };

  return (<>
    
    <Card onClick={handleEditClick} className="relative p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Checkbox checked={isBought} onCheckedChange={handleBoughtChange}/>
          <span className="text-xl">{emoji}</span>
        </div>
      </div>
      <h3 className={`font-semibold ${isBought ? 'line-through text-gray-500' : ''}`}>
        {name}
      </h3>
      <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Quantity:</span> {quantity}
        </div>
        <div>
          <span className="font-medium">Category:</span> {category}
        </div>
        {note && (
          <div>
            <span className="font-medium">Note:</span> {note}
          </div>
        )}
          {/* <div className="text-sm text-gray-600">
            <span className="font-medium">Category:</span> {category}
          </div>
          {note && <div className="text-sm text-gray-600">
            <span className="font-medium">Note:</span> {note}
          </div>}
        </div>
      </div>
      </Card>
      </>
  );
};
