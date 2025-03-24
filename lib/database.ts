
import mongoose from 'mongoose';
import { User, Education, WorkExperience, Project, Skill } from '../models/Profile';

// Connect to MongoDB
const connectDB = async () => {
  try {
    const dbUri = import.meta.env.VITE_MONGODB_URI;
    if (!dbUri) {
      throw new Error('VITE_MONGODB_URI is not defined in .env file');
    }

    await mongoose.connect(dbUri);
    console.log('MongoDB Connected');
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
};

// Get user data
const getUserData = async (userId?: string) => {
  try {
    await connectDB();
    const user = await User.findOne(userId ? { _id: userId } : {});
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// Get education data
const getEducationData = async (userId?: string) => {
  try {
    await connectDB();
    const education = await Education.find(userId ? { userId } : {});
    return education;
  } catch (error) {
    console.error('Error fetching education data:', error);
    return [];
  }
};

// Get work experience data
const getWorkExperienceData = async (userId?: string) => {
  try {
    await connectDB();
    const workExperience = await WorkExperience.find(userId ? { userId } : {})
      .populate('projects');
    return workExperience;
  } catch (error) {
    console.error('Error fetching work experience data:', error);
    return [];
  }
};

// Get projects data
const getProjectsData = async (workExperienceId?: string) => {
  try {
    await connectDB();
    const projects = await Project.find(workExperienceId ? { workExperienceId } : {});
    return projects;
  } catch (error) {
    console.error('Error fetching projects data:', error);
    return [];
  }
};

// Get skills data
const getSkillsData = async (userId?: string) => {
  try {
    await connectDB();
    const skills = await Skill.find(userId ? { userId } : {});
    return skills;
  } catch (error) {
    console.error('Error fetching skills data:', error);
    return [];
  }
};

// Get all profile data
const getFullProfileData = async (userId?: string) => {
  try {
    await connectDB();
    
    const user = await getUserData(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const education = await getEducationData(user._id);
    const workExperience = await getWorkExperienceData(user._id);
    const skills = await getSkillsData(user._id);
    
    return {
      user,
      education,
      workExperience,
      skills
    };
  } catch (error) {
    console.error('Error fetching full profile data:', error);
    return null;
  }
};

export {
  connectDB,
  getUserData,
  getEducationData,
  getWorkExperienceData,
  getProjectsData,
  getSkillsData,
  getFullProfileData
};
