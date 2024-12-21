import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            onLogin(); // 부모 컴포넌트에 로그인 상태 알림
            navigate('/dashboard'); // 로그인 성공 시 이동
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial', textAlign: 'center', margin: '50px' }}>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ marginTop: '10px' }}>
                    로그인
                </button>
            </form>
            <button
                onClick={() => navigate('/register')}
                style={{
                    marginTop: '20px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                }}
            >
                회원가입
            </button>
        </div>
    );
};

export default Login;
