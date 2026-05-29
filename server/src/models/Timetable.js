import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema(
  {
    className: { type: String, required: true },
    section: { type: String, required: true },
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: String, required: true },
    teacherName: { type: String, required: true },
    room: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Timetable = mongoose.model('Timetable', timetableSchema);
