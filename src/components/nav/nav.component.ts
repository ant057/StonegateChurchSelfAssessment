// angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'assessment-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  defaultElevation = 0;
  menuLinks = [
    { path: '/home', label: 'Home' },
    { path: '/admin', label: 'Admin'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(label: string): void {
    const link = this.menuLinks.find(c => c.label === label);
    this.router.navigate([link.path]);
  }

}
