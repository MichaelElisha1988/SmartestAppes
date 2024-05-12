import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRecipieInfoComponent } from './selected-recipie-info.component';

describe('SelectedRecipieInfoComponent', () => {
  let component: SelectedRecipieInfoComponent;
  let fixture: ComponentFixture<SelectedRecipieInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedRecipieInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedRecipieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
