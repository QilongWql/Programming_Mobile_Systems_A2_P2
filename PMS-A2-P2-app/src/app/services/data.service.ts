import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Author } from '../models/author';

@Injectable({ providedIn: 'root' })
export class DataService {
  updateBook(Book: string, updatedBook: Book): void {
    const index = this.books.findIndex(b => b.name === Book);
    if (index !== -1) {
      this.books[index] = updatedBook;
      this.saveToLocalStorage();
    }
  }

  private books: Book[] = [];
  private authors: Author[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  getAuthors(): Author[] {
    return this.authors;
  }

  addAuthor(authorData: Omit<Author, 'id'>): Author {
    const newAuthor: Author = {
      ...authorData,
      id: this.generateId()
    };
    this.authors.push(newAuthor);
    this.saveToLocalStorage();
    return newAuthor;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  updateAuthor(id: string, updatedAuthor: Author) {
    const index = this.authors.findIndex(a => a.id === id);
    if (index !== -1) {
      this.authors[index] = { ...updatedAuthor, id };
      this.saveToLocalStorage();
    }
  }

  deleteAuthor(id: string) {
    this.authors = this.authors.filter(a => a.id !== id);
    this.books = this.books.filter(b => b.authorId !== id);
    this.saveToLocalStorage();
  }

  getBooks(): Book[] {
    return this.books;
  }
  
  getBooksByAuthor(authorId: string): Book[] {
    return this.books.filter(book => book.authorId === authorId);
  }

  searchBooksByAuthorName(authorName: string): Book[] {
    const author = this.findAuthorByName(authorName);
    return author ? this.getBooksByAuthor(author.id) : [];
  }

  addBook(book: Book) {
    this.books.push(book);
    this.saveToLocalStorage();
  }

  deleteBook(book: string): void {
    this.books = this.books.filter(b => b.name !== book);
    this.saveToLocalStorage();
  }
  private saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
    localStorage.setItem('authors', JSON.stringify(this.authors));
  }

  private loadFromLocalStorage() {
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
    this.authors = JSON.parse(localStorage.getItem('authors') || '[]');
  }
  private findAuthorByName(name: string): Author | undefined {
    return this.authors.find(a => 
      a.name.toLowerCase() === name.toLowerCase()
    );
  }

}