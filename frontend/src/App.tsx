import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button, Box, AppBar, Toolbar, Modal, Alert, TextField } from "@mui/material";


const App: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [authOpen, setAuthOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        axios.get("/api/")
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Error fetching data", error));

            checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await axios.get("/auth/check");
            if (response.data.authenticated) {
                setIsAuthenticated(true);
                setUserEmail(response.data.user);
            }
        } catch (error) {
            console.error("Auth check failed", error);
        }
    };

    const handleAuth = async () => {
        setError("");
        try {
            const endpoint = isLogin ? "/auth/jwt/login" : "/auth/register";
            const response = await axios.post(endpoint, {
                email: email,
                password: password
            });

            if (isLogin && response.data.access_token) {
                // Сохраняем токен
                localStorage.setItem("token", response.data.access_token);
                setIsAuthenticated(true);
                setUserEmail(email);
                setAuthOpen(false);
                setEmail("");
                setPassword("");
            } else if (!isLogin) {
                // После регистрации переключаемся на логин
                setIsLogin(true);
                setError("Registration successful! Please login.");
            }
        } catch (error: any) {
            setError(error.response?.data?.detail || "Authentication failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserEmail("");
    };

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <Box
          sx={{ 
              minHeight: '100vh',
              backgroundColor: '#f1e9f4ff',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 0,
              width: '100vw',
              boxSizing: 'border-box'
          }}
        >
          {/* Navigation bar */}
            <AppBar 
                position="fixed" 
                sx={{ 
                    backgroundColor: '#8c6a97ff',
                    padding: '0.5rem 0'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: 'bold'
                        }}
                    >
                        English Exam Elixir
                    </Typography>
                    
                    <Box sx={{ 
                          display: 'flex',
                          gap: '3rem',
                          fontFamily: "'Nunito', sans-serif"
                        }}>
                        <Button color="inherit">Home</Button>
                        <Button color="inherit">FCE</Button>
                        <Button color="inherit">CAE</Button>
                        {isAuthenticated ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="body2">
                                    Hello, {userEmail}
                                </Typography>
                                <Button 
                                    color="inherit" 
                                    onClick={handleLogout}
                                    sx={{ border: '1px solid white' }}
                                >
                                    Logout
                                </Button>
                            </Box>
                        ) : (
                            <Button 
                                color="inherit" 
                                onClick={() => setAuthOpen(true)}
                                sx={{ border: '1px solid white' }}
                            >
                                Login
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Модальное окно авторизации -- всплывающее окно поверх основного контента*/}
            <Modal
                open={authOpen}
                onClose={() => setAuthOpen(false)}
                aria-labelledby="auth-modal"
            >
                <Box sx={modalStyle}>
                    <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Nunito', sans-serif" }}>
                        {isLogin ? "Login" : "Register"}
                    </Typography>
                    
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />
                    
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAuth}
                        sx={{ 
                            mt: 2,
                            backgroundColor: '#8c6a97ff',
                            '&:hover': { backgroundColor: '#7a5985ff' }
                        }}
                    >
                        {isLogin ? "Login" : "Register"}
                    </Button>
                    
                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                        }}
                        sx={{ mt: 1 }}
                    >
                        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                    </Button>
                </Box>
            </Modal>

            <Box 
                sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                    paddingTop: '80px'
                }}
            >
              {/* Название */}
              <Typography 
                  variant="h1"
                  gutterBottom
                  sx={{ 
                        fontFamily: "'Revalia', sans-serif",
                        fontWeight: '900',
                        fontSize: '6rem',
                        color: '#6f5678ff',
                        textAlign: 'center',
                        textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                        letterSpacing: '2px',
                        lineHeight: '1.2',
                        marginBottom: '1rem',
                      }}
            >
                English Exam Elixir
              </Typography>
              {/* Описание сайта */}
              <Typography 
                  variant="h5"
                  sx={{ 
                      fontFamily: "'Quicksand', sans-serif",
                      color: 'black', 
                      textAlign: 'center',
                      fontWeight: '400',
                      opacity: 0.95,
                      letterSpacing: '1px',
                      lineHeight: '1.6',
                      maxWidth: '1100px',
                      marginBottom: '2rem'
                  }}
                  >
                      Your ultimate platform for mastering Cambridge English exams  FCE and CAE 
                      through interactive tests, 
                      vocabulary building, and grammar learning and most importantly practice.
                       Transform your English 
                      skills with our magical approach to language learning!
              </Typography>
              <Button 
                    variant="contained" 
                    sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        padding: '15px 50px',
                        fontSize: '1.3rem',
                        fontWeight: '500',
                        fontFamily: "'Nunito', sans-serif",
                        borderRadius: '30px',
                        textTransform: 'none',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        color: '#8c6a97ff'
                    }}
                >
                    Begin Your Journey
                </Button>
            </Box>
            <Box sx={{ width: '100%', maxWidth: '900px', marginTop: '2rem' }}>
                {/* Секция 1 */}
                <Box sx={{ marginBottom: '3rem' }}>
                  <Typography 
                      variant="h3"
                      sx={{ 
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: '800',
                          color: '#8c6a97ff',
                          textAlign: 'left',
                          marginBottom: '1rem',
                          fontSize: '2.5rem'
                      }}
                  >
                      What is FCE?
                  </Typography>
                  <Typography 
                        variant="h6"
                        sx={{ 
                            fontFamily: "'Quicksand', sans-serif",
                            color: 'black', 
                            textAlign: 'left',
                            fontWeight: '400',
                            lineHeight: '1.6',
                            opacity: 0.8
                        }}
                    >
                        FCE (First Certificate in English) is an upper-intermediate level Cambridge exam that proves 
                        you can use everyday written and spoken English for work or study purposes. 
                        It's the perfect choice if you want to prove your English skills to employers or universities.
                    </Typography>
                </Box>

                {/* Секция 2 */}
                <Box sx={{ marginBottom: '3rem' }}>
                    <Typography 
                        variant="h3"
                        sx={{ 
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: '800',
                            color: '#8c6a97ff',
                            textAlign: 'left',
                            marginBottom: '1rem',
                            fontSize: '2.5rem'
                        }}
                    >
                      What is CAE?
                    </Typography>
                    <Typography 
                        variant="h6"
                        sx={{ 
                            fontFamily: "'Quicksand', sans-serif",
                            color: 'black', 
                            textAlign: 'left',
                            fontWeight: '400',
                            lineHeight: '1.6',
                            opacity: 0.8
                        }}
                    >
                        CAE (Certificate in Advanced English) is an advanced-level exam for learners who need 
                        to use English in professional and academic contexts. It shows that you're ready to 
                        study at an English-speaking university or work in international business environments.
                    </Typography>
                </Box>

                {/* Секция 3 */}
                <Box sx={{ marginBottom: '3rem' }}>
                    <Typography 
                        variant="h3"
                        sx={{ 
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: '800',
                            color: '#8c6a97ff',
                            textAlign: 'left',
                            marginBottom: '1rem',
                            fontSize: '2.5rem'
                        }}
                    >
                        How can we help you?
                    </Typography>
                    <Typography 
                        variant="h6"
                        sx={{ 
                            fontFamily: "'Quicksand', sans-serif",
                            color: 'black', 
                            textAlign: 'left',
                            fontWeight: '400',
                            lineHeight: '1.6',
                            opacity: 0.8
                        }}
                    >
                        Our platform provides comprehensive preparation materials, practice tests, 
                        vocabulary builders, and grammar exercises specifically designed for FCE and CAE exams. 
                        Track your progress and identify areas for improvement with our smart analytics system.
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
};

export default App;