import mongoose from 'mongoose';

const classUpdateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    className: { type: String, required: true },
    message: { type: String, required: true },
    eventDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
  },
  { timestamps: true }
);

export const ClassUpdate = mongoose.model('ClassUpdate', classUpdateSchema);
