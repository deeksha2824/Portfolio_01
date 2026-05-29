import express from 'express';
import { allowRoles, protect } from '../middleware/auth.js';
import { Attendance } from '../models/Attendance.js';
import { Announcement } from '../models/Announcement.js';
import { Assignment } from '../models/Assignment.js';
import { ClassUpdate } from '../models/ClassUpdate.js';
import { ExamSchedule } from '../models/ExamSchedule.js';
import { LeaveRequest } from '../models/LeaveRequest.js';
import { Material } from '../models/Material.js';
import { Result } from '../models/Result.js';
import { Staff } from '../models/Staff.js';
import { Student } from '../models/Student.js';
import { Timetable } from '../models/Timetable.js';

export const staffRouter = express.Router();

staffRouter.use(protect, allowRoles('staff', 'admin'));

staffRouter.get('/students', async (req, res) => {
  const students = await Student.find().populate('user', '-password').sort({ className: 1, rollNumber: 1 });
  res.json(students);
});

staffRouter.post('/attendance', async (req, res) => {
  const { student, date, status, remarks } = req.body;
  const attendance = await Attendance.findOneAndUpdate(
    { student, date: new Date(date) },
    { student, date, status, remarks },
    { upsert: true, new: true, runValidators: true }
  ).populate({ path: 'student', populate: { path: 'user', select: '-password' } });

  res.status(201).json(attendance);
});

staffRouter.get('/attendance', async (req, res) => {
  const attendance = await Attendance.find().populate({ path: 'student', populate: { path: 'user', select: '-password' } }).sort({ date: -1 });
  res.json(attendance);
});

staffRouter.post('/results', async (req, res) => {
  const staff = await Staff.findOne({ user: req.user._id });
  const result = await Result.create({ ...req.body, teacher: staff?._id });
  res.status(201).json(await result.populate({ path: 'student', populate: { path: 'user', select: '-password' } }));
});

staffRouter.get('/results', async (req, res) => {
  const results = await Result.find().populate({ path: 'student', populate: { path: 'user', select: '-password' } }).sort({ createdAt: -1 });
  res.json(results);
});

staffRouter.post('/materials', async (req, res) => {
  const staff = await Staff.findOne({ user: req.user._id });
  const material = await Material.create({ ...req.body, uploadedBy: staff?._id });
  res.status(201).json(material);
});

staffRouter.get('/materials', async (req, res) => {
  const materials = await Material.find().sort({ createdAt: -1 });
  res.json(materials);
});

staffRouter.delete('/materials/:id', async (req, res) => {
  await Material.findByIdAndDelete(req.params.id);
  res.json({ message: 'Material deleted.' });
});

staffRouter.post('/updates', async (req, res) => {
  const staff = await Staff.findOne({ user: req.user._id });
  const update = await ClassUpdate.create({ ...req.body, createdBy: staff?._id });
  res.status(201).json(update);
});

staffRouter.get('/updates', async (req, res) => {
  const updates = await ClassUpdate.find().sort({ eventDate: 1, createdAt: -1 });
  res.json(updates);
});

staffRouter.delete('/updates/:id', async (req, res) => {
  await ClassUpdate.findByIdAndDelete(req.params.id);
  res.json({ message: 'Update deleted.' });
});

staffRouter.post('/announcements', async (req, res) => {
  const announcement = await Announcement.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(announcement);
});

staffRouter.get('/announcements', async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 });
  res.json(announcements);
});

staffRouter.delete('/announcements/:id', async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: 'Announcement deleted.' });
});

staffRouter.post('/timetable', async (req, res) => {
  const timetable = await Timetable.create(req.body);
  res.status(201).json(timetable);
});

staffRouter.get('/timetable', async (req, res) => {
  const rows = await Timetable.find().sort({ className: 1, section: 1, day: 1, startTime: 1 });
  res.json(rows);
});

staffRouter.delete('/timetable/:id', async (req, res) => {
  await Timetable.findByIdAndDelete(req.params.id);
  res.json({ message: 'Timetable entry deleted.' });
});

staffRouter.post('/exams', async (req, res) => {
  const exam = await ExamSchedule.create(req.body);
  res.status(201).json(exam);
});

staffRouter.get('/exams', async (req, res) => {
  const exams = await ExamSchedule.find().sort({ examDate: 1, startTime: 1 });
  res.json(exams);
});

staffRouter.delete('/exams/:id', async (req, res) => {
  await ExamSchedule.findByIdAndDelete(req.params.id);
  res.json({ message: 'Exam deleted.' });
});

staffRouter.post('/assignments', async (req, res) => {
  const staff = await Staff.findOne({ user: req.user._id });
  const assignment = await Assignment.create({ ...req.body, createdBy: staff?._id });
  res.status(201).json(assignment);
});

staffRouter.get('/assignments', async (req, res) => {
  const assignments = await Assignment.find().sort({ dueDate: 1, createdAt: -1 });
  res.json(assignments);
});

staffRouter.delete('/assignments/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Assignment deleted.' });
});

staffRouter.get('/leave-requests', async (req, res) => {
  const requests = await LeaveRequest.find().populate({ path: 'student', populate: { path: 'user', select: '-password' } }).sort({ createdAt: -1 });
  res.json(requests);
});

staffRouter.patch('/leave-requests/:id', async (req, res) => {
  const request = await LeaveRequest.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, responseNote: req.body.responseNote || '', reviewedBy: req.user._id },
    { new: true, runValidators: true }
  ).populate({ path: 'student', populate: { path: 'user', select: '-password' } });
  if (!request) return res.status(404).json({ message: 'Leave request not found.' });
  res.json(request);
});
