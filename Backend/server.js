const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 7500;



// In-memory user storage
const users = [];
const secretKey = "your-secret-key";



app.use(cors({
  origin: "https://srinila-m9w3.onrender.com", // your frontend Render URL
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" })); // allow large JSON (for base64 photo)

// MongoDB connection URI
const uri =
  "mongodb+srv://susmi170205_db_user:SriNila@cluster0.easzz0y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // Database collections
    const srinila = client.db("SriNila").collection("srinila");
    const contactCollection = client.db("SriNila").collection("contacts");

    // ✅ Insert new enrollment
    app.post("/enroll", async (req, res) => {
      try {
        const data = req.body;
        if (!data.name || !data.course || !data.phone || !data.email) {
          return res.status(400).send({ error: "Missing required fields" });
        }

        // ✅ Additional code: add current date before inserting
        data.date = new Date();

        const result = await srinila.insertOne(data);
        res.status(201).send(result);
      } catch (err) {
        console.error("❌ Error inserting data:", err);
        res.status(500).send({ error: "Failed to insert data" });
      }
    });

    // ✅ Get all enrollments
    app.get("/getall", async (req, res) => {
      try {
        const result = await srinila.find().toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    // ✅ Get one by ID
    app.get("/getone/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const objid = { _id: new ObjectId(id) };
        const result = await srinila.findOne(objid);
        if (!result) return res.status(404).send({ error: "Not found" });
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    // ✅ Update enrollment
    app.patch("/update/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: updateData };
        const result = await srinila.updateOne(filter, updateDoc);
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to update data" });
      }
    });

    // ✅ Delete enrollment
    app.delete("/delete/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const objid = { _id: new ObjectId(id) };
        const result = await srinila.deleteOne(objid);
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to delete data" });
      }
    });

    // ✅ Save Contact Message
    app.post("/contact", async (req, res) => {
      try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
          return res.status(400).send({ error: "All fields are required" });
        }

        const result = await contactCollection.insertOne({
          name,
          email,
          message,
          date: new Date(),
        });

        res
          .status(201)
          .send({ success: true, message: "Message received", result });
      } catch (err) {
        console.error("❌ Error saving contact message:", err);
        res.status(500).send({ error: "Failed to send message" });
      }
    });

    // ✅ Get all contact messages (optional)
    app.get("/getcontacts", async (req, res) => {
      try {
        const result = await contactCollection.find().toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch contact messages" });
      }
    });

    // Ping MongoDB
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
run().catch(console.dir);

// ✅ Register Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.sendStatus(201);
  console.log("User registered successfully");
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((us) => us.username === username);

  if (user) {
    const isValidUser = await bcrypt.compare(password, user.password);
    if (isValidUser) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
      res.json({ token });
      console.log("Login successfully");
    } else {
      res
        .status(401)
        .json({ message: "Invalid credentials, password does not match" });
    }
  } else {
    res
      .status(401)
      .json({ message: "User not found. Please register to login." });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Backend connected successfully to Render!");
});


// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

