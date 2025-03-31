import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface FaqItem {
  question: string;
  answer: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-help-page',
  standalone: true,
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HelpPageComponent {
  faqs: FaqItem[] = [
    {
      question: 'How to search for books?',
      answer: 'Enter a book title or author\'s name on the search page to narrow your search using filters.',
      expanded: false
    },
    {
      question: 'How do I add new books?',
      answer: 'Click the "Add New Book" button on the library management page, complete the information and submit.',
      expanded: false
    },
    {
      question: 'Why are my changes not saved?',
      answer: 'Make sure the "Save" button is clicked, and if the problem persists, check your network connection.',
      expanded: false
    },
    {
      question: 'How do I mark selected books?',
      answer: 'Check the "Selected Books" option when editing the book information and save it.',
      expanded: false
    }
  ];

  troubleshooting = [
    {
      issue: 'Slow page loading',
      solution: 'Try refreshing the page or clearing the browser cache'
    },
    {
      issue: 'Unable to save book information',
      solution: 'Check that all required fields are complete'
    },
    {
      issue: 'Search no results',
      solution: 'Try different keywords or relax the filter'
    }
  ];

  contactInfo = {
    email: 'support@GXUST.com',
    phone: '123-456-7890',
    hours: 'Monday to Friday 9:00-18:00'
  };
}