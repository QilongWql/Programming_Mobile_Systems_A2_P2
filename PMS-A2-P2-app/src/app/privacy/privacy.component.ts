import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  imports: [CommonModule, RouterModule]
})
export class PrivacyComponent {
  securityPrinciples = [
    {
      title: 'Data encryption',
      description: 'All sensitive data is encrypted when it is transmitted (using TLS) and stored, ensuring that it cannot be read even if it is intercepted.'
    },
    {
      title: 'Access control',
      description: 'Implement a role-based access control (RBAC) system to ensure that users can only access functions and data within their permissions.'
    },
    {
      title: 'Authentication mechanism',
      description: 'Use multi-factor authentication and strong password policies to prevent unauthorized account access.'
    },
    {
      title: 'Input verification',
      description: 'Strictly validate and clean all user input to prevent attacks such as SQL injection and XSS.'
    },
    {
      title: 'Audit log',
      description: 'Record all critical operations and access behaviors for security audit and incident tracing.'
    },
    {
      title: 'Update regularly',
      description: 'Keep systems and dependent libraries up to date and patch known security vulnerabilities.'
    }
  ];
}