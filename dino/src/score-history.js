const historyButton = document.querySelector("#history-button");
const historyPanel = document.querySelector("#history");


// -------------------------
// SCORE HISTORY
// -------------------------

async function showHistory() {
    historyPanel.textContent = "Loading…";

    try {
        const response = await fetch("http://localhost:3000/scores");
        const plays = await response.json();
        renderHistory(plays);
    } catch (error) {
        historyPanel.textContent = "Could not load scores — is dino-server running?";
        console.error("Failed to load scores: ", error);
    }
}

// Newest play first: date, score, and each jump as distance/height/passed
function renderHistory(plays) {
    if (plays.length === 0) {
        historyPanel.textContent = "No plays recorded yet.";
        return;
    }

    const bestScore = Math.max(...plays.map((play) => play.score));

    const rows = plays
        .map((play, index) => {
            const jumps = play.obstacles
                .map((o) => `${o.distance}px / ${o.height}px ${o.passed ? "✓" : "✗"}`)
                .join(", ");

            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${new Date(play.playedAt).toLocaleString()}</td>
                    <td>${play.score}</td>
                    <td>${jumps || "—"}</td>
                </tr>`;
        })
        .reverse()
        .join("");

    historyPanel.innerHTML = `
        <table>
            <thead>
                <tr><th>#</th><th>Played</th><th>Score (best ${bestScore})</th><th>Jumps (distance / height)</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;
}

historyButton.addEventListener("click", () => {
    // Keep Space for jumping instead of re-clicking the button
    historyButton.blur();

    historyPanel.hidden = !historyPanel.hidden;
    historyButton.textContent =
        historyPanel.hidden ? "Show score history" : "Hide score history";

    if (!historyPanel.hidden) {
        showHistory();
    }
});
