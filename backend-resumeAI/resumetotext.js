const fs = require("fs");
const pdf = require("pdf-parse");

async function extractTextFromPDF(filePath) {
    try {
        // Read the PDF file
        const pdfBuffer = fs.readFileSync(filePath);

        // Parse the PDF
        const data = await pdf(pdfBuffer);

        // Extracted text
        console.log("PDF Text:", data.text);
        return data.text;
    } catch (error) {
        console.error("Error reading PDF:", error);
        throw error;
    }
}

module.exports = { extractTextFromPDF };


