import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddTaskPopupComponent } from './add-task-popup.component';

describe('AdddTaskPopupComponent', () => {
  let component: AdddTaskPopupComponent;
  let fixture: ComponentFixture<AdddTaskPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdddTaskPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdddTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
