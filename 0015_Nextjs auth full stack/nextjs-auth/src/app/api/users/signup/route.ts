import {connect} from "@/dbConfig/dbConfig";

import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";



connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log("Request Body:", reqBody);

        // Check if the user already exists
        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username, 
            email,
            password: hashedPassword
        })

        const savedUSer = await newUser.save();
        console.log("Saved User:", savedUSer);

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUSer
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }    
}    