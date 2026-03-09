const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Middleware to parse URL-encoded bodies (for form submission)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route matching the image example
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// GET route to serve the survey form
app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'survey.html'));
});

// POST route to handle survey submission
app.post('/submit-survey', (req, res) => {
    const { name, email, feedback, rating } = req.body;
    console.log('\n--- Customer Feedback Received ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Rating: ${rating}`);
    console.log(`Feedback: ${feedback}`);
    console.log('----------------------------------\n');
    
    // Send a response back to the user
    res.send(`
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .container { background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; }
                h1 { color: #4CAF50; }
                a { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Thank you for your feedback, ${name}!</h1>
                <p>Your rating (${rating}/5) and comments have been recorded.</p>
                <a href="/survey">Submit another response</a>
            </div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Access the survey form at http://localhost:${port}/survey`);
});
