import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecepiesBookComponent } from './my-recepies-book.component';

describe('MyRecepiesBookComponent', () => {
  let component: MyRecepiesBookComponent;
  let fixture: ComponentFixture<MyRecepiesBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRecepiesBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRecepiesBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
