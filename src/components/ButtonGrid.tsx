import React, { useMemo } from 'react';
import { Item } from '../types';
import { PriceButton } from './PriceButton';

interface ButtonGridProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({ items, onItemClick }) => {
  const groupedItems = useMemo(() => {
    const groups = items.reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);
      return acc;
    }, {} as Record<string, Item[]>);

    // Sort groups by name
    return Object.entries(groups).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));
  }, [items]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {groupedItems.map(([name, items]) => (
        <div key={name} className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-700 text-center">{name}</h3>
          <div className="flex flex-col gap-2">
            {items
              .sort((a, b) => b.price - a.price) // Sort by price descending within each group
              .map((item) => (
                <PriceButton
                  key={item.id}
                  {...item}
                  onClick={onItemClick}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};