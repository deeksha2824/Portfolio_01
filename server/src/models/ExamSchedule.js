import mongoose from 'mongoose';

const examScheduleSchema = new mongoose.Schema(
  {
    className: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    examName: { type: String, required: true },
    examDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    maxMarks: { type: Number, default: 100 },
    room: { type: String, default: '' }
  },
  { timestamps: true }
);

export const ExamSchedule = mongoose.model('ExamSchedule', examScheduleSchema);
