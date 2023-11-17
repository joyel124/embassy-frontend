import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.css']
})
export class LanguageButtonComponent implements OnInit{
  isOptionsHidden = true;
  language = '';
  languageCode = 'es';
  languages = [
    {id: 1, name: 'fi fi-es', code: 'es'},
    {id: 2, name: 'fi fi-us', code: 'en'},
    {id: 3, name: 'fi fi-br', code: 'br'}
  ]
  constructor() { }
  showDropdownOptions() {
    this.isOptionsHidden = !this.isOptionsHidden;
  }
  ngOnInit(){
    this.languageCode= localStorage.getItem('languageCode') || 'es';
    localStorage.setItem('languageCode', this.languageCode);
    if(this.languageCode == 'es'){
      this.language = 'fi fi-es';
    }
    else {
      if(this.languageCode == 'en'){
        this.language = 'fi fi-us';
      }else{
        this.language = 'fi fi-br';
      }
    }
    //this.i18nService.setLanguage(this.languageCode);
  }
  setLanguage(String: string, code: string){
    this.language = String;
    this.isOptionsHidden= true;
    this.languageCode = code;
    localStorage.setItem('languageCode', code);
    //this.i18nService.setLanguage(code);
  }
}
