export interface Item {
  id: string;
  name: string;
  price: number;
  discount?: number;
  excludeFromDiscounts?: boolean;
}

export interface CartItem extends Item {
  appliedDiscount: number;
}