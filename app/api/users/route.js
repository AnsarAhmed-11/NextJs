import { NextResponse } from "next/server";

export async function POST(request) {

    const data = await request.json()
    const { name, email, password } = data;
    return NextResponse.json({
        message: "user registered successfully",
        status: true,
        name, email, password
    })
}
export async function GET(request) {
const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 20,
    grade: "A",
    city: "Delhi",
    email: "aarav.sharma@example.com",
    last_update: "2026-09-15 10:30:00"
  },
  {
    id: 2,
    name: "Priya Singh",
    age: 19,
    grade: "B+",
    city: "Mumbai",
    email: "priya.singh@example.com",
    last_update: "2026-09-14 14:20:00"
  },
  {
    id: 3,
    name: "Rohan Verma",
    age: 21,
    grade: "A+",
    city: "Bangalore",
    email: "rohan.verma@example.com",
    last_update: "2026-09-13 09:45:00"
  },
  {
    id: 4,
    name: "Ananya Gupta",
    age: 20,
    grade: "A",
    city: "Pune",
    email: "ananya.gupta@example.com",
    last_update: "2026-09-12 16:10:00"
  },
  {
    id: 5,
    name: "Vikram Patel",
    age: 22,
    grade: "B",
    city: "Ahmedabad",
    email: "vikram.patel@example.com",
    last_update: "2026-09-11 11:25:00"
  },
  {
    id: 6,
    name: "Neha Joshi",
    age: 19,
    grade: "A+",
    city: "Jaipur",
    email: "neha.joshi@example.com",
    last_update: "2026-09-10 13:40:00"
  },
  {
    id: 7,
    name: "Arjun Mehta",
    age: 21,
    grade: "B+",
    city: "Chandigarh",
    email: "arjun.mehta@example.com",
    last_update: "2026-09-09 15:30:00"
  },
  {
    id: 8,
    name: "Sneha Kapoor",
    age: 20,
    grade: "A",
    city: "Delhi",
    email: "sneha.kapoor@example.com",
    last_update: "2026-09-08 10:15:00"
  },
  {
    id: 9,
    name: "Karan Malhotra",
    age: 22,
    grade: "B",
    city: "Noida",
    email: "karan.malhotra@example.com",
    last_update: "2026-09-07 17:05:00"
  },
  {
    id: 10,
    name: "Ishita Rao",
    age: 19,
    grade: "A+",
    city: "Hyderabad",
    email: "ishita.rao@example.com",
    last_update: "2026-09-06 12:30:00"
  },
  {
    id: 11,
    name: "Aditya Kumar",
    age: 21,
    grade: "A",
    city: "Patna",
    email: "aditya.kumar@example.com",
    last_update: "2026-09-05 09:20:00"
  },
  {
    id: 12,
    name: "Meera Nair",
    age: 20,
    grade: "B+",
    city: "Kochi",
    email: "meera.nair@example.com",
    last_update: "2026-09-04 14:45:00"
  },
  {
    id: 13,
    name: "Rahul Das",
    age: 22,
    grade: "B",
    city: "Kolkata",
    email: "rahul.das@example.com",
    last_update: "2026-09-03 11:10:00"
  },
  {
    id: 14,
    name: "Kavya Iyer",
    age: 19,
    grade: "A",
    city: "Chennai",
    email: "kavya.iyer@example.com",
    last_update: "2026-09-02 16:35:00"
  },
  {
    id: 15,
    name: "Siddharth Jain",
    age: 21,
    grade: "A+",
    city: "Indore",
    email: "siddharth.jain@example.com",
    last_update: "2026-09-01 10:50:00"
  },
  {
    id: 16,
    name: "Pooja Mishra",
    age: 20,
    grade: "B+",
    city: "Lucknow",
    email: "pooja.mishra@example.com",
    last_update: "2026-08-31 13:15:00"
  },
  {
    id: 17,
    name: "Yash Thakur",
    age: 22,
    grade: "A",
    city: "Shimla",
    email: "yash.thakur@example.com",
    last_update: "2026-08-30 15:40:00"
  },
  {
    id: 18,
    name: "Simran Kaur",
    age: 19,
    grade: "B",
    city: "Amritsar",
    email: "simran.kaur@example.com",
    last_update: "2026-08-29 09:55:00"
  },
  {
    id: 19,
    name: "Manish Yadav",
    age: 21,
    grade: "A+",
    city: "Gurgaon",
    email: "manish.yadav@example.com",
    last_update: "2026-08-28 12:20:00"
  },
  {
    id: 20,
    name: "Tanya Saxena",
    age: 20,
    grade: "A",
    city: "Kanpur",
    email: "tanya.saxena@example.com",
    last_update: "2026-08-27 17:30:00"
  }
];


    return NextResponse.json({
        message: "Data Fetched",
        students
    })
}
