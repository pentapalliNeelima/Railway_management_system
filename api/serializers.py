
from rest_framework import serializers
from .models import User, Train, Booking, SeatAvailability

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class SeatAvailabilitySerializer(serializers.ModelSerializer):
    train_name = serializers.CharField(source='train.train_name', read_only=True)

    class Meta:
        model = SeatAvailability
        fields = ['train', 'train_name', 'date', 'available_seats']