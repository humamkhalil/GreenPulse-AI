# GreenPulse AI Deployment & Monitoring

## 1. Local Development (Docker)
1. Ensure Docker Desktop is running.
2. At the root of the project, run: `docker-compose up --build -d`
3. Backend will be available on `http://localhost:8000` and Frontend on `http://localhost:3000`.
4. PostgreSQL and Redis will automatically start in the background.

## 2. Deploying Backend to Railway
1. Install Railway CLI: `npm i -g @railway/cli`
2. Run `railway login`
3. Navigate to the `backend` folder and run `railway init`
4. Add **PostgreSQL** and **Redis** plugins via the Railway Dashboard.
5. Map the Railway Environment Variables (e.g., `DATABASE_URL`, `REDIS_URL`) to your backend deployment.
6. The provided `railway.toml` handles the build steps, health checks, and auto-scaling configurations.
7. Run `railway up` to deploy.

## 3. Deploying Frontend to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login`
3. Navigate to the `frontend` folder.
4. Run `vercel` for a preview deployment, or `vercel --prod` for production.
5. In the Vercel dashboard, set `NEXT_PUBLIC_API_URL` to your live Railway backend URL.
6. `vercel.json` provides the required Next.js deployment configuration and security headers.

## 4. CI/CD (GitHub Actions)
- The pipeline in `.github/workflows/deploy.yml` triggers automatically on pushes to `main`.
- It tests both the backend and frontend concurrently.
- If successful, it handles automated deploys to Railway and Vercel.
- **Action Required**: Add the following secrets to your GitHub repository:
  - `RAILWAY_TOKEN`
  - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
  - `SLACK_WEBHOOK` (For Slack notifications).

## 5. Monitoring & Alerting (Sentry)
1. **Backend**: Import and call `init_sentry()` inside `main.py` before defining the FastAPI app. Ensure `PerformanceMonitoringMiddleware` is added (`app.add_middleware(PerformanceMonitoringMiddleware)`).
2. **Frontend**: Call `initFrontendMonitoring()` in your `_app.tsx` or `layout.tsx` to enable error tracking and session replays.
3. **Alerts**: In the Sentry dashboard, create a new Alert Rule: `If Error Rate > 5% in 5 minutes -> Trigger Slack / Email notification`.
