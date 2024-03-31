const Location = require("./model");

// Render Controller: Render index.html with locations using EJS
const renderLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.render("index", { locations }); // Render index.ejs with locations data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// get all Locations
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

const renderLocationForm = (req, res) => {
  res.render("addlocation"); // Assuming "addlocation.ejs" is located in the "views" directory
};

// Controller function to handle adding a new location (used for rendering and API)
const addLocationEjs = async (req, res) => {
  try {
    const { title, description, targetDate } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "true";
    const newLocation = new Location({ title, description, targetDate, achieved });
    await newLocation.save();
    // Redirect to the main page after successfully adding the location
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Location
const addLocation = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    const newLocation = new Location({ name, address, latitude, longitude });
    await newLocation.save();

    // Render the newly added location
    res.render("location", { location: newLocation });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Location by ID
const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Location by ID
const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByIdAndDelete({ _id: id });
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Locations
const deleteAllLocations = async (req, res) => {
  try {
    const result = await Location.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Location by ID
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLocation = req.body;
    const location = await Location.findOneAndUpdate({ _id: id }, updatedLocation);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getLocations,
  renderLocations,
  addLocation,
  addLocationEjs,
  renderLocationForm,
  getLocation,
  deleteLocation,
  deleteAllLocations,
  updateLocation,
};