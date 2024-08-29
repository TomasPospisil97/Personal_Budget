
Post function:
curl -X POST \
  http://localhost:3000/envelopes/create \
  -H 'Content-Type: application/json' \
  -d '{"title": "Rent", "budget": 1000}'

Get function by ID
curl http://localhost:3000/envelopes/1

Put function - adjust the budget
curl -X PUT \
  http://localhost:3000/envelopes/1 \
  -H 'Content-Type: application/json' \
  -d '{"amount": 500}'

Delete function
curl -X DELETE http://localhost:3000/envelopes/1

Post function - substract from one and add to another
curl -X POST \
  http://localhost:3000/envelopes/transfer/1/2 \
  -H 'Content-Type: application/json' \
  -d '{"amount": 10}'