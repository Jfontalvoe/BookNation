const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dotend = require("dotenv");

// Load the environment variables
/* dotend.config(); */

dotend.config();

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Define the main route
app.get("/", (req, res) => {
  res.send("The server is running!");
});

// Connect to the database
try {
  mongoose.connect(process.env.URL);
  console.log("Connected to the database");
} catch (error) {
  console.log("Could not connect to the database");
}

// Define the app routes
const RutaUsuarios = require("./routes/Usuarios");
const RutaAuth = require("./routes/Auth");
const RutaPedidos = require("./routes/Pedidos");
const RutaLibros = require("./routes/Libros");

app.use("/usuarios", RutaUsuarios);
app.use("/auth", RutaAuth);
app.use("/libros", RutaLibros);
app.use("/pedidos", RutaPedidos);

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
