import os
import subprocess
# Directory structure
dirs = [
    "Frontend",
    "Backend",
    "Backend/Routes",
    "Backend/Models",
    "Backend/Controllers"
]

# Files to be created with basic content
files = {
    "Backend/App.js": """const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
"""
}

# Create directories
for directory in dirs:
    os.makedirs(directory, exist_ok=True)

# Create files with basic content
for file_path, content in files.items():
    with open(file_path, 'w') as file:
        file.write(content)

print("Backend directory structure created successfully!")


os.chdir("Frontend")

subprocess.run(["npm", "create", "vite@latest", ".", "--template", "react"], check=True)