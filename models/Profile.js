
import mongoose from 'mongoose';

// Define project links schema
const projectLinksSchema = new mongoose.Schema({
  liveLink: String,
  githubLink: String,
  downloadLink: String
});

// Define project schema
const projectSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  details: String,
  longDescription: String,
  role: String,
  technologies: [String],
  achievements: [String],
  images: [String],
  links: projectLinksSchema
});

// Define work project schema (simplified version)
const workProjectSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  details: String,
  technologies: [String],
  links: projectLinksSchema
});

// Define work experience schema
const workExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
  responsibilities: [String],
  projects: [workProjectSchema]
});

// Define education schema
const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
  achievements: [String]
});

// Define certification schema
const certificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  date: Date,
  expires: Date,
  url: String
});

// Define publication schema
const publicationSchema = new mongoose.Schema({
  title: String,
  publisher: String,
  date: Date,
  url: String
});

// Define language schema
const languageSchema = new mongoose.Schema({
  language: String,
  proficiency: String,
  level: Number,
  details: String
});

// Define reference schema
const referenceSchema = new mongoose.Schema({
  name: String,
  position: String,
  company: String,
  email: String,
  phone: String,
  relationship: String
});

// Define social media schema
const socialSchema = new mongoose.Schema({
  platform: String,
  url: String
});

// Define skill item schema
const skillItemSchema = new mongoose.Schema({
  name: String,
  level: Number
});

// Define skill category schema
const skillCategorySchema = new mongoose.Schema({
  category: String,
  items: [skillItemSchema]
});

// Define complete profile schema
const profileSchema = new mongoose.Schema({
  personalInfo: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    bio: String,
    photo: String,
    socials: [socialSchema]
  },
  education: [educationSchema],
  workExperience: [workExperienceSchema],
  skills: {
    technical: [skillCategorySchema],
    languages: [languageSchema],
    softSkills: [String]
  },
  projects: {
    featured: [projectSchema]
  },
  certifications: [certificationSchema],
  publications: [publicationSchema],
  languages: [languageSchema],
  interests: [String],
  references: [referenceSchema],
  meta: {
    lastUpdated: Date,
    version: String
  }
}, { 
  timestamps: true 
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;
