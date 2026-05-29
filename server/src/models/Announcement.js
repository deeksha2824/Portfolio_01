import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    audience: { type: String, enum: ['All', 'Staff', 'Students'], default: 'All' },
    priority: { type: String, enum: ['Normal', 'Important', 'Urgent'], default: 'Normal' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Announcement = mongoose.model('Announcement', announcementSchema);
