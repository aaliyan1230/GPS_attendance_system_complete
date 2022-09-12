# GPS_attendance_system
A gps attendance system with backend implemented on django and frontend on react.js


FRONTEND UPDATES:


pages to implement:


-a login/signup page

-a page with registered events/classes shown as tiles, an option at the bottom to join new event/classes through event_code, also can create new event/class and invite people as members

-branching out to teacher(admin) and student(member) interfaces on clicking any selected tile:

 -student- can see timer(if started) for the class, can press button to mark attendance(if timer is on) can see his prevous marked attendance(if any)
 
 -teacher- can start timer, select boundary range to accept attendance(10, 15, 20, 25 meters), view students who are marking present in realtime with approx distance    from the source(teacher), mark manual attendance of a student, reject any attendance, have an overall view of students attendance
 
 
 BACKEND UPDATES:
 
 implement a database and develop a REST api to integrate into the react frontend
