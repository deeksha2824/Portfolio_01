import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { Announcement } from './models/Announcement.js';
import { Assignment } from './models/Assignment.js';
import { Attendance } from './models/Attendance.js';
import { ClassUpdate } from './models/ClassUpdate.js';
import { ExamSchedule } from './models/ExamSchedule.js';
import { LeaveRequest } from './models/LeaveRequest.js';
import { Material } from './models/Material.js';
import { Result } from './models/Result.js';
import { Staff } from './models/Staff.js';
import { Student } from './models/Student.js';
import { Timetable } from './models/Timetable.js';
import { User } from './models/User.js';

dotenv.config();

const password = 'password123';

async function seed() {
  await connectDB();

  await Promise.all([
    Attendance.deleteMany({}),
    Announcement.deleteMany({}),
    Assignment.deleteMany({}),
    ExamSchedule.deleteMany({}),
    LeaveRequest.deleteMany({}),
    Result.deleteMany({}),
    Material.deleteMany({}),
    ClassUpdate.deleteMany({}),
    Staff.deleteMany({}),
    Student.deleteMany({}),
    User.deleteMany({}),
    Timetable.deleteMany({})
  ]);

  const admin = await User.create({
    name: 'Anika Sharma',
    email: 'admin@school.local',
    password,
    role: 'admin',
    phone: '9000000001',
    avatarColor: '#1d4ed8'
  });

  const staffUser = await User.create({
    name: 'Rahul Mehta',
    email: 'staff@school.local',
    password,
    role: 'staff',
    phone: '9000000002',
    avatarColor: '#0f766e'
  });

  const staff = await Staff.create({
    user: staffUser._id,
    employeeId: 'EMP-1001',
    department: 'Science',
    subject: 'Physics',
    qualification: 'M.Sc Physics, B.Ed'
  });

  const studentUser = await User.create({
    name: 'Kavya Nair',
    email: 'student@school.local',
    password,
    role: 'student',
    phone: '9000000003',
    avatarColor: '#7c3aed'
  });

  const student = await Student.create({
    user: studentUser._id,
    rollNumber: 'STD-0901',
    className: '10',
    section: 'A',
    parentName: 'Maya Nair',
    parentPhone: '9000000044',
    address: '12 Lake View Road, Kochi',
    dateOfBirth: new Date('2010-08-14'),
    fee: {
      total: 48000,
      paid: 30000,
      dueDate: new Date('2026-06-15'),
      status: 'Pending'
    }
  });

  const secondStudentUser = await User.create({
    name: 'Arjun Patel',
    email: 'arjun@school.local',
    password,
    role: 'student',
    phone: '9000000004',
    avatarColor: '#ea580c'
  });

  const secondStudent = await Student.create({
    user: secondStudentUser._id,
    rollNumber: 'STD-0902',
    className: '10',
    section: 'A',
    parentName: 'Neha Patel',
    parentPhone: '9000000055',
    address: '8 Hill Street, Pune',
    dateOfBirth: new Date('2010-11-02'),
    fee: {
      total: 48000,
      paid: 48000,
      dueDate: new Date('2026-06-15'),
      status: 'Paid'
    }
  });

  await Attendance.insertMany([
    { student: student._id, date: new Date('2026-05-06'), status: 'Present', remarks: 'On time' },
    { student: student._id, date: new Date('2026-05-07'), status: 'Late', remarks: 'Transport delay' },
    { student: student._id, date: new Date('2026-05-08'), status: 'Present', remarks: 'On time' },
    { student: secondStudent._id, date: new Date('2026-05-08'), status: 'Absent', remarks: 'Medical leave' }
  ]);

  await Result.insertMany([
    { student: student._id, subject: 'Physics', exam: 'Unit Test 1', marks: 86, maxMarks: 100, grade: 'A', teacher: staff._id },
    { student: student._id, subject: 'Mathematics', exam: 'Unit Test 1', marks: 91, maxMarks: 100, grade: 'A+', teacher: staff._id },
    { student: secondStudent._id, subject: 'Physics', exam: 'Unit Test 1', marks: 78, maxMarks: 100, grade: 'B+', teacher: staff._id }
  ]);

  await Material.insertMany([
    {
      title: 'Laws of Motion Revision Notes',
      subject: 'Physics',
      className: '10',
      type: 'Notes',
      url: 'https://example.com/physics-notes',
      description: 'Concise formulas and solved examples for the upcoming assessment.',
      uploadedBy: staff._id
    },
    {
      title: 'Algebra Practice Sheet',
      subject: 'Mathematics',
      className: '10',
      type: 'Assignment',
      url: 'https://example.com/algebra-practice',
      description: 'Practice questions for linear equations and quadratic expressions.',
      uploadedBy: staff._id
    }
  ]);

  await ClassUpdate.insertMany([
    {
      title: 'Science Lab Practical',
      className: '10',
      message: 'Bring lab coat and observation notebook for the optics practical.',
      eventDate: new Date('2026-05-14'),
      createdBy: staff._id
    },
    {
      title: 'Parent Teacher Meeting',
      className: '10',
      message: 'Monthly progress review will be held in the senior block.',
      eventDate: new Date('2026-05-18'),
      createdBy: staff._id
    }
  ]);

  await Announcement.insertMany([
    {
      title: 'Annual Day Practice',
      message: 'Practice sessions will begin after school from Monday in the auditorium.',
      audience: 'All',
      priority: 'Important',
      createdBy: admin._id
    },
    {
      title: 'Library Week',
      message: 'Students can borrow one additional book during library week.',
      audience: 'Students',
      priority: 'Normal',
      createdBy: admin._id
    }
  ]);

  await Timetable.insertMany([
    { className: '10', section: 'A', day: 'Monday', startTime: '09:00', endTime: '09:45', subject: 'Physics', teacherName: 'Rahul Mehta', room: 'Lab 2' },
    { className: '10', section: 'A', day: 'Monday', startTime: '09:50', endTime: '10:35', subject: 'Mathematics', teacherName: 'Priya Rao', room: 'Room 10A' },
    { className: '10', section: 'A', day: 'Tuesday', startTime: '10:40', endTime: '11:25', subject: 'English', teacherName: 'Sara Thomas', room: 'Room 10A' }
  ]);

  await ExamSchedule.insertMany([
    { className: '10', section: 'A', subject: 'Physics', examName: 'Mid Term', examDate: new Date('2026-06-05'), startTime: '09:30', endTime: '12:00', maxMarks: 100, room: 'Hall A' },
    { className: '10', section: 'A', subject: 'Mathematics', examName: 'Mid Term', examDate: new Date('2026-06-08'), startTime: '09:30', endTime: '12:00', maxMarks: 100, room: 'Hall A' }
  ]);

  await Assignment.insertMany([
    {
      className: '10',
      section: 'A',
      subject: 'Physics',
      title: 'Newton Laws Worksheet',
      description: 'Solve questions 1 to 15 and submit in class.',
      dueDate: new Date('2026-05-20'),
      createdBy: staff._id
    },
    {
      className: '10',
      section: 'A',
      subject: 'Mathematics',
      title: 'Quadratic Equations Practice',
      description: 'Complete exercise 4.2 from the textbook.',
      dueDate: new Date('2026-05-22'),
      createdBy: staff._id
    }
  ]);

  await LeaveRequest.create({
    student: student._id,
    fromDate: new Date('2026-05-23'),
    toDate: new Date('2026-05-24'),
    reason: 'Family function',
    status: 'Pending'
  });

  console.log('Seed complete');
  console.table([
    { role: 'Admin', email: admin.email, password },
    { role: 'Staff', email: staffUser.email, password },
    { role: 'Student', email: studentUser.email, password }
  ]);

  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
