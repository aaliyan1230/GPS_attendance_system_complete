
from email import message
from pyexpat import model
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import DateTimeField
from django.conf import settings
# Create your models here.


class User(AbstractUser):
    email=models.EmailField(unique=True)

class Organizer(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    user.is_staff=True
    def __str__(self):
        return self.user.username

class Attendee(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    def __str__(self):
        return self.user.username

class Present(models.Model):
    class Meta:
        unique_together = (('attendee', 'slot'),)
    present=models.BooleanField(default=False)
    attendee=models.ForeignKey(Attendee, on_delete=models.CASCADE)#primary_key=True for one to one
    slot=models.ForeignKey(to='Slot', on_delete=models.CASCADE)
    distance=models.DecimalField(max_digits=12, decimal_places=2)
    def __str__(self):
        if(self.present==True):
            return f"{self.attendee.user.username} was present at {self.slot.event.name} {self.slot.credit_hours} on {self.slot.date}"
        else:
            return f"{self.attendee.user.username} was present at {self.slot.event.name} {self.slot.credit_hours} on {self.slot.date}"



class Event(models.Model):
    name=models.CharField(max_length=15)
    description=models.TextField()
    organizer=models.ForeignKey(to=Organizer, on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class Attendee_Event_Relation(models.Model):
    attendee=models.ForeignKey(to=Attendee, on_delete=models.CASCADE)
    event=models.ForeignKey(to=Event, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.attendee.user.username} at {self.event.name}"

class Slot(models.Model):
    date=models.DateField()
    start_time=models.TimeField()
    end_time=models.TimeField()
    credit_hours=models.DecimalField(max_digits=5, decimal_places=2)
    timer=models.IntegerField(null=True, blank=True)#in milliseconds
    boundary=models.IntegerField(null=True, blank=True)
    event=models.ForeignKey(to=Event, on_delete=models.CASCADE)    
    def __str__(self):
        return self.event.name + " "+ str(self.credit_hours)


class Coordinates(models.Model):
    class Meta:
        unique_together = (('attendee', 'slot'),('organizer', 'slot'))
    latitude=models.DecimalField(max_digits=12,decimal_places=10)
    longitude=models.DecimalField(max_digits=12,decimal_places=10)
    attendee=models.ForeignKey(to=Attendee, on_delete=models.CASCADE, null=True, blank=True)
    organizer=models.ForeignKey(to=Organizer, on_delete=models.CASCADE,null=True, blank=True)
    slot=models.ForeignKey(to=Slot, on_delete=models.CASCADE)
    def __str__(self):
        if self.attendee==None:
            return f"organizer: {self.organizer} in {self.slot} of {self.slot.event.name} at lat:{self.latitude} and long:{self.longitude}"
        else:
            return f"attendee: {self.attendee} in {self.slot} of {self.slot.event.name} at lat:{self.latitude} and long:{self.longitude}"


class Leave(models.Model):
    class Meta:
        unique_together = (('attendee', 'slot'),)
    leave_from=models.DateField()
    leave_days=models.IntegerField()
    attendee=models.ForeignKey(Attendee, on_delete=models.CASCADE)#primary_key=True for one to one
    slot=models.ForeignKey(to=Slot, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.attendee.user.username} absent from {self.slot.event} starting {self.leave_from} for {self.leave_days} days"



class MessageForm(models.Model):
    name=models.CharField(max_length=20)
    email=models.EmailField()
    message=models.TextField(max_length=500)
# slot and attendee combined will make our attendance table
