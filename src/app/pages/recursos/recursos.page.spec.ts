import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecursosPage } from './recursos.page';

describe('RecursosPage', () => {
  let component: RecursosPage;
  let fixture: ComponentFixture<RecursosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
