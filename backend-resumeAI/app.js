const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');
const { getAdditionalSkills, getjobinterndescription } = require('./GROQAPI');
const multer = require('multer');
const {extractTextFromPDF} =require('./resumetotext.js');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'userauth',
    password: 'Zayce.69420',
    port: 5432,
});

// apis for login/signup

app.post('/login', (req, res) => {
    console.log("POST /login called");
    console.log("Request body:", req.body); // Logs the entire body

    const sql = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const values = [req.body.email, req.body.password];
    pool.query(sql, values, (error, result) => {
        if (error) {
            return res.json("Login failed");
        }
        if (result.rows.length > 0) {
            // Successful login
            return res.json( {message:"login successfull"});
        } else {
            // No matching record
            return res.json({ message: "No record found" });
        }
    });
})

app.post('/signup', (req, res) => {
    console.log("POST /signup called");
    console.log("Request body:", req.body); // Logs the entire body

    const { email, password, passwordConfirm } = req.body;

    // Check if the password and confirmPassword match
    if (password !== passwordConfirm) {
        return res.json({ message: "Passwords do not match" });
    }

    // SQL query to insert the new user into the database
    const sql = "INSERT INTO users (email, password) VALUES ($1, $2)";
    const values = [email, password]; // Get email and password from the request body

    pool.query(sql, values, (error, result) => {
        if (error) {
            return res.json({ message: "Signup failed, try a different email ", error: error.message });
        }
        return res.json({ message: "Signup successful" });
    });
});
// api to extract resume text and proccess it with groq api
const upload = multer({ dest: "uploads/" }); // Save files to the 'uploads' folder


app.post('/skills' ,upload.single("resume"), async (req, res) => {
    console.log("POST /skills called");
    console.log("Request body:", req.body);
    // extract text
    const filePath = req.file.path;
    const pdfText = await extractTextFromPDF(filePath);
    // groq api callback
    const additionalskills = await getAdditionalSkills(pdfText);
    return res.json(additionalskills.choices[0]?.message?.content || "");

});

app.post('/description' ,upload.single("resume"), async (req, res) => {
    console.log("POST /description called");
    console.log("Request body:", req.body);
    const filePath = req.file.path;
    const pdfText = await extractTextFromPDF(filePath);
    const descriptionsuggestions = await getjobinterndescription(pdfText);
    return res.json(descriptionsuggestions.choices[0]?.message?.content || "");
})



const PORT = process.env.PORT || 8020;
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

