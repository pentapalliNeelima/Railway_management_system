
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db import transaction
from .models import User, Train, Booking, SeatAvailability
from .serializers import UserSerializer, TrainSerializer, BookingSerializer, SeatAvailabilitySerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class TrainViewSet(viewsets.ModelViewSet):
    queryset = Train.objects.all()
    serializer_class = TrainSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['post'])
    def create_train(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def booking_details(self, request, pk=None):
        try:
            booking = self.get_object()
            if booking.user != request.user:
                return Response({"error": "You are not authorized to view this booking."}, status=status.HTTP_403_FORBIDDEN)
            return Response(BookingSerializer(booking).data, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=False, methods=['post'])
    def book_seat(self, request):
        train_id = request.data.get('train_id')
        date = request.data.get('date')

        if not train_id or not date:
            return Response({"error": "Train ID and date are required"}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            availability = SeatAvailability.objects.select_for_update().get(train_id=train_id, date=date)
            if availability.available_seats > 0:
                booking = Booking.objects.create(
                    user=request.user,
                    train_id=train_id,
                    seat_number=availability.train.total_seats - availability.available_seats + 1
                )
                availability.available_seats -= 1
                availability.save()
                return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "No seats available"}, status=status.HTTP_400_BAD_REQUEST)

class SeatAvailabilityViewSet(viewsets.ModelViewSet):
    queryset = SeatAvailability.objects.all()
    serializer_class = SeatAvailabilitySerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def check_availability(self, request):
        source = request.query_params.get('source')
        destination = request.query_params.get('destination')
        date = request.query_params.get('date')

        if not all([source, destination, date]):
            return Response({"error": "Source, destination, and date are required"}, status=status.HTTP_400_BAD_REQUEST)

        
        trains = Train.objects.filter(source=source, destination=destination)
        availabilities = SeatAvailability.objects.filter(train__in=trains, date=date)

        return Response(SeatAvailabilitySerializer(availabilities, many=True).data)