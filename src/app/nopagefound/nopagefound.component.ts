import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css'],
  styles: []
})
export class NopagefoundComponent {

  year = new Date().getFullYear();
  
  constructor() { }
}
