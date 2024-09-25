import { NextResponse } from "next/server"
import connection from "@/lib/db.js"

export async function POST(req){
    try {
        const {name , email , password} = await req.json()
        const query = 'insert into userinfo values(?,?,?)'
        const variable = [name,email,password]
        await connection.query(query,variable)
        return NextResponse.json({message:'User Registered'},{status: 201})
    } catch (error) {
        return NextResponse.json({message:'An error was occured while registering the user.'},{status: 500})
    }
}