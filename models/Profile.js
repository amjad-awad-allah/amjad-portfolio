
import mongoose from 'mongoose';

// Define social media schema
const socialSchema = new mongoose.Schema({
  platform: String,
  url: String
});

// Define hobby schema
const hobbySchema = new mongoose.Schema({
  name: {
    en: String,
    de: String
  },
  icon: String
});

// Define project schema
const projectSchema = new mongoose.Schema({
  workExperienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkExperience'
  },
  name: String,
  description: {
    en: String,
    de: String
  },
  technologies: [String],
  links: {
    liveLink: String,
    githubLink: String
  }
});

// Define work experience schema
const workExperienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  company: String,
  position: {
    en: String,
    de: String
  },
  location: String,
  startDate: Date,
  endDate: Date,
  description: {
    en: String,
    de: String
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
});

// Define education schema
const educationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  degree: {
    en: String,
    de: String
  },
  institution: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: {
    en: String,
    de: String
  }
});

// Define skill item schema
const skillItemSchema = new mongoose.Schema({
  name: {
    en: String,
    de: String
  },
  level: String
});

// Define skill category schema
const skillCategorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    en: String,
    de: String
  },
  skills: [skillItemSchema]
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    en: String,
    de: String
  },
  title: [{
    en: String,
    de: String
  }],
  email: String,
  phone: String,
  location: String,
  bio: {
    en: String,
    de: String
  },
  photo: String,
  socials: [socialSchema],
  hobbies: [hobbySchema]
}, { 
  timestamps: true 
});

// Create and export the models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Education = mongoose.models.Education || mongoose.model('Education', educationSchema);
const WorkExperience = mongoose.models.WorkExperience || mongoose.model('WorkExperience', workExperienceSchema);
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', skillCategorySchema);

// Export all models
export { User, Education, WorkExperience, Project, Skill };
