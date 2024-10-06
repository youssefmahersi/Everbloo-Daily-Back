const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

// Enable CORS so your frontend can communicate with the backend
app.use(cors());

// Use bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Path to the projects.json file
const projectsFilePath = path.join(__dirname, "projects.json");

// API endpoint to get the projects.json file
app.get("/api/projects", (req, res) => {
  fs.readFile(projectsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read projects file" });
    }
    res.json(JSON.parse(data));
  });
});

// API endpoint to save the updated projects.json file
app.post("/api/projects", (req, res) => {
  const updatedProjects = req.body;

  fs.writeFile(
    projectsFilePath,
    JSON.stringify(updatedProjects, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save projects file" });
      }
      res.json({ message: "Projects file saved successfully" });
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
