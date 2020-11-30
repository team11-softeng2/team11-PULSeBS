# REST API Doc

Each endpoint is preceded by /server/src/api/

## Users

- POST `/login`

  - Body: { "username", "password" }
  - Response:

## Lectures

- GET `/scheduledLecturesForTeacher/:teacherId`

  - Params: teacherId
  - response: List of scheduled (presence) lectures given by a teacher and number of students currently booked

  Examples:

1. [{"idLesson":3,"idCourse":2,"idTeacher":2,"idClassroom":5,"date":"2020-11-18","beginTime":"09:00:00","endTime":"11:00:00","inPresence":1,"active":1,"studentsNumber":4},{"idLesson":6,"idCourse":3,"idTeacher":2,"idClassroom":5,"date":"2020-11-20","beginTime":"14:00:00","endTime":"16:00:00","inPresence":1,"active":1,"studentsNumber":2}]
2. [{"idLesson":11,"idCourse":6,"idTeacher":13,"idClassroom":2,"date":"2020-11-20","beginTime":"09:00:00","endTime":"11:00:00","inPresence":1,"active":1,"studentsNumber":2}]

- GET `/bookableLessons/:studentId`

  - Params: studentId
  - Response: List of lessons that can be booked by a student

  Examples :

1. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"}]
2. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"},{"name":"Sistemi Operativi","date":"2020-11-20","beginTime":"14","endTime":"16:00:00"}]
3. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"},{"name":"Geometria","date":"2020-11-17","beginTime":"14:00:00","endTime":"16:00:00"},{"name":"Geometria","date":"2020-11-18","beginTime":"14:00:00","endTime":"16:00:00"}]

- GET `/lecturesWithFullRoom/:studentId`
  - Params: studentId
  - Response: List of lectures of the student that have the classroom full

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

- PUT `/updateBooking/:bookingId`

  - Params: bookingId
  - Response: rows modified (should be always one)

- PUT `/deleteLecture/:lectureId`

  - Params: lectureId
  - Response: number of rows changed inside lesson table(should be always one)

- PUT `/changeToOnline/:lectureId`

  - Params: lectureId
  - Response: number of rows changed inside lesson table(should be always one)

  ## Statistics

- GET `/bookingStatistics?filterTime=&filterCourse=`

  - Params:
    - filterTime: string that could be idLesson (per lecture), year,monthOfYear(per month) or year_month_week(per week). If nothing is passed then the default value is idLesson
      - Example: filterTime=year,monthOfYear (the comma is not an error)
    - filterCourse: string made by course id separed by comma
      - Example: filterCourse=1,2,5
    - Example urls: `/bookingStatistics?filterTime=year,monthOfYear&filterCourse=1,2,3,4,5`
  - Response: statistics list of bookings filtered by filterTime and filterCourse

  ## Courses

- GET `/courses`

  - Response: list of all courses in the booking system

- GET `/studentCourses/:studentId`

  - Params: studentId
  - Response: List of courses attended by a student

- GET `/teacherCourses/:teacherId`

  - Params: teacherId
  - Response: List of teacher's courses

## Notifications

- POST `/sendNotification`

  - Body: { "id":"_value_", "type":"_value_"}
    Info:
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
