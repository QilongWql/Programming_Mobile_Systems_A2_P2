import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterLink],
  template: `
    <a routerLink="/search" class="button">manage</a>
    <a routerLink="/search" class="button">searh</a>
    <a routerLink="/search" class="button">author</a>`
})
export class HomeComponent {
  constructor(public booksService: DataService) {}

  get featuredBooksCount(): number {
    return this.booksService.getBooks().filter(book => book.featured).length;
  }

  // Property to get total books count
  get totalBooksCount(): number {
    return this.booksService.getBooks().length;
  }

  // Property to get authors count
  get authorsCount(): number {
    return this.booksService.getAuthors().length;
  }
}