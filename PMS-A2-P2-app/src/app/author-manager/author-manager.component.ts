import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Author } from '../models/author';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author',
  templateUrl: './author-manager.component.html',
  styleUrls: ['./author-manager.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class AuthorComponent {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  searchTerm: string = '';
  isEditing = false;
  currentAuthorId = '';
  showConfirmDialog = false;
  authorToDelete = '';

  authorForm: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      bio: [''],
      nationality: ['']
    });
    this.loadAuthors();
  }

  loadAuthors() {
    this.authors = this.dataService.getAuthors();
    this.filteredAuthors = [...this.authors];
  }

  applySearch() {
    if (!this.searchTerm) {
      this.filteredAuthors = [...this.authors];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(term) ||
      (author.bio && author.bio.toLowerCase().includes(term)) ||
      (author.nationality && author.nationality.toLowerCase().includes(term))
    );
  }

  startAddAuthor() {
    this.isEditing = false;
    this.currentAuthorId = '';
    this.authorForm.reset({
      name: '',
      bio: '',
      nationality: ''
    });
  }

  onEdit(authorId: string) {
    const author = this.authors.find(a => a.id === authorId);
    if (author) {
      this.isEditing = true;
      this.currentAuthorId = author.id;
      this.authorForm.patchValue({
        name: author.name,
        bio: author.bio || '',
        nationality: author.nationality || ''
      });
    }
  }

  onSubmit() {
    if (this.authorForm.invalid) return;

    const authorData = this.authorForm.value;
    if (this.isEditing) {
      // Update the author
      const updatedAuthor: Author = {
        id: this.currentAuthorId,
        ...authorData
      };
      this.dataService.updateAuthor(this.currentAuthorId, updatedAuthor);
    } else {
      // Add a new author
      this.dataService.addAuthor(authorData);
    }

    this.loadAuthors();
    this.applySearch();
    this.startAddAuthor();
  }

  onDelete(authorId: string) {
    const author = this.authors.find(a => a.id === authorId);
    if (author) {
      this.authorToDelete = authorId;
      this.showConfirmDialog = true;
    }
  }

  onDeleteConfirmed(isConfirmed: boolean) {
    this.showConfirmDialog = false;
    
    if (isConfirmed && this.authorToDelete) {
      this.dataService.deleteAuthor(this.authorToDelete);
      this.loadAuthors();
      this.applySearch();
      
      if (this.isEditing && this.currentAuthorId === this.authorToDelete) {
        this.startAddAuthor();
      }
    }
    
    this.authorToDelete = '';
  }

  cancelEdit() {
    this.startAddAuthor();
  }
}