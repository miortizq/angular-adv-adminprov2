import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunction(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

   constructor( private settingServ : SettingsService,
                private sidebarServ: SidebarService) { }

  ngOnInit(): void {
    customInitFunction();
    this.sidebarServ.cargarMenu();
  }

}
