export interface CategoryType {
  id: string;
  name: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EventType {
  id: string;
  name: string;
  description: string;
  content: string;
  price: number;
  dateTime: string;
  type: string;
  city: string;
  address: string;
  participants: number;
  rating: number;
  photoUrl: string;
  categoryId: string;
  category: CategoryType;
  //chatId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
