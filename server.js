const express = require('express');
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(3000, () => {
    console.log('Note: The server is now listening on port 3000');
});

// Home page request for testing
app.get('/', (req, res) => {
    res.send("Hello, this is the server for SIT323 Task 4.1P");
});

// Helper functions for the operations
function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    if (n2 === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return n1 / n2;
}


// Helper function to validate inputs
function validateInputs(req, res) {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);

    if (isNaN(n1)) {
        res.status(400).send(`Error: Received n1 value of '${req.query.n1}' is not a number!`);
        return false;
    }

    if (isNaN(n2)) {
        res.status(400).send(`Error: Received n2 value of '${req.query.n2}' is not a number!`);
        return false;
    }

    return [n1, n2];
}

// Arithmetic Routes
app.get('/add', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (n1 === undefined || n2 === undefined) return;

        const result = add(n1, n2);
        res.status(200).send(`Sum of  ${n1} and ${n2} is ${result}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
        console.log(`Server error occurred: ${error}`);
    }
});

app.get('/subtract', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (n1 === undefined || n2 === undefined) return;

        const result = subtract(n1, n2);
        res.status(200).send(`Subtracting ${n2} from ${n1} gives a result of ${result}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
        console.log(`Server error occurred: ${error}`);
    }
});

app.get('/multiply', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (n1 === undefined || n2 === undefined) return;

        const result = multiply(n1, n2);
        res.status(200).send(`${n1} times ${n2} is ${result}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
        console.log(`Server error occurred: ${error}`);
    }
});

app.get('/divide', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (n1 === undefined || n2 === undefined) return;

        const result = divide(n1, n2);
        res.status(200).send(`When ${n1} is divided by ${n2}, the result is ${result}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
        console.log(`Server error occurred: ${error}`);
    }
});
