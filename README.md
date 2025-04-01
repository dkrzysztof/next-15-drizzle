## Startin app

Use docker compose to start production app. 

```bash
docker compose up --build
```

Or use native npm, but it requires running postgres

```
npm i 
cp .env.example .env
npm run dev
```
