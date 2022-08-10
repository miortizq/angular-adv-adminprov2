import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingServ: SettingsService) { }

  ngOnInit(): void {
    this.settingServ.checkCurrentTheme();
  }

  changeTheme(theme: string){
    this.settingServ.changeTheme(theme);

  }

  

}
