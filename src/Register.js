import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('회원가입이 완료되었습니다!');
                setTimeout(() => navigate('/login'), 2000);  // 2초 후 로그인 페이지로 이동
            } else {
                setError(data.message || '회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('회원가입 중 에러 발생:', error);
            setError('서버와 연결할 수 없습니다.');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial', textAlign: 'center', margin: '50px' }}>
            <h1>회원가입</h1>
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
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <button type="submit" style={{ marginTop: '10px' }}>
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default Register;
