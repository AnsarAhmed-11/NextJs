import { NextResponse } from "next/server";
import db from "../../config/db";
const { getUser,findByEmail} = require("../../models/user.model")
/**
 *
 * @api/users/
 * User Register
 */
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const result=await findByEmail(email)
    if(result.length>0){
      return NextResponse.json({
        err:"user already exists"
      })
    }
    return Response.json(
      {
        message: "User created successfully",
        id: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const students = await getUser()
    // const students = [
    //   { id: 1, name: "Aarav Sharma", age: 20, email: "aarav.sharma@example.com", course: "Computer Science" },
    //   { id: 2, name: "Ananya Verma", age: 21, email: "ananya.verma@example.com", course: "Information Technology" },
    //   { id: 3, name: "Rohan Gupta", age: 19, email: "rohan.gupta@example.com", course: "Mechanical Engineering" },
    //   { id: 4, name: "Priya Singh", age: 20, email: "priya.singh@example.com", course: "Business Administration" },
    //   { id: 5, name: "Arjun Kumar", age: 22, email: "arjun.kumar@example.com", course: "Computer Science" },
    //   { id: 6, name: "Ishita Patel", age: 19, email: "ishita.patel@example.com", course: "Electronics Engineering" },
    //   { id: 7, name: "Kabir Mehta", age: 21, email: "kabir.mehta@example.com", course: "Information Technology" },
    //   { id: 8, name: "Sneha Reddy", age: 20, email: "sneha.reddy@example.com", course: "Biotechnology" },
    //   { id: 9, name: "Aditya Joshi", age: 22, email: "aditya.joshi@example.com", course: "Civil Engineering" },
    //   { id: 10, name: "Neha Agarwal", age: 19, email: "neha.agarwal@example.com", course: "Computer Science" },

    //   { id: 11, name: "Vihaan Malhotra", age: 21, email: "vihaan.malhotra@example.com", course: "Mechanical Engineering" },
    //   { id: 12, name: "Meera Nair", age: 20, email: "meera.nair@example.com", course: "Business Administration" },
    //   { id: 13, name: "Rahul Yadav", age: 22, email: "rahul.yadav@example.com", course: "Information Technology" },
    //   { id: 14, name: "Kavya Iyer", age: 19, email: "kavya.iyer@example.com", course: "Computer Science" },
    //   { id: 15, name: "Devansh Shah", age: 21, email: "devansh.shah@example.com", course: "Electronics Engineering" },
    //   { id: 16, name: "Diya Kapoor", age: 20, email: "diya.kapoor@example.com", course: "Biotechnology" },
    //   { id: 17, name: "Manav Bansal", age: 22, email: "manav.bansal@example.com", course: "Civil Engineering" },
    //   { id: 18, name: "Riya Choudhary", age: 19, email: "riya.choudhary@example.com", course: "Computer Science" },
    //   { id: 19, name: "Yash Thakur", age: 21, email: "yash.thakur@example.com", course: "Information Technology" },
    //   { id: 20, name: "Simran Kaur", age: 20, email: "simran.kaur@example.com", course: "Business Administration" },

    //   { id: 21, name: "Ayush Mishra", age: 22, email: "ayush.mishra@example.com", course: "Computer Science" },
    //   { id: 22, name: "Pooja Sinha", age: 19, email: "pooja.sinha@example.com", course: "Mechanical Engineering" },
    //   { id: 23, name: "Karan Arora", age: 21, email: "karan.arora@example.com", course: "Civil Engineering" },
    //   { id: 24, name: "Nisha Jain", age: 20, email: "nisha.jain@example.com", course: "Information Technology" },
    //   { id: 25, name: "Siddharth Roy", age: 22, email: "siddharth.roy@example.com", course: "Electronics Engineering" },
    //   { id: 26, name: "Aditi Das", age: 19, email: "aditi.das@example.com", course: "Computer Science" },
    //   { id: 27, name: "Harsh Vardhan", age: 21, email: "harsh.vardhan@example.com", course: "Business Administration" },
    //   { id: 28, name: "Tanvi Desai", age: 20, email: "tanvi.desai@example.com", course: "Biotechnology" },
    //   { id: 29, name: "Mohit Saini", age: 22, email: "mohit.saini@example.com", course: "Mechanical Engineering" },
    //   { id: 30, name: "Shreya Pandey", age: 19, email: "shreya.pandey@example.com", course: "Information Technology" },

    //   { id: 31, name: "Rishabh Saxena", age: 21, email: "rishabh.saxena@example.com", course: "Computer Science" },
    //   { id: 32, name: "Muskan Khan", age: 20, email: "muskan.khan@example.com", course: "Civil Engineering" },
    //   { id: 33, name: "Nikhil Verma", age: 22, email: "nikhil.verma@example.com", course: "Electronics Engineering" },
    //   { id: 34, name: "Sakshi Tiwari", age: 19, email: "sakshi.tiwari@example.com", course: "Business Administration" },
    //   { id: 35, name: "Varun Mehra", age: 21, email: "varun.mehra@example.com", course: "Computer Science" },
    //   { id: 36, name: "Pallavi Rao", age: 20, email: "pallavi.rao@example.com", course: "Information Technology" },
    //   { id: 37, name: "Akash Dubey", age: 22, email: "akash.dubey@example.com", course: "Mechanical Engineering" },
    //   { id: 38, name: "Isha Bhatt", age: 19, email: "isha.bhatt@example.com", course: "Biotechnology" },
    //   { id: 39, name: "Rajat Mittal", age: 21, email: "rajat.mittal@example.com", course: "Civil Engineering" },
    //   { id: 40, name: "Navya Singh", age: 20, email: "navya.singh@example.com", course: "Computer Science" },

    //   { id: 41, name: "Dhruv Chawla", age: 22, email: "dhruv.chawla@example.com", course: "Information Technology" },
    //   { id: 42, name: "Alisha Roy", age: 19, email: "alisha.roy@example.com", course: "Business Administration" },
    //   { id: 43, name: "Kunal Agarwal", age: 21, email: "kunal.agarwal@example.com", course: "Electronics Engineering" },
    //   { id: 44, name: "Manya Gupta", age: 20, email: "manya.gupta@example.com", course: "Computer Science" },
    //   { id: 45, name: "Saurabh Kumar", age: 22, email: "saurabh.kumar@example.com", course: "Mechanical Engineering" },
    //   { id: 46, name: "Anushka Jain", age: 19, email: "anushka.jain@example.com", course: "Information Technology" },
    //   { id: 47, name: "Gaurav Singh", age: 21, email: "gaurav.singh@example.com", course: "Civil Engineering" },
    //   { id: 48, name: "Ritika Sharma", age: 20, email: "ritika.sharma@example.com", course: "Biotechnology" },
    //   { id: 49, name: "Vivek Patel", age: 22, email: "vivek.patel@example.com", course: "Computer Science" },
    //   { id: 50, name: "Anjali Mehta", age: 19, email: "anjali.mehta@example.com", course: "Business Administration" }
    // ];
    console.log(students);

    return NextResponse.json({
      message: "done",
      students,
    });
  } catch (err) {
    console.log("here is err", err);

    return NextResponse.json(
      {
        message: "Something went wrong",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

