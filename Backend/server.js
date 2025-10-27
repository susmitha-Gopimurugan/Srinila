const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 7500; // ✅ Render-compatible port

// In-memory user storage
const users = [];
const secretKey = "your-secret-key";

// ✅ CORS Configuration
app.use(cors({
  origin: "https://srinila-m9w3.onrender.com", // your frontend Render URL
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

// MongoDB connection
const uri = "mongodb+srv://susmi170205_db_user:SriNila@cluster0.easzz0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function run() {
  try {
    await client.connect();

    const srinila = client.db("SriNila").collection("srinila");
    const contactCollection = client.db("SriNila").collection("contacts");

    // Routes
    app.post("/enroll", async (req, res) => {
      try {
        const data = req.body;
        if (!data.name || !data.course || !data.phone || !data.email)
          return res.status(400).send({ error: "Missing required fields" });

        data.date = new Date();
        const result = await srinila.insertOne(data);
        res.status(201).send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to insert data" });
      }
    });

    app.get("/getall", async (req, res) => {
      try {
        const result = await srinila.find().toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    app.get("/getone/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await srinila.findOne({ _id: new ObjectId(id) });
        if (!result) return res.status(404).send({ error: "Not found" });
        res.send(result);
      } catch {
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    app.patch("/update/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await srinila.updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );
        res.send(result);
      } catch {
        res.status(500).send({ error: "Failed to update data" });
      }
    });

    app.delete("/delete/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await srinila.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch {
        res.status(500).send({ error: "Failed to delete data" });
      }
    });

    app.post("/contact", async (req, res) => {
      try {
        const { name, email, message } = req.body;
        if (!name || !email || !message)
          return res.status(400).send({ error: "All fields are required" });

        const result = await contactCollection.insertOne({
          name, email, message, date: new Date()
        });

        res.status(201).send({ success: true, message: "Message received", result });
      } catch {
        res.status(500).send({ error: "Failed to send message" });
      }
    });

    app.get("/getcontacts", async (req, res) => {
      try {
        const result = await contactCollection.find().toArray();
        res.send(result);
      } catch {
        res.status(500).send({ error: "Failed to fetch contact messages" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
run().catch(console.dir);

// Auth Routes
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.sendStatus(201);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: "User not found" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
  res.json({ token });
});

// ✅ Test route
app.get("/", (req, res) => res.send("✅ Backend connected successfully to Render!"));

// Start server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
