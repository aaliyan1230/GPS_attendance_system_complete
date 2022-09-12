from email.mime import base
from django.urls import include, path, re_path
from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers
from . import views

# router=routers.DefaultRouter()
# router.register('user', views.Event_List, basename='user' )

# event_router=routers.NestedDefaultRouter(router,'user', lookup='user')
# event_router.register('events', views.Event_Detail, basename='user-events')

# slot_router=routers.NestedDefaultRouter(event_router, 'events', lookup='user-events')
# slot_router.register('slots', views.Slot_List, basename='event-slots')
# slot_router.register('slots', views.Slot_details, basename='event-slot-details')

# post_attendance_router=routers.NestedDefaultRouter(slot_router, 'post', lookup='event-slot-details')
# post_attendance_router.register('post', views.MarkAttendance, basename='slot-post')

# start_attendance_router=routers.NestedDefaultRouter(slot_router, 'start', lookup='event-slot-details')
# start_attendance_router.register('start', views.StartAttendance, basename='slot-start')

# attendance_router=routers.NestedDefaultRouter(slot_router, 'table', lookup='event-slot-details')
# attendance_router.register('table', views.Attendance_Table, basename='slot-table')


# urlpatterns = router.urls + event_router.urls + slot_router.urls + post_attendance_router.urls + start_attendance_router.urls + attendance_router.urls



urlpatterns=[
# Get list of events in a user
re_path(r'^user/(?P<user_pk>\d+)/events/?$', views.Event_List.as_view(), name='user-event-list'),
# re_pathet details of a event in events
re_path(r'^user/(?P<user_pk>\d+)/events/(?P<events_pk>\d+)/?$', views.Event_Detail.as_view(), name='user-event-detail'),
# re_pathet list of slots of an event
re_path(r'^user/(?P<user_pk>\d+)/events/(?P<events_pk>\d+)/slots/?$', views.Slot_List.as_view(), name='user-event-slots'),
# re_pathet slot details of a slot
re_path(r'^user/(?P<user_pk>\d+)/events/(?P<events_pk>\d+)/slots/(?P<slot_pk>\d+)/?$', views.Slot_details.as_view(), name='event-slot-details'),
# re_pathost attendance at a slot
re_path(r'^user/(?P<user_pk>\d+)/events/(?P<events_pk>\d+)/slots/(?P<slot_pk>\d+)/post/?$', views.MarkAttendance.as_view(), name='user-slot-attendance'),
# re_pathost organizer coordinates for a slot
re_path(r'^user/(?P<user_pk>\d+)/events/(?P<events_pk>\d+)/slots/(?P<slot_pk>\d+)/start/?$', views.StartAttendance.as_view(), name='organizer-slot-start'),
# re_pathttendance table for a slot
re_path(r'^user/(?P<user_pk>\d+)/events/(?P<events_pk>\d+)/slots/(?P<slot_pk>\d+)/table/?$', views.Attendance_Table.as_view(), name='event-slot-attendance'),
# leaves of an attendee user
re_path(r'^user/(?P<user_pk>\d+)/leaves/?$', views.LeaveViewsList.as_view(), name='leave-list-add'),
# post a new leave
re_path(r'^user/(?P<user_pk>\d+)/events/(?P<events_pk>\d+)/slots/(?P<slot_pk>\d+)/leave/?$', views.LeaveViews.as_view(), name='slot-leave-add'),
#re_path(r'^user/(?P<user_pk>\d+)/leaves/?$', views.LeaveViewSet.as_view({'post': 'post'}), name='user-leave-created'),
path('message/', views.MessageFormViewSet.as_view(), name='contact-messages'),

]




# leave_router=SimpleRouter()
# leave_router.register('leaves', views.LeaveViewSet, basename='leave')

# urlpatterns = [
#     #events/id/slots
#     path('events/<int:id>', views.Event_List.as_view()),
#     path('event/<int:id>/', views.Event_Detail.as_view()),
#     path('slots/<int:id>', views.Slot_List.as_view(), name='Slot_List'),
#     path('slot/<int:id>', views.Slot_details.as_view()),
#     path('join/<int:id>', views.Join_Event.as_view()),
#     path('post/', views.MarkAttendance.as_view()),
#     path('attendance_table/<int:id>', views.Attendance_Table.as_view()),#attendance at slot id
#     path('', include(leave_router.urls))
# ]