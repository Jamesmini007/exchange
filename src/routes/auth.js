const express = require('express');
const User = require('../models/User');

const router = express.Router();

// 로그인 라우트
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 이메일로 사용자 검색
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // 비밀번호 검증
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        return res.json({ message: 'Login successful' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// 초기 사용자 추가 (테스트용)
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({ email, password });
        await user.save();

        return res.json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
