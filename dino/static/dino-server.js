import http from "node:http";
import fs from "node:fs";

const PORT = 3000;
const DATASET_FILE = "dataset.json";

function readDataset() {
    if (!fs.existsSync(DATASET_FILE)) {
        return [];
    }
    const content = fs.readFileSync(DATASET_FILE, "utf8").trim();
    return content ? JSON.parse(content) : [];
}

const server = http.createServer((req, res) => {

    // Allow posting from dino.html opened directly as a file
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === "GET" && (req.url === "/" || req.url === "/dino.html")) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync("dino.html"));
        return;
    }

    // Body: [distanceFromObstacle, height, passed]
    if (req.method === "POST" && req.url === "/record") {
        let body = "";
        req.on("data", (chunk) => body += chunk);
        req.on("end", () => {
            const record = JSON.parse(body);
            const dataset = readDataset();
            dataset.push(record);
            fs.writeFileSync(DATASET_FILE, JSON.stringify(dataset));
            console.log("recorded:", record, "total:", dataset.length);
            res.writeHead(200);
            res.end("ok");
        });
        return;
    }

    res.writeHead(404);
    res.end();
});

server.listen(PORT, () => {
    console.log(`Play at http://localhost:${PORT}`);
});
