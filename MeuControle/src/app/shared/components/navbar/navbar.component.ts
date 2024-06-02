import { Component } from '@angular/core';
import { faArrowRightFromBracket, faBars,  faChartLine,  faClipboardList,  faClockRotateLeft,  faList, faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faChartLine = faChartLine
  faClipboardList = faClipboardList
  faList = faList
  faClockRotateLeft = faClockRotateLeft
  faGear = faGear
  faArrowRightFromBracket = faArrowRightFromBracket
  faBars = faBars
}
