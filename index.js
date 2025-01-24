import express from "express";
import { engine } from "express-handlebars";
import fs from "fs/promises";

const app = express();

// Middleware to set response type to JSON
app.use(express.json());

// Set up Handlebars as the view engine
app.engine("handlebars", engine({
    layoutsDir: "./templates/layouts",
    defaultLayout: "layout"
}));
app.set("view engine", "handlebars");
app.set("views", "./templates");

// Function to fetch data using fetch
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

// Route to render the index.handlebars file with API data
app.get("/", async (request, response) => {
    try {
        const movies = await fetchData("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
        
        // Fetch footer data
        let footerData;
        try {
            const footerContent = await fs.readFile("./static/FrontPage-content.json");
            footerData = JSON.parse(footerContent);
        } catch (footerError) {
            console.error("Error reading footer data:", footerError);
            footerData = {}; // Provide a default value or handle the error as needed
        }

        response.render("index", { movies: movies.data, footer: footerData }); // Pass the movies and footer data to the template
    } catch (error) {
        console.error("Error fetching API data:", error);
        response.status(500).send("Error fetching API data");
    }
});

// Add a test route to return JSON data directly
app.get("/test/movies", async (request, response) => {
    try {
        const movies = await fetchData("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
        response.json({ movies: movies.data });
    } catch (error) {
        console.error("Error fetching API data:", error);
        response.status(500).send("Error fetching API data");
    }
});

// Dynamic route to render the movie.handlebars file for each movie
app.get("/movies/:id", async (request, response) => {
    try {
        const movieId = request.params.id;
        const movie = await fetchData(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`);
        
        // Fetch footer data
        let footerData;
        try {
            const footerContent = await fs.readFile("./static/FrontPage-content.json");
            footerData = JSON.parse(footerContent);
        } catch (footerError) {
            console.error("Error reading footer data:", footerError);
            footerData = {}; // Provide a default value or handle the error as needed
        }

        response.render("movie", { attributes: movie.data.attributes, footer: footerData }); // Pass the movie and footer data to the template
    } catch (error) {
        console.error("Error fetching movie data:", error);
        response.status(500).send("Error fetching movie data");
    }
});

// Serve static files from the ./static directory
app.use("/static", express.static("./static"));

// Start the server on port 5080
app.listen(5080, () => {
    console.log("Server is running on http://localhost:5080");
});

export default app; // Export the app for testing