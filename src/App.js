import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import CurrencyConverter from './exchange';
import Register from './Register';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hidata, setHello] = useState('');

    // 로그인 성공 시 호출되는 함수
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // 백엔드 API 호출
    useEffect(() => {
        axios.get('http://localhost:8080/api/hello')
            .then(response => setHello(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <Router>
            <div>
                {/* 백엔드에서 받은 데이터 표시 */}
                <p>백엔드 스프링 부트 데이터 : {hidata}</p>

                <Routes>
                    {/* 로그인 화면 */}
                    <Route
                        path="/login"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/converter" replace />
                            ) : (
                                <Login onLogin={handleLogin} />
                            )
                        }
                    />

                    {/* 회원가입 화면 */}
                    <Route
                        path="/register"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/converter" replace />
                            ) : (
                                <Register />
                            )
                        }
                    />

                    {/* 환율 계산기 화면 */}
                    <Route
                        path="/converter"
                        element={
                            isLoggedIn ? (
                                <CurrencyConverter />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    {/* 기본 경로: 로그인 화면으로 리다이렉트 */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
