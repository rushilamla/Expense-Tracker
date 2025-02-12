// chart.js

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", async function () {
    console.log("🔍 Fetching Chart Data from Backend...");

    try {
        // Fetch the chart data from your Render backend API
        const response = await fetch("https://expense-tracker-mjq2.onrender.com/api/chart-data");
        const data = await response.json();

        // Destructure the categories and amounts from the returned data
        const categories = data.categories || [];
        const amounts = data.amounts || [];

        console.log("📊 Categories:", categories);
        console.log("💰 Amounts:", amounts);

        // Check if data exists
        if (categories.length === 0 || amounts.length === 0) {
            console.warn("⚠️ No data available for charts.");
            return;
        }

        // Ensure the chart canvas exists in the DOM
        const canvas = document.getElementById("barChart");
        if (!canvas) {
            console.error("❌ Chart canvas not found!");
            return;
        }

        // Load the chart with the fetched data
        loadChart(canvas.getContext("2d"), "bar", categories, amounts);
    } catch (error) {
        console.error("❌ Error fetching chart data:", error);
    }
});

/**
 * Creates (or re-creates) a Chart.js chart.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {string} type - The type of chart (e.g., "bar", "pie").
 * @param {Array} categories - The labels for the chart.
 * @param {Array} amounts - The dataset values for the chart.
 */
function loadChart(ctx, type, categories, amounts) {
    // Check that the canvas context is valid
    if (!ctx) {
        console.error("❌ Chart context not found!");
        return;
    }

    // Destroy the previous chart if it exists to avoid duplicates
    if (window.currentChart) {
        window.currentChart.destroy();
    }

    // Create a new Chart.js chart
    window.currentChart = new Chart(ctx, {
        type: type,
        data: {
            labels: categories,
            datasets: [{
                label: "Expenses",
                data: amounts,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4CAF50",
                    "#9966FF",
                    "#FF9F40"
                ],
                borderColor: "#fff",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top"
                }
            }
        }
    });

    console.log("✅ Chart loaded successfully!");
}
