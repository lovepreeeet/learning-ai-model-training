import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = 3000;
// static/dataset.json, no matter which folder the server is started from
const DATASET_FILE = path.join(import.meta.dirname, "dataset.json");
const SCORES_FILE = path.join(import.meta.dirname, "scores.json");

function readJsonArray(file) {
    if (!fs.existsSync(file)) {
        return [];
    }
    const content = fs.readFileSync(file, "utf8").trim();
    return content ? JSON.parse(content) : [];
}

function appendToFile(file, entry) {
    const items = readJsonArray(file);
    items.push(entry);
    fs.writeFileSync(file, JSON.stringify(items));
    return items.length;
}

function readBody(req, callback) {
    let body = "";
    req.on("data", (chunk) => body += chunk);
    req.on("end", () => callback(JSON.parse(body)));
}

const server = http.createServer((req, res) => {

    // Allow posting from the Vite dev server (different port)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // Body: [distanceFromObstacle, height, passed]
    if (req.method === "POST" && req.url === "/record") {
        readBody(req, (record) => {
            const total = appendToFile(DATASET_FILE, record);
            console.log("recorded:", record, "total:", total);
            res.writeHead(200);
            res.end("ok");
        });
        return;
    }

    // Body: { score, playedAt, obstacles: [{ distance, height, passed }] }
    if (req.method === "POST" && req.url === "/score") {
        readBody(req, (play) => {
            const total = appendToFile(SCORES_FILE, play);
            console.log("score:", play.score, "plays:", total);
            res.writeHead(200);
            res.end("ok");
        });
        return;
    }

    if (req.method === "GET" && req.url === "/scores") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(readJsonArray(SCORES_FILE)));
        return;
    }

    res.writeHead(404);
    res.end();
});

server.listen(PORT, () => {
    console.log(`Recording to ${DATASET_FILE} on port ${PORT}`);
});
