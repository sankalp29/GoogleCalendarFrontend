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

## Architecture
- React for component-driven UI.
- Tailwind for utility-first CSS.
- Global state via `src/context/ContextWrapper.js` and `GlobalContext.js`.
- Date utilities via `dayjs` in `src/util.js`.
- API client in `src/api/events.js` (native `fetch`).

## Interactions
- Month grid: 7×5 layout with weekday header; click a day to open the event modal.
- Event modal: create/update/delete events (title, description, label).
- Sidebar: small calendar, label filters.
- Header: Today/Prev/Next navigation.

## Data flow
- On load: fetch events from backend; localStorage is used as cache.
- Mutations: call backend first, then update context state.
