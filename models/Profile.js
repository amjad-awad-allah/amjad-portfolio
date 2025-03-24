import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
    },
  ],
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;