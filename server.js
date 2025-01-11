const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const filePath = "./data.json";

app.use(express.json());
app.use(cors());
app.post("/addUser", (req, res) => {
  console.log("Request received:", req.body); // Log the incoming request
  const newUser = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    let users = [];
    if (!err) {
      try {
        users = JSON.parse(data);
      } catch {
        users = [];
      }
    }

    console.log("Server Response:", data);
    const existingUser = users.find((user) => user.email === newUser.email);
    if (existingUser) {
      const response = {
        success: false,
        message: "This email is already a user.",
      };
      console.log("Sending response:", response); // Log the response
      return res.status(400).json(response);
    } else {
      users.push(newUser);

      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          const response = {
            success: false,
            message: "Error saving user data",
          };
          console.log("Sending response:", response); // Log the response
          return res.status(500).json(response);
        } else {
          const response = {
            success: true,
            message: "User added successfully!",
          };
          console.log("Sending response:", response); // Log the response
          return res.json(response);
        }
      });
    }
  });
});

app.put("/update-password", (req, res) => {
  const { email, newPassword } = req.body;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }

    let users = JSON.parse(data);
    const user = users.find((user) => user.Email === email);
    if (user) {
      user.Password = newPassword;
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }

        res.send("Password updated successfully");
      });
    } else {
      res.status(404).send("User not found");
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
