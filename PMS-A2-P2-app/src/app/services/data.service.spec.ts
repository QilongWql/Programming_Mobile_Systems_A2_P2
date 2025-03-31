import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({ providedIn: 'root' })
export class DataService {
  private booksKey = 'gallery-books';
  private books: Book[] = [];

  constructor() {
    this.loadFromStorage();
  }

// Get all books
  getBooks(): Book[] {
    return this.books;
  }
// Add books
  addBook(book: Book): void {
    this.books.push(book);
    this.saveToStorage();
  }
// Update by name
  updateBook(name: string, updatedBook: Book): void {
    const index = this.books.findIndex(b => b.name === name);
    if (index !== -1) {
      this.books[index] = updatedBook;
      this.saveToStorage();
    }
  }
// Delete the book
  deleteBook(name: string): void {
    this.books = this.books.filter(b => b.name !== name);
    this.saveToStorage();
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.booksKey);
    this.books = data ? JSON.parse(data) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.booksKey, JSON.stringify(this.books));
  }
}