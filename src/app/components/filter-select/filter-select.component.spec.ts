import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSelectComponent } from './category-select.component';

describe('SortSelectComponent', () => {
  let component: SortSelectComponent;
  let fixture: ComponentFixture<SortSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
