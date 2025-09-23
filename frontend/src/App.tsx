import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box, AppBar, Toolbar } from "@mui/material";


const App: React.FC = () => {
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        axios.get("/api/")
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Error fetching data", error));
    }, []);

    return (
        <Box
          sx={{ 
              minHeight: '100vh',
              backgroundColor: '#f1e9f4ff',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center', // Центрируем контент
              alignItems: 'center', // Центрируем по горизонтали
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
                            fontFamily: 'Monospace',
                            fontWeight: 'bold'
                        }}
                    >
                        English Exam Elixir
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: '3rem'}}>
                        <Button color="inherit">Home</Button>
                        <Button color="inherit">FCE</Button>
                        <Button color="inherit">CAE</Button>
                        <Button color="inherit">Profile</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box 
                sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                    paddingTop: '80px' // ← Отступ для фиксированной панели
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