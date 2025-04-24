import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface ListCardProps {
  name: string;
  emoji: string;
  creationDate: Date;
  onClick?: () => void;
  onDelete?: () => void;
}

const ListCard: React.FC<ListCardProps> = ({
  name,
  emoji,
  creationDate,
  onClick,
  onDelete,
}) => {  
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li className="relative">
      <div
        className="group flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 shadow-md hover:bg-gray-100 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="flex items-center">
          <span className="mr-4 text-3xl">{emoji}</span>
          <div className="flex flex-col">
            <h3 className="text-gray-800 text-lg font-semibold">{name}</h3>
            <p className="text-gray-500 text-sm">
              {creationDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="absolute right-2 top-2">
          {isHovered && onDelete && (
            <div className="group">
              <button
                onClick={(e) => { e.stopPropagation(); onDelete();}}
                className="group-hover:opacity-100 rounded-full p-2 text-red-500 opacity-0 transition-colors hover:text-red-700"
                aria-label="Delete list"
              >
                <AiFillDelete size={20} className="h-5 w-5"/>
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ListCard;