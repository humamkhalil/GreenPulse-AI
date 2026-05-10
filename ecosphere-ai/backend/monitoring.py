import time
import sentry_sdk
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from sentry_sdk.integrations.fastapi import FastApiIntegration

# Initialize Sentry for backend error tracking
def init_sentry():
    sentry_sdk.init(
        dsn="YOUR_SENTRY_DSN_HERE",
        integrations=[FastApiIntegration()],
        traces_sample_rate=1.0,  # Adjust in production
        profiles_sample_rate=1.0,
    )

class PerformanceMonitoringMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        response.headers["X-Process-Time"] = str(process_time)
        
        # Here you would log to Datadog, Prometheus, etc.
        # print(f"Method: {request.method} Path: {request.url.path} Time: {process_time:.4f}s")
        
        return response
