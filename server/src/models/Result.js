import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    exam: { type: String, required: true },
    marks: { type: Number, required: true },
    maxMarks: { type: Number, default: 100 },
    grade: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
  },
  { timestamps: true }
);

export const Result = mongoose.model('Result', resultSchema);
