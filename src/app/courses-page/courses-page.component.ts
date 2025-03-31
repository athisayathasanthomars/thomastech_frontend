import { Component,OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseData,VIEWCOURSE,ViewData,TesttimonialData,VIEWTESTIMONIAL } from '../../course-data';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-page',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CoursesPageComponent implements OnInit{
  courses:CourseData[]=[];
  viewdetails:ViewData[]=VIEWCOURSE;
  selectedCourse: CourseData | null = null;
  selectedViewDetails: ViewData | null = null;
  isCPopupOpen = false;
  isJPopupOpen=false;
  isCheckoutPopupOpen=false;
  cartItems: { title: string; category: string; discount: number; price: number }[] = [];
  searchText: string = '';
  fullName: string = '';
  testimonials:TesttimonialData[]=VIEWTESTIMONIAL;

  student=new FormGroup({
      firstname:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
      lastname:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
      email:new FormControl("",[Validators.required,Validators.email]),
      phoneno:new FormControl("",[Validators.required,Validators.pattern("^[0-9]{10}$")]),
      address:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
      education:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(50)]),
      selectedcourse:new FormControl("",[Validators.required]) 
    });

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.getCourses(); // Call the function to fetch courses when the component initializes
    this.startTestimonialLoop();
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
    this.isCPopupOpen = false; //Close the popup
    this.isJPopupOpen=false;
    this.isCheckoutPopupOpen=false;
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

 
  GetDetails(){
    const formData = this.student.value;
    this.http.post("http://localhost:8080/api/student", formData).subscribe({
      next: (response) => {
        console.log("Query submitted:", response);
        alert("Details sent successfully!");
        this.student.reset();
        this.isJPopupOpen=false;         
      },
      error: (error) => {
        console.error("Error submitting details:", error);
        alert("Failed to send message. Please try again.");
      }
    })
  }

  addToCart(): void {
    this.isCPopupOpen = false;
    if (!this.selectedCourse) return;
    if (this.selectedCourse) {
        // Check if the course is already in the cart
        const existingItem = this.cartItems.find(item => item.title === this.selectedCourse!.title);
        
        if (!existingItem) {
            const discount = this.selectedCourse.price * 0.1; // 10% discount
            this.cartItems.push({
                title: this.selectedCourse.title,
                category: this.selectedCourse.category,
                discount: discount,
                price: this.selectedCourse.price
            });
        }
    }
  }


  getSubtotal(): number {
    //reduce()-array method that processes elements in the array and reduces them to a single value.
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  getTotalDiscount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.discount, 0);
  }

  getTotalPrice(): number {
    return this.getSubtotal() - this.getTotalDiscount();
  }

  removeCourse(Title:String):void{
    const index = this.cartItems.findIndex(course => course.title === Title);
    if(index!==-1){
      this.cartItems.splice(index,1);
      alert("Course:"+Title+"Removed from cart!!");
    }
  }

  Payment() {
    if (!this.fullName) {
      alert('Please enter your full name before proceeding.');
      return;
    }
  
    let totalAmount = this.getTotalPrice();
    totalAmount = totalAmount * 100;
      
    const paymentData = {
      courseName: this.fullName,
      price: totalAmount
    };
  
    this.http.post('http://localhost:8080/api/checkout', paymentData, { responseType: 'text' }).subscribe((response: string) => {
      // Redirect to Stripe checkout URL
      window.location.href = response;
    }, error => {
      console.error('Error occurred during payment:', error);
    });
  }
  

  findCourse(): void {
    //trim used to remove white space
    if (this.searchText.trim()==='') {
         this.getCourses();
    } 
    else {
        this.courses = this.courses.filter(course =>
           course.title.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }
  }
  
  startTestimonialLoop() {
    setInterval(() => {
      if (this.testimonials.length > 0) {
        let first = this.testimonials.shift(); 
        if (first) {  // Ensure `first` is not undefined
          this.testimonials.push(first);
        }
      }
    }, 6000); // Adjust timing based on animation speed
  }
  
  

}
