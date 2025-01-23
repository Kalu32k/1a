import express from "express";
import fs from "fs/promises";

const app = express();

app.get("/", async (request, response) => {
    // try {
        const buf = await fs.readFile("./content/index.html");
        const text = buf.toString();

/*         const jsonBuf = await fs.readFile(".static/FrontPage-content.json");
        const jsonData = JSON.parse(jsonBuf); */

/*         htmlContent = loadFrontPageContent(htmlContent, jsonData);
        htmlContent = addFrontPageContent(htmlContent, jsonData);

        response.send(htmlContent); */
/*     }
    catch (error) {
        console.error("Error loading the page:", error);
        response.status(500).send("An error occurred while loading the page.");
    } */


    response.send(text);
});

/* app.get("/content"), async (request, response) => {
    const buf = await fs.readFile("./static/FrontPage-content.json");
        if ()
} */

app.use("/static", express.static("./static"));

app.listen(3080);






















// function handleRequest(request, response) {
//     console.log(request.method, request.url);

//     if (request.method == 'GET') {
//         if (request.url == '/hello') {
//             response.statusCode = 200;
//             response.write("Hello, world!");
//         } else if (request.url == "/goodbye") {
//             response.statusCode = 200;
//             response.write("Goodbye, world!");
//         } else {
//             // Give 404 error: url can not be found.
//             response.statusCode = 404;
//         }
//     } else {
//         // Give 405 error: method not allowed if not a GET request is made.
//         response.statusCode = 405;
//     }

//     response.end();
// }

// const server = http.createServer(handleRequest);
// server.listen(3080);