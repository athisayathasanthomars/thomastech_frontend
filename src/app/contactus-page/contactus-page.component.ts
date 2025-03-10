import { Component } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactus-page',
  imports: [ReactiveFormsModule],
  templateUrl: './contactus-page.component.html',
  styleUrl: './contactus-page.component.scss'
})
export class ContactusPageComponent {
  customer=new FormGroup({
    firstname:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
    lastname:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(50)]),
    email:new FormControl("",[Validators.required,Validators.email]),
    phoneno:new FormControl("",[Validators.required,Validators.pattern("^[0-9]{10}$")]),
    message:new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(100)])

  });
  
  constructor(private http: HttpClient) {}

  GetDetails(){
    const formData = this.customer.value;
    this.http.post("http://localhost:8080/api/customerquery", formData).subscribe({
      next: (response) => {
        console.log("Query submitted:", response);
        alert("Your message has been sent successfully!");
        this.customer.reset();// Clear form after submission
      },
      error: (error) => {
        console.error("Error submitting query:", error);
        alert("Failed to send message. Please try again.");
      }
    })
  }
}
