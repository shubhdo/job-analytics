const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],  // Array of strings for multiple skills
      required: true,
      validate: {
        validator: function(value) {
          // Ensure there is at least one skill
          return value.length > 0;
        },
        message: 'Skills cannot be empty.',
      },
    },
  }, { timestamps: true });  // Timestamps for createdAt and updatedAt
  

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
