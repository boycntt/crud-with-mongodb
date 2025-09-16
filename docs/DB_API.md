# Dynamic DB CRUD API

This document describes the dynamic database inspection and CRUD endpoints added to the project.

Base URL (local):

- http://localhost:3001/api/db

Notes
- By default these endpoints operate on the database used by the application (the mongoose connection from `process.env.MONGODB_URI`).
- You can target an arbitrary database name supported by the same MongoDB URI by adding `?db=DBNAME` to requests.
- These endpoints accept and return JSON.
- Use caution: these endpoints permit reads and writes directly against your database. Protect them before exposing to untrusted networks.

Authentication
- This project uses a single API key stored in the `.env` file under `API_KEY`.
- You can generate/update that key with the server endpoint below. The runtime will update `process.env.API_KEY` as well.

Generate or rotate the API key (writes to `.env`):

POST /api/generate-key

Response: { data: { key: "<raw-key>" }, status: "success" }

Use the returned `key` in the `x-api-key` header or as `?api_key=` in requests.

Example header:

  x-api-key: your_secret_key


Endpoints

1) List collections

- GET /api/db/collections
- Optional query: `?db=DBNAME`

Response example

{
  "data": ["users","blogs","customers"],
  "status": "success"
}


2) List documents in a collection

- GET /api/db/:collection
- Query params:
  - `limit` (optional, default 50)
  - any other key=value pairs are used as simple string equality filters for the query
  - `db` (optional) to target a different DB

Example:
GET /api/db/users?limit=10&username=jdoe

Response:
{
  "data": [ { ...document... }, ... ],
  "status": "success"
}


3) Create a document

- POST /api/db/:collection
- Optional query: `?db=DBNAME`
- Body: JSON document to insert

Example (PowerShell):

$body = @{ username='jdoe'; email='jdoe@example.com' } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/db/users' -Method Post -Body $body -ContentType 'application/json'

Response (201):
{
  "data": { "_id": "...", "username": "jdoe", "email": "jdoe@example.com" },
  "status": "success"
}


4) Read a document by id

- GET /api/db/:collection/:id
- Optional `?db=DBNAME`

Example:
GET /api/db/users/64f...abc

Response (200):
{
  "data": { ...document... },
  "status": "success"
}

Response (404):
{
  "error": "Not found"
}


5) Update a document by id (partial update)

- PUT /api/db/:collection/:id
- Optional `?db=DBNAME`
- Body: partial document with fields to $set

Example (PowerShell):
$body = @{ value = 456 } | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:3001/api/db/__test_dynamic/<id>' -Method Put -Body $body -ContentType 'application/json'

Response:
{
  "data": { ...updated document... },
  "status": "success"
}


6) Delete a document by id

- DELETE /api/db/:collection/:id
- Optional `?db=DBNAME`

Response:
{
  "data": { ...deleted document... },
  "status": "success"
}


Example curl commands

Create:

curl -X POST -H "Content-Type: application/json" -d '{"name":"smoke","value":123}' http://localhost:3001/api/db/__test_dynamic

Get docs:

curl 'http://localhost:3001/api/db/__test_dynamic?limit=5'

Get by id:

curl 'http://localhost:3001/api/db/__test_dynamic/<id>'


Security & recommendations

- Add authentication (API key, JWT, or other) before exposing to the internet.
- Limit allowed collections or allowed DB names in code if you only need specific datasets.
- For production, implement rate limiting and input sanitization.


Troubleshooting

- If you see `Not connected to database`, ensure `MONGODB_URI` in `.env` is correct and the app logged "Connected to MongoDB" on startup.
- If using `?db=...` and you get collection not found, double-check the DB name and that the URI user has access.

