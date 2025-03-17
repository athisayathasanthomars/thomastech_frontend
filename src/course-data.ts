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
    }
];