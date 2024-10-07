import mongoose from "mongoose";

export async function DbConnect(){
      try {
        
      const connection = mongoose.connect(process.env.DATABASE_URI!)
  
      console.log("mongoDb connected")

      } catch (error) {
         console.log(error);
         
      }

}