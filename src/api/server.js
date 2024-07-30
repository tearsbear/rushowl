const express = require("express");
const app = express();

app.use(express.json());

// dummy data
const users = [{ email: "test1@mail.com", password: "123" }];

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // simple auth to find user for dummy data
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const token = "rushowl_jiehan"; //dummy token
    res.json({ message: "Login successful!", token, user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
