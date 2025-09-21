import React, { useEffect, useState } from "react";
import axios from "axios"; // запросы к бекэнду
import { Container, Typography, Button } from "@mui/material"; // готовые UI для красоты

const App: React.FC = () => { //function component
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        axios.get("/api/") //запрос к бэку
            .then(response => setMessage(response.data.message)) // обработка успешного ответа
            .catch(error => console.error("Error fetching data", error)); // обработка ошибок
    }, []);

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                FastAPI + React + Vite + MUI (TypeScript)
            </Typography>
            <Typography variant="body1">
                {message || "Loading..."}
            </Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Material UI Button
            </Button>
        </Container>
    );
};

export default App;