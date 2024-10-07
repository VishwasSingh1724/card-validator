
import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    SimNumber: {
        type: Number,
        unique:true,
        required: true,
        min: 4
    },
    phoneNumber: {
        type: Number,
        required: true,
        min: 6
    },
    ActivationStatus: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true,
    },
    ActivationDate: {
        type: Date,
    },
}, {timestamps: true})

export default mongoose?.models?.CardSchema || mongoose.model("CardSchema", CardSchema)