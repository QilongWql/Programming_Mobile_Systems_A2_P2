import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , FormControl} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { Book } from '../models/book';
import { Author } from '../models/author';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})

export class SearchComponent {
  searchTerm: string = '';
  books: Book[] = [];
  filteredBooks: Book[] = [];
  hasSearched = false;
  allAuthors: Author[] = [];

  searchOptions = {
    searchBy: 'title' as 'title' | 'author',
    showAuthorFilter: false
  };

  constructor(private dataService: DataService) {
    this.books = this.dataService.getBooks();
  }
  filters = {
    category: '',
    minPrice: null as number | null,
    maxPrice: null as number | null,
    featuredOnly: false,
    selectedAuthor: ''
  };

  categories: string[] = ['All', 'Literature', 'Science', 'History', 'Technology', 'Art'];

  private loadData() {
    this.books = this.dataService.getBooks();
    this.allAuthors = this.dataService.getAuthors();
    this.filteredBooks = [...this.books];
  }

  applyFilters() {
  this.hasSearched = true;
    if (!this.searchTerm && 
        !this.filters.selectedAuthor && 
        !this.filters.category && 
        !this.filters.featuredOnly) {
      this.filteredBooks = [];
      return;
    }
    this.filteredBooks = this.books.filter(book => {
      const author = this.allAuthors.find(a => a.id === book.authorId);
      const authorName = author ? author.name.toLowerCase() : '';
      const matchesSearch = this.searchOptions.searchBy === 'title' 
        ? book.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : authorName.includes(this.searchTerm.toLowerCase());
      const matchesAuthor = 
        !this.filters.selectedAuthor || 
        book.authorId === this.filters.selectedAuthor;

        const matchesCategory = 
        !this.filters.category || 
        this.filters.category === 'All' || 
        book.category === this.filters.category;
      const matchesMinPrice = 
        !this.filters.minPrice || 
        book.price >= this.filters.minPrice;
      
      const matchesMaxPrice = 
        !this.filters.maxPrice || 
        book.price <= this.filters.maxPrice;
      const matchesFeatured = 
        !this.filters.featuredOnly || 
        book.featured;

      return matchesSearch && 
             matchesAuthor &&
             matchesCategory && 
             matchesMaxPrice && 
             matchesFeatured;
    });
  }

  getAuthorName(book: Book): string {
    const author = this.allAuthors.find(a => a.id === book.authorId);
    return author ? author.name : 'Unknown Author';
  }

  resetAllFilters() {
    this.searchTerm = '';
    this.filters = {
      category: '',
      minPrice: null as number | null,
      maxPrice: null as number | null,
      featuredOnly: false,
      selectedAuthor: ''
    };
    this.filteredBooks = [];
    this.hasSearched = false;
  }

  toggleSearchBy() {
    this.searchOptions.searchBy = 
      this.searchOptions.searchBy === 'title' ? 'author' : 'title';
    this.applyFilters();
  }
}