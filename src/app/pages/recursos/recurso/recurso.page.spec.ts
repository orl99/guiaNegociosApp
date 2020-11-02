import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecursoPage } from './recurso.page';

describe('RecursoPage', () => {
  let component: RecursoPage;
  let fixture: ComponentFixture<RecursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
