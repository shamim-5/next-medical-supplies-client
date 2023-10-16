interface IReview {
  rating: string;
  userName?: string;
  email: string;
  comment?: string;
}

interface ITopProduct {
  _id: string;
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  stock?: number;
  manufacturer?: string;
  imageURL?: string;
  avatarUrl?: string;

  reviews: IReview[];
}

interface IProduct {
  _id: string;
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  stock?: number;
  manufacturer?: string;
  imageURL?: string;
  avatarUrl?: string;

  reviews: IReview[];
}
