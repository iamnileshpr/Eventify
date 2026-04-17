const User = require('../models/User.js')
exports.register = async(req, res) => {
    const { name, email, password } = req.body;

    let userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ error: 'user already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const user = new User { name, email, password: hashedPassword }
        await user.save();
        res.status(201).json({ message: "user registerd successfully" })

        const otp = Math.floor(1000 + Math.random() * 9000000).toString();
        console.log(`otp for ${email}:${otp}`);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.login = (req, res) => {

}
exports.verifyOtp = (req, res) => {}
}
exports.verifyOtp = (req, res) => {}