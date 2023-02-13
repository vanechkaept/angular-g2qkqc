import { Component } from '@angular/core';

@Component({
  template: `
  <h1>Hello from !</h1>
  <a target="_blank" href="https://angular.io/start">
    Learn more about Angular 
  </a>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  value = 'Clear me';
}
