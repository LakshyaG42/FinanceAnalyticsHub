from django.urls import path
from .views import monte_carlo_simulation

urlpatterns = [
    path('montecarlo/', monte_carlo_simulation),
]