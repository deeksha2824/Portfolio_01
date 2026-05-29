import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    subject: { type: String, required: true },
    qualification: { type: String, default: '' },
    joiningDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'On Leave', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

export const Staff = mongoose.model('Staff', staffSchema);
