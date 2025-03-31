import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Book } from '../models/book';
import { Author } from '../models/author';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-manager',
  standalone: true,
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class BookManagerComponent implements OnInit {
  books: Book[] = [];
  authors: Author[] = [];
  bookForm: FormGroup;
  isEditing = false;
  currentBookName = '';
  showConfirmDialog = false;
  bookToDelete = '';

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      authorId: ['', Validators.required],
      category: ['Painting', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      featured: [false]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.books = this.dataService.getBooks();
    this.authors = this.dataService.getAuthors();
  }

  getAuthorName(authorId: string): string {
    const author = this.authors.find(a => a.id === authorId);
    return author ? author.name : 'Unknown author';
  }

  resetForm() {
    this.bookForm.reset({
      category: 'Painting',
      price: 0,
      featured: false
    });
    this.isEditing = false;
    this.currentBookName = '';
  }

  onEdit(bookName: string) {
    const book = this.books.find(b => b.name === bookName);
    if (book) {
      this.isEditing = true;
      this.currentBookName = book.name;
      this.bookForm.patchValue({
        name: book.name,
        authorId: book.authorId,
        category: book.category,
        price: book.price,
        featured: book.featured
      });
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const formValue = this.bookForm.value;
    const bookData: Book = {
      name: formValue.name,
      authorId: formValue.authorId,
      category: formValue.category,
      price: formValue.price,
      featured: formValue.featured
    };

    if (this.isEditing) {
      this.dataService.updateBook(this.currentBookName, bookData);
    } else {
      this.dataService.addBook(bookData);
    }

    this.resetForm();
    this.loadData();
  }

  onDelete(bookName: string) {
    this.bookToDelete = bookName;
    this.showConfirmDialog = true;
  }

  onDeleteConfirmed(isConfirmed: boolean) {
    this.showConfirmDialog = false;
    
    if (isConfirmed) {
      this.dataService.deleteBook(this.bookToDelete);
      this.loadData();
      
      if (this.isEditing && this.currentBookName === this.bookToDelete) {
        this.resetForm();
      }
    }
    
    this.bookToDelete = '';
  }
}