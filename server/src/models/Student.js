import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema(
  {
    total: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    dueDate: { type: Date },
    status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' }
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rollNumber: { type: String, required: true, unique: true },
    className: { type: String, required: true },
    section: { type: String, required: true },
    parentName: { type: String, required: true },
    parentPhone: { type: String, required: true },
    address: { type: String, default: '' },
    dateOfBirth: { type: Date },
    fee: { type: feeSchema, default: () => ({}) },
    status: { type: String, enum: ['Active', 'Transferred', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
