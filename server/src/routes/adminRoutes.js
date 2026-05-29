import express from 'express';
import { allowRoles, protect } from '../middleware/auth.js';
import { Attendance } from '../models/Attendance.js';
import { ClassUpdate } from '../models/ClassUpdate.js';
import { Material } from '../models/Material.js';
import { Result } from '../models/Result.js';
import { Staff } from '../models/Staff.js';
import { Student } from '../models/Student.js';
import { User } from '../models/User.js';

export const adminRouter = express.Router();

adminRouter.use(protect, allowRoles('admin'));

adminRouter.get('/summary', async (req, res) => {
  const [students, staff, pendingFees, materials, updates] = await Promise.all([
    Student.countDocuments(),
    Staff.countDocuments(),
    Student.countDocuments({ 'fee.status': { $ne: 'Paid' } }),
    Material.countDocuments(),
    ClassUpdate.countDocuments()
  ]);

  res.json({ students, staff, pendingFees, materials, updates });
});

adminRouter.get('/staff', async (req, res) => {
  const staff = await Staff.find().populate('user', '-password').sort({ createdAt: -1 });
  res.json(staff);
});

adminRouter.post('/staff', async (req, res) => {
  const { name, email, phone, employeeId, department, subject, qualification, status } = req.body;
  const user = await User.create({ name, email, phone, password: 'password123', role: 'staff', avatarColor: '#0f766e' });
  const staff = await Staff.create({ user: user._id, employeeId, department, subject, qualification, status });
  res.status(201).json(await staff.populate('user', '-password'));
});

adminRouter.put('/staff/:id', async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) return res.status(404).json({ message: 'Staff member not found.' });

  const { name, email, phone, employeeId, department, subject, qualification, status } = req.body;
  await User.findByIdAndUpdate(staff.user, { name, email, phone }, { runValidators: true });
  await Staff.findByIdAndUpdate(staff._id, { employeeId, department, subject, qualification, status }, { runValidators: true });

  res.json(await Staff.findById(staff._id).populate('user', '-password'));
});

adminRouter.delete('/staff/:id', async (req, res) => {
  const staff = await Staff.findById(req.params.id);
  if (!staff) return res.status(404).json({ message: 'Staff member not found.' });

  await User.findByIdAndDelete(staff.user);
  await staff.deleteOne();
  res.json({ message: 'Staff member deleted.' });
});

adminRouter.get('/students', async (req, res) => {
  const students = await Student.find().populate('user', '-password').sort({ createdAt: -1 });
  res.json(students);
});

adminRouter.post('/students', async (req, res) => {
  const { name, email, phone, rollNumber, className, section, parentName, parentPhone, address, dateOfBirth, fee } = req.body;
  const user = await User.create({ name, email, phone, password: 'password123', role: 'student', avatarColor: '#7c3aed' });
  const student = await Student.create({ user: user._id, rollNumber, className, section, parentName, parentPhone, address, dateOfBirth, fee });
  res.status(201).json(await student.populate('user', '-password'));
});

adminRouter.put('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found.' });

  const { name, email, phone, rollNumber, className, section, parentName, parentPhone, address, dateOfBirth, fee, status } = req.body;
  await User.findByIdAndUpdate(student.user, { name, email, phone }, { runValidators: true });
  await Student.findByIdAndUpdate(
    student._id,
    { rollNumber, className, section, parentName, parentPhone, address, dateOfBirth, fee, status },
    { runValidators: true }
  );

  res.json(await Student.findById(student._id).populate('user', '-password'));
});

adminRouter.patch('/students/:id/fees', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, { fee: req.body.fee }, { new: true, runValidators: true }).populate('user', '-password');
  if (!student) return res.status(404).json({ message: 'Student not found.' });
  res.json(student);
});

adminRouter.delete('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found.' });

  await Promise.all([
    Attendance.deleteMany({ student: student._id }),
    Result.deleteMany({ student: student._id }),
    User.findByIdAndDelete(student.user)
  ]);
  await student.deleteOne();
  res.json({ message: 'Student deleted.' });
});
