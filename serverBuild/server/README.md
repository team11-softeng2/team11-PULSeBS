# REST API Doc

Each endpoint is preceded by /server/src/api/

## Users

- POST `/login`
  - Body: { "username", "password" }
  - Response:

## Lectures

- GET `/bookableLessons/studentId`
  _ Params: studentId
  _ respose
  exemples :

1. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"}]
2. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"},{"name":"Sistemi Operativi","date":"2020-11-20","beginTime":"14","endTime":"16:00:00"}]
3. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"},{"name":"Geometria","date":"2020-11-17","beginTime":"14:00:00","endTime":"16:00:00"},{"name":"Geometria","date":"2020-11-18","beginTime":"14:00:00","endTime":"16:00:00"}]

## Bookings

- GET `/studentBookings/:studentId`
  - Params: studentId
  - Response: List of bookings of a student
- GET `/bookedStudentsForLecture/:lectureId`
  - Params: lectureId
  - response: List of student booked for that lecture
- DELETE `/cancelBooking/:bookingId`
  - Params: bookingId
  - Response: NONE
- POST `/insertLecture`
  - Body: { "idUser", "idLesson", "date" }
  - Response: return the new booking id
- PUT `/updateBooking/bookingId`
  - Params: bookingId
  - Response: rows modified (should be always one)

## Notifications

- POST `/sendNotification`

  - Body: { "id":"_value_", "type":"_value_"}
    When _type_ is **studentsAttendingNextLecture**, _id_ is discarded;
    When _type_ is **bookingConfirmation** _id_ is the ID of the booking;
    When _type_ is **lectureCancelled**, _id_ is the ID of the lecture;
    When _type_ is **takenFromWaitingList**, _id_ is the ID of the booking;
    When _type_ is **lectureScheduleChange**, _id_ is the ID of the lecture;

  - Response: number of notifications sent

# DB structure

- Classroom ( <u>idClassRoom</u>, totalSeats )

- Booking ( <u>idBooking</u>, idUser, idLesson, active, date, isWaiting )

- Courses ( <u>idCourse</u>, idTeacher, name )

- Enrollment ( <u>idEnrollment</u>, idUser, idCourse )

- Lessons ( <u>idLesson</u>, idCourse, idTeacher, idClassRoom, date, beginTime, endTime, inPresence, active)

- Users ( <u>idUser</u>, userName, password, role, name, email)
