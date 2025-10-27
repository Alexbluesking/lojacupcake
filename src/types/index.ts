export interface Cupcake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  active: boolean;
}

export interface CartItem {
  cupcake: Cupcake;
  quantity: number;
  customizations?: {
    flavor?: string;
    extras?: string[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: Address;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'on_the_way' | 'delivered';
  paymentMethod: 'card' | 'pix' | 'cash';
  deliveryAddress: Address;
  createdAt: Date;
  rating?: number;
  review?: string;
}
