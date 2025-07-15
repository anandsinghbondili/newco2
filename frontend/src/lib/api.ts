import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

const res = await api.post("/login/access-token", {
    username: "admin@example.com",
    password: "yourpassword",
});

console.log(res);