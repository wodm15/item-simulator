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
  },
  health: {
    type: Number,
  },
  power: {
    type: Number,
  },
});

export default mongoose.model('user', userInfo);
