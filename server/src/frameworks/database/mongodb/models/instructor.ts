import mongoose, { Schema, model } from 'mongoose';

import { Certificate } from '../../../../types/instructor/instructorInterface';

const instructorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
  },
  profilePic: {
    type: String,
    required: true,
  },
  certificates:{
    type:Array<Certificate>,
    required:true

  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
  },
  qualification: {
    type: String,
    required: true,
  },
  subjects: {
    type: Array<string>,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  coursesCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Courses',
    },
  ],
  rejected: { type: Boolean, default: false },
  rejectedReason: { type: String, default: '' },
  isBlocked: { type: Boolean, default: false },
  blockedReason: { type: String, default: '' },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

const Instructor = model('Instructors', instructorSchema, 'instructor');

export default Instructor;
