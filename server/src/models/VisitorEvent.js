import mongoose from 'mongoose';

const visitorEventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      enum: ['visit', 'resume_download'],
      required: true
    },
    visitorId: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    country: {
      type: String,
      default: 'Unknown'
    },
    device: {
      type: String,
      enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
      default: 'Unknown'
    },
    path: {
      type: String,
      default: '/'
    },
    ipAddress: {
      type: String,
      default: ''
    },
    userAgent: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export const VisitorEvent = mongoose.model('VisitorEvent', visitorEventSchema);
