import {Component, HostListener} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {

  isMenuOpen = false;
  isSmallScreen = false;
  constructor(private authService: AuthService) {
    //this.slides2=this.slides2_es;
  }
  languageCode: string = '';
  currentSlideIndex = 0;
  intervalTime = 4000; //
  openLogin() {
    this.authService.openLogin();
  }

  openRegister() {
    this.authService.openRegister();
  }

  ngOnInit(): void {
    this.languageCode = localStorage.getItem('languageCode')||'es';
    this.checkScreenSize();
  }

  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1024;
    this.isMenuOpen = !this.isSmallScreen;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
