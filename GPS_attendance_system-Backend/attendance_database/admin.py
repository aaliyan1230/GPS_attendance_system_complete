from multiprocessing import Event
from django.contrib import admin

from .models import Attendee, Attendee_Event_Relation, Coordinates, Leave, Organizer, Present, Slot, User, Event

# Register your models here.

admin.site.register(User)

admin.site.register(Attendee)

admin.site.register(Organizer)

admin.site.register(Event)

admin.site.register(Attendee_Event_Relation)

admin.site.register(Slot)

admin.site.register(Leave)

admin.site.register(Coordinates)

admin.site.register(Present)



