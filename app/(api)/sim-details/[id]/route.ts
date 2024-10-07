import cardSchema from "@/app/lib/card.schema"
import { DbConnect } from "@/app/lib/connection"
import { NextResponse } from "next/server"

export async function GET(req:Request,ctx:any){
    await DbConnect()
    const id = ctx.params.id
    console.log(id);
   const Card= await cardSchema.findOne({SimNumber:id})
   return NextResponse.json(Card)

}
