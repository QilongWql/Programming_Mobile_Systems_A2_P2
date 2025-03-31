export interface Book {
  name: string;
  authorId: string;
  category: 'Painting' | 'Sculpture' | 'Photography';
  price: number;
  featured: boolean;
}