import { Component } from '@angular/core';
import { faArrowRightFromBracket, faBars, faChartLine, faClockRotateLeft, faList, faGear, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  faChartLine = faChartLine
  faRectangleList = faRectangleList
  faList = faList
  faClockRotateLeft = faClockRotateLeft
  faGear = faGear
  faArrowRightFromBracket = faArrowRightFromBracket
  faBars = faBars

  constructor(
    private cookie: CookieService,
    private route: Router,
    private messageService: MessageService,
  ) {
  }

  Logout() {
    this.cookie.delete("UserInfo");
    this.cookie.delete("UserExpiration");
    void this.route.navigate([""])

    this.messageService.add({
      severity: 'warn',
      summary: 'Logout',
      detail: "Logout realizado",
      life: 2000,
    })
  }
}
