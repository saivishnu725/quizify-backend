import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User'; // Import the User model

// Function to handle user login
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await findOne({ username });

        // If user not found, return error
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await compare(password, user.password);

        // If passwords don't match, return error
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token
        res.status(200).json({ token });
    } catch (err) {
        // Handle any errors
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Function to handle user registration
export async function register(req, res) {
    const { firstName, lastName, email, username, password } = req.body;

    try {
        // Check if user already exists
        let user = await findOne({ email });

        // If user exists, return error
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user object
        user = new User({
            firstName,
            lastName,
            email,
            username,
            password,
        });

        // Hash password
        const salt = await genSalt(10);
        user.password = await hash(password, salt);

        // Save user to database
        await user.save();

        // Create JWT token
        const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token
        res.status(200).json({ token });
    } catch (err) {
        // Handle any errors
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
