import mongoose from 'mongoose';

const userInfo = new mongoose.Schema({
  character_id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  health: {
    type: Number,
    default: 500,
  },
  power: {
    type: Number,
    default: 500,
  },
});

export default mongoose.model('user', userInfo);
