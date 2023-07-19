const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: false,
        },
        doctorId: {
            type: String,
            required: false,
        },
        doctorInfo: {
            type: String,
            required: false,
        },
        userInfo: {
            type: String,
            required: false,
        },
        date: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "pending",
        },
        time: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;