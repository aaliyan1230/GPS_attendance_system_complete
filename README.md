# GPS-Attendence-System

#### A gps attendance system with backend implemented with Django web framework and frontend on React.js(mantine).

The user of a system can have multiple events each of which can have multiple slots.

There are two intended users of the application: Attendee and Organizer

An attendee can use the system to check their attendance ratio in a event, and mark the attendance when a slot is open.

An organizer can use it to see all the participants of an event, which attendees marked present at a slot, the ratio of all the attendees of an event, and option to manually mark the attendance of an attendee.

All the other information of an event and its slots are managed from the django admin panel.

Googles's Geolocation API has been used to retrieve the coordinates, only when an attendee is within specified oundary range of the organizer, it isthen the attendance is accepted or else rejected. 

#### User Interface:
![Login Page](https://user-images.githubusercontent.com/72091404/187738258-5cb4d9a4-7330-4938-91a4-535ca721f0d0.png)
![Attendee Events](https://user-images.githubusercontent.com/72091404/187738356-a74d81cd-7689-4387-a5a8-1db19ad28212.png)
![Screenshot (13)](https://user-images.githubusercontent.com/72091404/187738447-e3075982-377a-4854-a2e1-4cc7080a01bd.png)
![Screenshot (14)](https://user-images.githubusercontent.com/72091404/187738553-cad5b359-6e00-4820-832a-7719598e91d6.png)
![Screenshot (15)](https://user-images.githubusercontent.com/72091404/187738567-81a78347-7490-488c-b283-b680d3644f11.png)
![Screenshot (16)](https://user-images.githubusercontent.com/72091404/187738583-1029b1da-49e4-4d0e-929f-e52523622573.png)
![Screenshot (17)](https://user-images.githubusercontent.com/72091404/187738598-07cee87d-3051-45fa-8341-cf7e3c138ff9.png)
![Screenshot (18)](https://user-images.githubusercontent.com/72091404/187738617-ecfcd3d3-a20d-497d-ac02-c3bba0a7ec60.png)

#### EERD:
![image](https://user-images.githubusercontent.com/73843030/189599861-d5a9003d-e364-4232-a1b9-de17a7de6a87.png)
