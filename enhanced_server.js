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
    res.send("Hello, this is the server for SIT323 Task 4.2C");
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

function exponentiate(n1, n2) {
    return Math.pow(n1, n2);
}

function sqrt(n) {
    if (n < 0) {
        throw new Error('Square root of a negative number is not allowed');
    }
    return Math.sqrt(n);
}

function modulo(n1, n2) {
    if (n2 === 0) {
        throw new Error('Modulo by zero is not allowed');
    }
    return n1 % n2;
}

// Helper function to validate inputs
function validateInputs(req, res, singleInput = false) {
    const n1 = parseFloat(req.query.n1);
    const n2 = singleInput ? undefined : parseFloat(req.query.n2);

    if (isNaN(n1)) {
        res.status(400).send(`Error: Received n1 value of '${req.query.n1}' is not a number!`);
        return false;
    }
    if (!singleInput && isNaN(n2)) {
        res.status(400).send(`Error: Received n2 value of '${req.query.n2}' is not a number!`);
        return false;
    }
    return singleInput ? [n1] : [n1, n2];
}

// Arithmetic Routes
app.get('/add', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (!n1 && !n2) return;
        res.status(200).send(`Sum of ${n1} and ${n2} is ${add(n1, n2)}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
    }
});

app.get('/subtract', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (!n1 && !n2) return;
        res.status(200).send(`Subtracting ${n2} from ${n1} gives a result of ${subtract(n1, n2)}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
    }
});

app.get('/multiply', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (!n1 && !n2) return;
        res.status(200).send(`${n1} times ${n2} is ${multiply(n1, n2)}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
    }
});

app.get('/divide', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (!n1 && !n2) return;
        res.status(200).send(`When ${n1} is divided by ${n2}, the result is ${divide(n1, n2)}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
    }
});

app.get('/exponentiate', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (!n1 && !n2) return;
        res.status(200).send(`${n1} raised to the power of ${n2} is ${exponentiate(n1, n2)}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
    }
});

app.get('/sqrt', (req, res) => {
    try {
        const [n1] = validateInputs(req, res, true);
        if (!n1) return;
        res.status(200).send(`The square root of ${n1} is ${sqrt(n1)}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
    }
});

app.get('/modulo', (req, res) => {
    try {
        const [n1, n2] = validateInputs(req, res);
        if (!n1 && !n2) return;
        res.status(200).send(`The remainder when ${n1} is divided by ${n2} is ${modulo(n1, n2)}`);
    } catch (error) {
        res.status(500).send(`Unknown server error occurred. Error: ${error.message}`);
    }
});
