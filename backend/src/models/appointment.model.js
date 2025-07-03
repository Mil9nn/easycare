import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  primaryPhysician: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  cancellationReason: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'cancelled'],
    default: 'pending',
  }
}, {
  timestamps: true,
});

export default mongoose.model('Appointment', AppointmentSchema);
