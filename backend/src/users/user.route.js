const express = require('express')
const User = require('../users/user.model'); 

const router = express.Router()
const generateToken = require('../middleware/generateToken')




router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = new User({ username, email, password })
    await user.save()
    res.status(201).json({
      message: 'User created successfully'
    })
  } catch (error) {
    res.status(400).json({
      error: 'An error occurred while creating the user'
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid password'
      })
    }

    const token = await generateToken(user._id)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    res.status(200).json({
      message: 'User logged in successfully',token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession
      }
    })
  } catch (error) {
    res.status(400).json({
      error: 'An error occurred while logging in'
    })
  }
})


router.post('/logout', (req, res) => {
  res.clearCookie('token'); 
  res.status(200).send({ message: 'Logged out successfully' });
});


router.get('/users', async (req, res) => {
  try {
      const users = await User.find({}, 'id email role').sort({ createdAt: -1 });
      res.status(200).send(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send({ message: 'Failed to fetch users' });
  }
});


router.delete('/users/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send({ message: 'Failed to delete user' });
  }
})

router.put('/users/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { role } = req.body;
      const user = await User.findByIdAndUpdate(id, { role }, { new: true });
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'User role updated successfully', user });
  } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).send({ message: 'Failed to update user role' });
  }
});

router.patch('/edit-profile', async (req, res) => {
  try {
      const { userId, username, profileImage, bio, profession } = req.body;

      if (!userId) {
          return res.status(400).send({ message: 'User ID is required' });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send({ message: 'User not found' });
      }

      if (username !== undefined) user.username = username;
      if (profileImage !== undefined) user.profileImage = profileImage;
      if (bio !== undefined) user.bio = bio;
      if (profession !== undefined) user.profession = profession;

      await user.save();

      res.status(200).send({
          message: 'Profile updated successfully',
          user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              profileImage: user.profileImage,
              bio: user.bio,
              profession: user.profession,
              role: user.role,
          }
      });
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send({ message: 'Profile update failed' });
  }
});




module.exports = router

