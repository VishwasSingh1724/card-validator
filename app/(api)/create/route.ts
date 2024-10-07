
import cardSchema from "@/app/lib/card.schema"
import { DbConnect } from "@/app/lib/connection"
import { NextResponse } from "next/server"

export async function POST(req:Request){

     const {SimNumber,phoneNumber,ActivationStatus,ActivationDate}:any =await  req.json()
     console.log(SimNumber,phoneNumber,ActivationStatus);
     
     DbConnect()
     const simCard= await cardSchema.create({SimNumber,phoneNumber,ActivationStatus,ActivationDate:Date.now()})
      
     return NextResponse.json(simCard)

}