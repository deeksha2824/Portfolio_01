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
import { Student } from '../models/Student.js';
import { Timetable } from '../models/Timetable.js';

export const studentRouter = express.Router();

studentRouter.use(protect, allowRoles('student', 'admin'));

studentRouter.get('/dashboard', async (req, res) => {
  const student = await Student.findOne({ user: req.user._id }).populate('user', '-password');
  if (!student) return res.status(404).json({ message: 'Student profile not found.' });

  const [attendance, results, materials, updates, announcements, timetable, exams, assignments, leaveRequests] = await Promise.all([
    Attendance.find({ student: student._id }).sort({ date: -1 }).limit(30),
    Result.find({ student: student._id }).sort({ createdAt: -1 }),
    Material.find({ className: student.className }).sort({ createdAt: -1 }),
    ClassUpdate.find({ className: student.className }).sort({ eventDate: 1, createdAt: -1 }),
    Announcement.find({ audience: { $in: ['All', 'Students'] } }).sort({ createdAt: -1 }),
    Timetable.find({ className: student.className, section: student.section }).sort({ day: 1, startTime: 1 }),
    ExamSchedule.find({ className: student.className, section: student.section }).sort({ examDate: 1, startTime: 1 }),
    Assignment.find({ className: student.className, section: student.section }).sort({ dueDate: 1 }),
    LeaveRequest.find({ student: student._id }).sort({ createdAt: -1 })
  ]);

  res.json({ student, attendance, results, materials, updates, announcements, timetable, exams, assignments, leaveRequests });
});

studentRouter.post('/leave-requests', async (req, res) => {
  const student = await Student.findOne({ user: req.user._id });
  if (!student) return res.status(404).json({ message: 'Student profile not found.' });

  const request = await LeaveRequest.create({ ...req.body, student: student._id });
  res.status(201).json(request);
});
