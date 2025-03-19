import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseData,VIEWCOURSE,ViewData } from '../../course-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-page',
  imports: [CommonModule],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss'
})

export class CoursesPageComponent implements OnInit{
  courses:CourseData[]=[];
  viewdetails:ViewData[]=VIEWCOURSE;
  selectedCourse: CourseData | null = null;
  selectedViewDetails: ViewData | null = null;
  isCPopupOpen = false;
  isJPopupOpen=false;
  isCheckoutPopupOpen=false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCourses(); // Call the function to fetch courses when the component initializes
  }

  getCourses(): void {
    this.http.get<CourseData[]>("http://localhost:8080/api/all").subscribe({
      next: (response) => {
        console.log("Courses fetched:", response);
        this.courses = response; // Store the fetched courses in the courses array
      },
      error: (error) => {
        console.error("Error fetching courses:", error);
      }
    });
  }

  openCoursePopup(course: CourseData): void {
    this.selectedCourse = course;
    this.selectedViewDetails = this.viewdetails.find(view => view.id === course.courseid) || null;
    this.isCPopupOpen = true; // Open the popup
    document.body.classList.add("no-scroll");
  }

  closePopup(): void {
    this.isCPopupOpen = false; // Close the popup
    this.selectedCourse = null;
    this.selectedViewDetails = null;
    document.body.classList.remove("no-scroll");
  }

  showJoin(){
    this.isCPopupOpen = false;    
    this.isCheckoutPopupOpen=false;
    this.isJPopupOpen=true;
  }

  showPay(){
    this.isCPopupOpen=false;
    this.isJPopupOpen=false;
    this.isCheckoutPopupOpen=true;
  }

}
