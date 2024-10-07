import cardSchema from "@/app/lib/card.schema"
import { DbConnect } from "@/app/lib/connection"
import { NextResponse } from "next/server"

export async function POST(req:Request){
  DbConnect()
   const {simNumber}= await req.json()
   const Card= await cardSchema.findOne({SimNumber:simNumber})
   Card.ActivationStatus="Active"
   Card.ActivationDate=Date.now()
   await Card.save()
   console.log(Card)
   return NextResponse.json(Card)


}