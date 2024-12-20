import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThumbnailComponent } from './add-thumbnail.component';

describe('AddThumbnailComponent', () => {
  let component: AddThumbnailComponent;
  let fixture: ComponentFixture<AddThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
