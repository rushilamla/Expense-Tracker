document.addEventListener("DOMContentLoaded", async function () {
    console.log("🔍 Fetching Chart Data from Backend...");

    try {
        const response = await fetch("https://expense-tracker-mjq2.onrender.com/api/chart-data"); // ✅ Correct Backend URL
        const data = await response.json();
        
        const categories = data.categories || [];
        const amounts = data.amounts || [];

        console.log("📊 Categories:", categories);
        console.log("💰 Amounts:", amounts);

        if (categories.length === 0 || amounts.length === 0) {
            console.warn("⚠️ No data available for charts.");
            return;
        }

        // ✅ Debug: Ensure canvas exists
        const canvas = document.getElementById("barChart");
        if (!canvas) {
            console.error("❌ Chart canvas not found!");
            return;
        }

        // ✅ Create Chart
        function loadChart(ctx, type, categories, amounts) {
            if (!ctx) {
                console.error("❌ Chart context not found!");
                return;
            }
        
            if (window.currentChart) {
                window.currentChart.destroy(); // ✅ Prevent multiple charts
            }
        
            window.currentChart = new Chart(ctx, {
                type: type,
                data: {
                    labels: categories,
                    datasets: [{
                        label: "Expenses",
                        data: amounts,
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
                        borderColor: "#fff",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "top",
                        }
                    }
                }
            });
        
            console.log("✅ Chart loaded successfully!");
        }

        loadChart(canvas.getContext("2d"), "bar", categories, amounts);
    } catch (error) {
        console.error("❌ Error fetching chart data:", error);
    }
});
