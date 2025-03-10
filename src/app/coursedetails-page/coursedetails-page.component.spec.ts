import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursedetailsPageComponent } from './coursedetails-page.component';

describe('CoursedetailsPageComponent', () => {
  let component: CoursedetailsPageComponent;
  let fixture: ComponentFixture<CoursedetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursedetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursedetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
