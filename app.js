const express = require("express");
const app = express();

const connectDB = require("./db");
const {
  getLocations,
  renderLocations,
  addLocation,
  addLocationEjs,
  renderLocationForm,
} = require("./controller");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with locations using EJS
app.get("/", renderLocations);
// Define a route to render the addlocation.ejs view
app.get("/addlocation", renderLocationForm);
// Route to add  location using EJS
app.post("/addlocation", addLocationEjs);

// API
// GET all Locations
app.get("/api/locations", getLocations);
// POST a new Location
app.post("/api/locations", addLocation);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
