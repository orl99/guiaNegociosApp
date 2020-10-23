import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // pageNameTem: string;
  // @Input() pageName: string;
  toolTipType: 'main' | 'page' | 'favorito';
  @Input() headerType: 'main' | 'page' | 'favorito';
  constructor() { }

  ngOnInit() {
    this.toolTipType = this.headerType;
  }

}
