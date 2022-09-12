from asyncio import events
from multiprocessing import Event
from unicodedata import name
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from djoser.serializers import UserSerializer as BaseUserSerializer
import geopy.distance

from attendance_database.models import Attendee, Attendee_Event_Relation, Coordinates, Leave, MessageForm, Organizer, Present, Slot, Event

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields=['id', 'username', 'email', 'is_staff']


class EventSerializer(serializers.Serializer):
    # class Meta:
    #     model=Event
    #     fields=['id', 'name', 'description', 'organizer', 'attendee_count']
    id=serializers.IntegerField()
    name=serializers.CharField(max_length=15)
    description=serializers.CharField()
    organizer=serializers.StringRelatedField()
    attendee_count=serializers.SerializerMethodField(method_name='Attendee_count')
    # slots=serializers.HyperlinkedRelatedField(
    #     read_only=True,
    #     view_name='Slot_List'
    # )

    def Attendee_count(self, id):
        attendee_list=Attendee_Event_Relation.objects.filter(event=id)
        return len(attendee_list)

    # def Event_slots(self, event: Event):
    #     Slots=Slot.objects.filter(event=event.id)
    #     return serializers.HyperlinkedRelatedField(queryset=Slots, view_name='Event_List')


    #attendees=serializers.IntegerField()
    #models.ForeignKey(to=Attendee, on_delete=models.CASCADE)

class Attendee_Event_Relation_Serializer(serializers.Serializer):
    event=EventSerializer()


class SlotSerializerPure(serializers.ModelSerializer):
    class Meta:
        model=Slot
        fields=['event', 'boundary']

class EventSerializerPure(serializers.ModelSerializer):
    class Meta:
        model=Event
        fields=["organizer"]



class Slot_Serializer(serializers.Serializer):
#    date start_time end_time credit_hours update(boundary timer)
    event=serializers.StringRelatedField(read_only=True)
    #eventname=serializers.SerializerMethodField(method_name='event_name')
    date=serializers.DateField()
    start_time=serializers.TimeField()
    end_time=serializers.TimeField()
    credit_hours=serializers.IntegerField()
    timer=serializers.IntegerField()
    boundary=serializers.IntegerField()

    # def event_name(self):
    #     evnt=get_object_or_404(Event, self.event)
    #     evnt=EventSerializer(evnt)
    #     return evnt.name


class Present_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Present
        fields=['slot', 'attendee', 'present', 'distance']
    
    # distance=serializers.SerializerMethodField(method_name='distancee', read_only=True)
    # def distancee(self, present: Present):
    #     att=Coordinates.objects.filter(slot=present.slot, attendee=present.attendee)
    #     att=Coordinates_Serializer_Attendee(att)
    #     d=att.data.get('distance')
    #     #b=serializers.IntegerField(source='slot.boundary')
    #     return d
    


class Coordinates_Serializer_Attendee_Post(serializers.ModelSerializer):
    class Meta:
        model=Coordinates
        fields=['latitude', 'longitude', 'attendee', 'slot']


class Coordinates_Serializer_Organizer(serializers.ModelSerializer):
    class Meta:
        model=Coordinates
        fields=['latitude', 'longitude', 'organizer', 'slot']

class Coordinates_Serializer_Attendee(serializers.Serializer):
    #distance=serializers.SerializerMethodField(method_name='distance_from_organizer')
    attendee=serializers.PrimaryKeyRelatedField(queryset=Attendee.objects.all())
    slot=serializers.PrimaryKeyRelatedField(queryset=Slot.objects.all())

    # def distance_from_organizer(self, coord: Coordinates):
    #     # slt=get_object_or_404(Slot, self.slot)
    #     # slt=Slot_Serializer(slt)
    #     # org=Event.objects.filter(name=slt.event)
    #     # org=EventSerializer(org)
    #     # org=org.organizer
    #     # org=get_object_or_404(Organizer, org)
    #     organizer = serializers.IntegerField(source='slot.event.organizer')
    #     org_coordinates=Coordinates.objects.filter(slot=coord.slot, organizer=organizer)
    #     org_coordinates=Coordinates_Serializer_Organizer(org_coordinates)
    #     org_lat=org_coordinates.latitude
    #     org_long=org_coordinates.longitude
    #     coords_1 = (org_lat, org_long)
    #     coords_2 = (coord.latitude, coord.longitude)
    #     distance=geopy.distance.geodesic(coords_1, coords_2).km
    #     distance=distance*1000
    #     return distance



class AttendeeAttendanceRatio(serializers.Serializer):
    
    pass

#attendance table


class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model=Leave
        fields=('leave_from', 'leave_days', 'attendee', 'slot')
    slot=serializers.StringRelatedField(read_only=True)
    attendee=serializers.StringRelatedField(read_only=True)

class LeaveSerializerPost(serializers.ModelSerializer):
    class Meta:
        model=Leave
        fields=('leave_from', 'leave_days', 'attendee', 'slot')


class MessageFormSerializer(serializers.ModelSerializer):
    class Meta:
        model=MessageForm
        fields=['name', 'email', 'message']