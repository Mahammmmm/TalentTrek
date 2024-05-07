const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    counselor: {
      type: mongoose.Types.ObjectId,
      ref: "Counsellors",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    }
  },
  { collection:"Booking" }
);

mongoose.model("Booking", bookingSchema);