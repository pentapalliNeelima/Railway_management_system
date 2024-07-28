from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrainViewSet,SeatAvailabilityViewSet, UserViewSet, TrainViewSet, BookingViewSet, SeatAvailabilityViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'trains', TrainViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'seat-availabilities', SeatAvailabilityViewSet)

urlpatterns = [
    path('', include(router.urls)),
]