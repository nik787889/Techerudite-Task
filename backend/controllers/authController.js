// //
const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/emailService")



const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const verificationToken = crypto.randomBytes(32).toString('hex')

        const user = new User({ firstName, lastName, email, password: hashedPassword, role, verified: false, verificationToken })
        await user.save()

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({ message: 'User registered. Please check your email to verify your account.' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params

        const user = await User.findOne({ verificationToken: token })

        if (!user) {
            const alreadyVerifiedUser = await User.findOne({
                email: { $exists: true },
                verificationToken: { $exists: false },
                verified: true,
            })
            if (alreadyVerifiedUser) {
                return res.status(400).json({ message: 'Email already verified. Please log in.' })
            }
            return res.status(400).json({ message: 'Invalid or expired token' })
        }

        user.verified = true
        user.verificationToken = undefined
        await user.save()

        res.json({ message: 'Email successfully verified. You can now log in.' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'User not found' })

        if (!user.verified) {
            return res.status(400).json({ message: 'Please verify your email first' })
        }

        if (user.role !== role) {
            return res.status(403).json({ message: 'You are not allowed to login from here' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.json({ token, role: user.role, email: user.email })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
};


module.exports = { register, verifyEmail, login }

