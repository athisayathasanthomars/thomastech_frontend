export interface CourseData {
    courseid: number;
    title: string;
    description: string;
    category: string;
    price: number;
    duration: string;
    image:string;
    status: string;
}

export interface ViewData{
    id:number;
    prerequisites:string[];
    content:string[];
    note:string;
}

export interface TesttimonialData {
  testimonialid: number;
  name: string;
  description: string;
}

export const VIEWCOURSE: ViewData[] = [
    {
      id:1,
      prerequisites:[
        'Basic knowledge of programming (preferably in C, C++, or Python).',
        'Working laptop more the 4GB of RAM.',
        'Understanding of OOP concepts is a plus.'
      ],
      content:[
        'Month 1: Java Fundamentals & Object-Oriented Programming (OOP)',
        'Month 2: Advanced Java Concepts & Exception Handling',
        'Month 3: Java for Back-End Development',
        'Month 4: Spring Boot for Java Back-End',
        'Month 5: Advanced Java Back-End Concepts',
        'Month 6: Final Project & Career Preparation',
      ],
      note:'Classes starts from 13-05-2025.Join the trail class on 12-05-2024 through WhatsApp group.'
    },
    {
      id:2,
      prerequisites:[
        'Knowledge of JS is plus'
      ],
      content:[
        'Month 1:',
        'Month 2:',
        'Month 3:',
        'Month 4:',
        'Month 5:',
        'Month 6:',
      ],
      note:"Still not started."
    },
];

export const VIEWTESTIMONIAL:TesttimonialData[] =[
  {
    testimonialid:1,
    name:"Arun Raj",
    description:"This course helped me build a strong foundation in Java. The step-by-step approach and hands-on projects made learning backend development easy. Now, I can confidently create APIs and work with databases!",
  },
  {
    testimonialid: 2,
    name: "Samantha Brown",
    description: "The Angular course was fantastic! The instructor explained complex topics clearly, and the projects helped me apply what I learned. Now, I can build dynamic web applications with ease."
  },
  {
    testimonialid: 3,
    name: "Kasun Perera",
    description: "I always struggled with databases until I took this course. It covered everything from basics to advanced queries, making database management so much easier. A great learning experience!"
  },
  {
    testimonialid: 4,
    name: "Meenakshi Ramesh",
    description: "This course was a perfect introduction to Machine Learning. The real-world examples and coding exercises helped me grasp the concepts quickly. Now, I feel confident in exploring ML further!"
  },
  {
    testimonialid: 5,
    name: "David Johnson",
    description: "Understanding version control was always a challenge for me, but this course changed that. The practical lessons helped me master Git and GitHub, which is essential for any developer."
  },
  {
    testimonialid: 6,
    name: "Sanduni Fernando",
    description: "The TensorFlow course gave me hands-on experience with deep learning models. The explanations were clear, and the coding exercises were engaging. I highly recommend this course!"
  }
];