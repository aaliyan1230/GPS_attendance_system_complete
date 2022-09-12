from unicodedata import name
from django.shortcuts import get_object_or_404
from django.http import Http404, HttpResponse
from requests import request
from .models import Attendee, Attendee_Event_Relation, Coordinates, Event, MessageForm, Organizer, Present, Slot, Leave, User 
from .serializers import Coordinates_Serializer_Attendee, Coordinates_Serializer_Attendee_Post, Coordinates_Serializer_Organizer, EventSerializer, EventSerializerPure, LeaveSerializer, LeaveSerializerPost, MessageFormSerializer, Present_Serializer, Slot_Serializer, Attendee_Event_Relation_Serializer, SlotSerializerPure
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import serializers
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
import geopy.distance
from attendance_database import serializers


class Slot_List(APIView):
    #event id
    def get(self, request, *args, **kwargs):
        id=self.kwargs.get("events_pk")
        queryset=Slot.objects.filter(event=id)
        serializer=Slot_Serializer(queryset, many=True)
        return Response(serializer.data)


class Event_List(APIView):
    def get(self, request, *args, **kwargs):
        id=self.kwargs.get("user_pk")
        queryset=Attendee_Event_Relation.objects.filter(attendee=id)
        if(len(queryset)==0):
            queryset=Event.objects.filter(organizer=id)
            serializer=EventSerializer(queryset, many=True)
            return Response(serializer.data)

        #print(dir(queryset))
        serializer=Attendee_Event_Relation_Serializer(queryset, many=True)
        return Response(serializer.data)

class Slot_details(APIView):
    #slot id
    def get(self, request, *args, **kwargs):
        id=self.kwargs.get("slot_pk")
        slot=get_object_or_404(Slot, pk=id)
        serializer=Slot_Serializer(slot)
        return Response(serializer.data)

    def post(self, request):
        serializer=Slot_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def put(self, request):
        id=self.kwargs.get("slot_pk")
        slot=get_object_or_404(Slot, pk=id)
        serializer=Slot_Serializer(slot, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class Join_Event(APIView):
    def post(self, request, id):
        event=get_object_or_404(Event, pk=id)
        at_ev_r=Attendee_Event_Relation()
        at_ev_r.event=event
        at_ev_r.attendee=self.request.user
        at_ev_r.save()
        




class Event_Detail(APIView):
    def get(self, request,*args, **kwargs):
        id=self.kwargs.get("events_pk")
        event=get_object_or_404(Event, pk=id)
        serializer=EventSerializer(event)
        return Response(serializer.data)


#attendance table has four attributes: attendee_username, present_status, distance(approx), time_marked_present(maybe auto_field?)
class Attendance_Table(APIView):
    def get(self, request, *args, **kwargs):
        queryset=Present.objects.filter(slot=self.kwargs.get("slot_pk"))
        serializer=Present_Serializer(queryset, many=True)
        return Response(serializer.data)
    # def post(self, request, id):
    #     serializer=Present_Serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    # def put(self, request, id):
    #     queryset=Present.objects.filter(slot=id)
    #     serializer=Present_Serializer(queryset, many=True)
    #     return Response(serializer.data)



class EventViewSet(ModelViewSet):
    queryset=Event.objects.all()
    serializer_class=EventSerializer

class StartAttendance(APIView):
    #organizer, lat, long, slot
    #coordinates(post)
    def post(self, request, *args, **kwargs):
        data = dict(request.data)
        data['slot'] = self.kwargs.get("slot_pk")
        data['organizer'] = self.kwargs.get("user_pk")
        serializer=Coordinates_Serializer_Organizer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()#slot=self.kwargs.get("slot_pk"), organizer=self.kwargs.get("user_pk"))
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class MarkAttendance(APIView):
    def post(self, request, *args, **kwargs):
        data = dict(request.data)
        data['slot'] = self.kwargs.get("slot_pk")
        data['attendee'] = self.kwargs.get("user_pk")
        if Coordinates.objects.filter(slot=data['slot'], attendee=data['attendee']).exists():
            serializer=Coordinates_Serializer_Attendee_Post(data=data)
        else:
            serializer=Coordinates_Serializer_Attendee_Post(data=data)
            print(data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        present_data=dict()
        present_data['slot'] = data['slot']
        present_data['attendee'] = data['attendee']
        #att=Coordinates.objects.filter(slot=self.kwargs.get("slot_pk"), attendee=self.kwargs.get("user_pk"))
        #att=Coordinates_Serializer_Attendee(att)
        #print(present_data)
        slot=Slot.objects.get(pk=present_data['slot'])
        slot=SlotSerializerPure(slot)
        event=slot.data.get("event")
        event=Event.objects.get(pk=event)
        event=EventSerializerPure(event)
        org=event.data.get("organizer")
        org_coordinates=Coordinates.objects.filter(slot=data['slot'], organizer=org)
        org_coordinates=org_coordinates.first()
        org_coordinates=Coordinates_Serializer_Organizer(org_coordinates)
        #print(org_coordinates)
        org_lat=org_coordinates.data.get('latitude')
        org_long=org_coordinates.data.get('longitude')
        coords_1 = (org_lat, org_long)
        coords_2 = (data.get('latitude'), data.get('longitude'))
        distance=geopy.distance.geodesic(coords_1, coords_2).km
        distance=distance*1000
        present_data['distance']=distance
        boundary=slot.data.get("boundary")
        if(distance>boundary):
            present_data["present"]=False
        else:
            present_data["present"]=True
        serializer1=Present_Serializer(data=present_data)
        #print(present_data)
        if Present.objects.filter(attendee=present_data["attendee"], slot=present_data["slot"]).exists():
            pass
        else:
            serializer1.is_valid(raise_exception=True)
            serializer1.save()

        entered_data={**serializer.data ,**serializer1.data}

        return Response(entered_data, status=status.HTTP_201_CREATED)

        
    #attendee, present, lat, long
    #coordinates(post), present(post)


class LeaveViewSet(ModelViewSet):
    def get_queryset(self, *args, **kwargs):
        return Leave.objects.filter(attendee=self.kwargs.get("user_pk"))

    serializer_class=LeaveSerializer    
    def create(self, request, *args, **kwargs):
        data=dict(request.data)
        data["attendee"]=self.kwargs.get("user_pk")
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LeaveViewsList(APIView):
    def get(self, request, *args, **kwargs):
        queryset=Leave.objects.filter(attendee=self.kwargs.get("user_pk"))
        serializer=LeaveSerializer(queryset, many=True)
        return Response(serializer.data)

class LeaveViews(APIView):
    def get(self, request, *args, **kwargs):
        queryset=Leave.objects.filter(attendee=self.kwargs.get("user_pk"), slot=self.kwargs.get("slot_pk"))
        serializer=LeaveSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request, *args, **kwargs):
        data=dict(request.data)
        data["attendee"]=self.kwargs.get("user_pk")
        data["slot"]=self.kwargs.get("slot_pk")
        slot=Slot_Serializer(get_object_or_404(Slot, data["slot"]))
        data["leave_from"]=slot.data.get("date")
        serializer=LeaveSerializerPost(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class MessageFormViewSet(APIView):
    permission_classes=[AllowAny]
    def get(self, request, *args, **kwargs):
        queryset=MessageForm.objects.all()
        serializer=MessageFormSerializer(queryset, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer=MessageFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# Create your views here.

