from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

    
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_(
            'The groups this user belongs to. A user will get all permissions '
            'granted to each of their groups.'
        ),
        related_name="custom_user_set",
        related_query_name="custom_user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="custom_user_set",
        related_query_name="custom_user",
    )

class Train(models.Model):
    train_id = models.CharField(max_length=20, unique=True)
    train_name = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    total_seats = models.IntegerField()

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    seat_number = models.IntegerField()

class SeatAvailability(models.Model):
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    date = models.DateField()
    available_seats = models.IntegerField()

    class Meta:
        unique_together = ('train', 'date')