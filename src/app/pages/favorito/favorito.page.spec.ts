import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritoPage } from './favorito.page';

describe('FavoritoPage', () => {
  let component: FavoritoPage;
  let fixture: ComponentFixture<FavoritoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
