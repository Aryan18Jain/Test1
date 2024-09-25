import connection from "@/lib/db.js"
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        const {email} = await req.json()
        const query = 'select * from userinfo where email = ?'
        const variable = [email]
        const [results] = await connection.query(query,variable)
        if(results.length == 0){
            return NextResponse.json({message:"User Not Exist"},{status:499})
        }
        else{
            return NextResponse.json({message:"You can't register with same id"},{status:201})
        }
    } catch (error) {
        return NextResponse.json({message:"SQL error"},{status:501})
    }
}