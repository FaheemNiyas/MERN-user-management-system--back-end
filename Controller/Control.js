const express = require('express');
const router = express.Router();
const UserSchema = require('../Models/Users');
const mongoose = require('mongoose');



// User Creation Function
router.post('/createUser', async (req, res) => {
    try {
        const existingUser = await UserSchema.findOne({ Email: req.body.Email })

        if (existingUser) {
            return res.status(400).json("This user is alredy exist");
        }

        const postData = await new UserSchema({
            Name: req.body.Name,
            Email: req.body.Email,
            Age: req.body.Age,
        });

        const postUser = await postData.save();

        if (postUser) {
            return res.status(200).json("User Creted!")
        }

    } catch (error) {
        res.status(400).json({ message: " User created Unsuccessful", error })
    }
})


//Visible Users
router.get('/viewusers', async (req, res) => {
    try {

        const users = await UserSchema.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users);

    } catch (error) {

        res.status(400).json({ message: 'Internal server error', error });
    }
});

//Delete User
router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }

        const user = await UserSchema.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await UserSchema.deleteOne({ _id: userId });
        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


module.exports = router;