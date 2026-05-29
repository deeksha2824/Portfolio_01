import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    className: { type: String, required: true },
    type: { type: String, enum: ['Notes', 'Assignment', 'Video', 'Link'], default: 'Notes' },
    url: { type: String, default: '' },
    description: { type: String, default: '' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
  },
  { timestamps: true }
);

export const Material = mongoose.model('Material', materialSchema);
