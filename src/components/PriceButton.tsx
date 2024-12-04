import React from 'react';
import { Item } from '../types';
import { Lock } from 'lucide-react';

interface PriceButtonProps extends Item {
  onClick: (item: Item) => void;
}

export const PriceButton: React.FC<PriceButtonProps> = ({ 
  id, 
  name, 
  price, 
  discount, 
  excludeFromDiscounts, 
  onClick 
}) => {
  return (
    <button
      onClick={() => onClick({ id, name, price, discount, excludeFromDiscounts })}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors
                 flex flex-col items-center space-y-1 relative"
    >
      <span className="font-semibold">{name}</span>
      <span className="text-sm">{price.toFixed(2)}€</span>
      {discount && !excludeFromDiscounts && (
        <span className="text-xs bg-green-400 px-2 rounded-full">-{discount}%</span>
      )}
      {excludeFromDiscounts && (
        <div className="absolute -top-2 -right-2 bg-gray-700 rounded-full p-1" title="No discounts apply">
          <Lock className="h-3 w-3" />
        </div>
      )}
    </button>
  );
};