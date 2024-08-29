const express = require('express');
const app = express();
app.use(express.json());
const logger = require('./logger');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Global variables to store information about envelopes and total budget
let totalBudget = 0;
let envelopes = [];

const PORT = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Endpoint to generate individual budget envelopes
app.post('/envelopes/create', (req, res) => {
    const { title, budget } = req.body;
    if (!title || !budget) {
      return res.status(400).send({ error: 'Title and budget are required' });
    }
    const newEnvelope = { id: envelopes.length + 1, title, budget };
    envelopes.push(newEnvelope);
    totalBudget += budget;
    res.status(201).send({ message: 'Envelope created successfully', envelope: newEnvelope });
});
  
  // Endpoint to retrieve all envelopes
app.get('/envelopes', (req, res) => {
    res.send({ envelopes, totalBudget });
});
  
  // Endpoint to retrieve a single envelope
app.get('/envelopes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const envelope = envelopes.find(envelope => envelope.id === id);
    if (!envelope) {
      return res.status(404).send({ error: 'Envelope not found' });
    }
    res.send({ envelope, totalBudget });
});

app.put('/envelopes/:id', express.json(), (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).send({ error: 'Invalid envelope ID' });
    }

    const envelope = envelopes.find(envelope => envelope.id === id);
    if (!envelope) {
      return res.status(404).send({ error: 'Envelope not found' });
    }
  
    const { amount, title, budget } = req.body;
    if (amount && amount > 0) {
      // Subtract the amount from the envelope's budget
      envelope.budget -= amount;
      totalBudget -= amount;
    }
  
    if (title) {
      envelope.title = title;
    }
  
    if (budget) {
      envelope.budget = budget;
      totalBudget += budget - envelope.budget;
    }
  
    res.send({ message: 'Envelope updated successfully', envelope });
});

app.delete('/envelopes/:id', (req, res) => {
    console.log(req);
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).send({ error: 'Invalid envelope ID' });
    }
  
    const envelope = envelopes.find(envelope => envelope.id === id);
    if (!envelope) {
      return res.status(404).send({ error: 'Envelope not found' });
    }
  
    // Remove the envelope from the array
    const index = envelopes.indexOf(envelope);
    envelopes.splice(index, 1);
  
    // Update the total budget
    totalBudget -= envelope.budget;
  
    res.send({ message: 'Envelope deleted successfully' });
});

app.post('/envelopes/transfer/:from/:to', (req, res) => {
    const fromId = parseInt(req.params.from);
    const toId = parseInt(req.params.to);
    const amount = req.body.amount;
  
    if (isNaN(fromId) || fromId <= 0 || isNaN(toId) || toId <= 0) {
      return res.status(400).send({ error: 'Invalid envelope IDs' });
    }
  
    if (!amount || amount <= 0) {
      return res.status(400).send({ error: 'Invalid transfer amount' });
    }
  
    const fromEnvelope = envelopes.find(envelope => envelope.id === fromId);
    const toEnvelope = envelopes.find(envelope => envelope.id === toId);
  
    if (!fromEnvelope || !toEnvelope) {
      return res.status(404).send({ error: 'One or both envelopes not found' });
    }
  
    if (fromEnvelope.budget < amount) {
      return res.status(400).send({ error: 'Insufficient funds in source envelope' });
    }
  
    fromEnvelope.budget -= amount;
    toEnvelope.budget += amount;
  
    totalBudget -= amount;
    totalBudget += amount;
  
    res.send({ message: 'Transfer successful', fromEnvelope, toEnvelope });
});

app.get('/', (req, res) => {
    res.send({envelopes, totalBudget});
});

const errorHandler = (err, req, res, next) => {
    logger.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  };
  
  app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  