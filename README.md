# Frontend (React + Tailwind)

## Setup
```
cd frontend
npm install
```

Optionally set API base URL (defaults to `http://localhost:8080`):
- Create a `.env` file with:
```
REACT_APP_API_BASE_URL=http://localhost:8080
```

## Run
```
npm start
```

## Integration
- Events are synced to the backend via `src/api/events.js`.
- Context `src/context/ContextWrapper.js` calls the API on create/update/delete and hydrates from server on load.
