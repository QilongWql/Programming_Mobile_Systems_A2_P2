import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { SearchComponent } from './search/search.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AuthorComponent } from './author-manager/author-manager.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Library Management System - Home page'
  },
  { 
    path: 'BookManagement', 
    component: BookManagerComponent,
    title: 'Book Management',
    children: [
      { path: 'add', component: BookManagerComponent },
      { path: 'edit/:name', component: BookManagerComponent }
    ]
  },
  { 
    path: 'Search', 
    component: SearchComponent,
    title: 'Book Search'
  },
  { 
    path: 'Privacy', 
    component: PrivacyComponent,
    title: 'Privacy'
  },
  { 
    path: 'Help', 
    component: HelpPageComponent,
    title: 'Help Centre'
  },
  { 
    path: 'Author',     
    component: AuthorComponent,
    title: 'Author' 
  },
  
  { path: '**', redirectTo: '' }
];