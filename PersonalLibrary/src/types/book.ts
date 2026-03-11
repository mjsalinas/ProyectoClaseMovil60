export type BookStatus = 'read' | 'reading' | 'pending';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
  rating: number;
  review: string;
  coverImage?: string;
  photos: string[];
  startDate?: string;
  endDate?: string;
  createdAt: string;
}
