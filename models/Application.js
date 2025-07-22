

const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  filename: String,
  fileId: String,
}, { _id: false });

const profileDocSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
}, { _id: false });

const userProfileSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: null,
  },
  dob: {
    type: Date,
    default: null,
  },
  profileDocs: [profileDocSchema],
}, { _id: false });

const applicationSchema = new mongoose.Schema({
  // 👤 User who submitted the application
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 👨‍💼 Operator assigned (optional)
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  // 🛠️ Selected Service
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },

  // 📝 Basic submitted data (optional future use)
  data: {
    type: Object,
    default: {},
  },

  // 📎 Uploaded additional documents
  documents: [documentSchema],

  // 📋 User profile snapshot at submission
  userProfile: userProfileSchema,

  // 🔄 Status of application
  status: {
    type: String,
    enum: [
      "Pending",
      "Submitted",
      "In Review",
      "Pending Confirmation",
      "Confirmed",
      "Rejected",
      "Completed",
    ],
    default: "Submitted",
  },

  // 📄 Operator uploaded form PDF
  // formPdfPath: {
  //   type: String,
  //   default: "",
  // },

  // // 🧾 Final certificate uploaded by admin
  // certificateUrl: {
  //   type: String,
  //   default: "",
  // },
  formPdf: {
  filename: String,
  fileId: mongoose.Schema.Types.ObjectId,
},
certificate: {
  filename: String,
  fileId: mongoose.Schema.Types.ObjectId,
},


  // ❌ Operator rejection reason
  rejectReason: {
    type: String,
    default: "",
  },

  // 🔁 User correction feedback
  correctionComment: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
