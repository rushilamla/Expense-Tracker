document.addEventListener("DOMContentLoaded", function () {
    console.log("🔍 Checking Chart Data...");

    fetch("https://expense-tracker-mjq2.onrender.com/api/expenses")
    .then(response => response.json())
    .then(data => {
        console.log("📊 Expense Data:", data);

        if (data.length === 0) {
            console.warn("⚠️ No expense data found.");
            return;
        }

        const categories = data.map(item => item.category);
        const amounts = data.map(item => item.amount);

        loadChart(document.getElementById("barChart").getContext("2d"), "bar", categories, amounts);
    })
    .catch(error => console.error("❌ Error fetching data:", error));


    if (!categoriesElement || !amountsElement) {
        console.error("❌ Missing data elements.");
        return;
    }

    const categories = JSON.parse(categoriesElement.textContent);
    const amounts = JSON.parse(amountsElement.textContent);

    console.log("📊 Categories:", categories);
    console.log("💰 Amounts:", amounts);

    if (categories.length === 0 || amounts.length === 0) {
        console.warn("⚠️ No data available for charts.");
        return;
    }

    loadChart(document.getElementById("barChart").getContext("2d"), "bar");
});
