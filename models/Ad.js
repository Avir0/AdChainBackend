

// import mongoose from 'mongoose';

// const categoryEnum = ['Fashion', 'Fitness', 'Travel', 'Tech', 'Food'];

// const adSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   budget: { type: Number, required: true, min: 0 },
//   category: { type: String, enum: categoryEnum, required: true },
//   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
//   acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   createdAt: { type: Date, default: Date.now },
//   proof: {
//     link: { type: String }, // URL to the posted content
//     description: { type: String }, // Description of the proof
//     submittedAt: { type: Date }, // Date of submission
//   },
// });

// const Ad = mongoose.model('Ad', adSchema);

// export default Ad;

import mongoose from 'mongoose';

const categoryEnum = ['Fashion', 'Fitness', 'Travel', 'Tech', 'Food', 'Education', 'Finance'];

const adSchema = new mongoose.Schema({
  // ===== Existing fields =====
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true, min: 0 },
  category: { type: String, enum: categoryEnum, required: true },

  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },

  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  createdAt: { type: Date, default: Date.now },

  proof: {
    link: { type: String },
    description: { type: String },
    submittedAt: { type: Date },
  },

  // ===== NEW PROFESSIONAL FIELDS =====

  // Campaign & Strategy
  objective: {
    type: String,
    enum: ['Brand Awareness', 'Sales', 'Website Traffic', 'App Installs', 'Leads'],
  },

  product: { type: String },     // Product name
  usp: { type: String },         // Unique selling point

  // Targeting
  audience: { type: String },    // students, gym lovers etc
  ageGroup: { type: String },    // 18-24, 25-34 etc
  location: { type: String },    // India, Mumbai, Global

  // Influencer Requirements
  platform: {
    type: String,
    enum: ['Instagram', 'YouTube', 'LinkedIn', 'Twitter'],
  },

  influencersRequired: { type: Number, default: 1 },
  minFollowers: { type: Number },

  // Deliverables
  deliverables: { type: String }, // "1 Reel + 2 Stories"
  hashtags: { type: String },     // "#adchain #viral"

});

const Ad = mongoose.model('Ad', adSchema);

export default Ad;
