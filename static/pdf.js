document.addEventListener("DOMContentLoaded", function () {
    window.generatePDF = function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("Expense Report", 20, 20);
        doc.text(`Total Spent: ₹ ${document.querySelector("strong").innerText}`, 20, 30); // Ensure ₹ is properly displayed

        let rows = [];
        fetch("https://expense-tracker-mjq2.onrender.com/api/expenses")
            .then(response => response.json())
            .then(data => {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
        
                doc.text("Expense Report", 20, 20);
                doc.text(`Total Spent: ₹ ${document.querySelector("strong").innerText}`, 20, 30);
        
                let rows = data.map(item => [item.category, `₹ ${item.amount}`, item.date]);
        
                doc.autoTable({
                    head: [["Category", "Amount", "Date"]],
                    body: rows,
                    startY: 40
                });

        doc.save("expense_report.pdf");
    })
    .catch(error => console.error("❌ Error fetching expense data:", error));


        doc.autoTable({
            head: [["Category", "Amount", "Date"]],
            body: rows,
            startY: 40
        });

        doc.save("expense_report.pdf");
    };
});
