interface IReview {
  rating: string;
  userName: string;
  email: string;
  comment: string;
}

interface ITopProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  imageURL: string;
  avatarUrl: string;

  reviews?: IReview[];
}

interface IProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  imageURL: string;
  avatarUrl: string;

  reviews?: IReview[];
}

// total price
interface IRecord {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  imageURL: string;
  avatarUrl: string;

  quantity: number;
  priceTotal: number;

  reviews?: IReview[];
}

interface ICartItems {
  id: string;
  userId: string;
  userName: string;
  email: string;
  status: boolean;
  active: boolean;
  paid: boolean;
  timestamp: string;
  order?: IRecord[];
}

interface IManageItems extends IRecord {
  status: boolean;
  active: boolean;
  paid: boolean;
  timestamp: string;
  order?: IRecord[];
}
