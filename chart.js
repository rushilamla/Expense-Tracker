document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("expenseChart")?.getContext("2d");

    if (ctx) {
        const categories = JSON.parse(document.getElementById("categories-data").textContent);
        const amounts = JSON.parse(document.getElementById("amounts-data").textContent);
    
        if (categories.length > 0 && amounts.length > 0) {
            // Bar Chart
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: categories,
                    datasets: [{
                        label: "Expenses",
                        data: amounts,
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                        borderColor: "#333",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true
                }
            });
            new Chart(ctx, {
                type: "pie",
                data: {
                    labels: categories,
                    datasets: [{
                        label: "Expenses Distribution",
                        data: amounts,
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                        borderColor: "#fff",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    }
    
});
