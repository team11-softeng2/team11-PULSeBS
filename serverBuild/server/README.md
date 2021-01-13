# REST API Doc

Each endpoint is preceded by /server/src/api/

## Users

- POST `/login`

  - Body: { "username", "password" }
  - Response:

- GET `/students`

  - Response: List of all the students registered in the system

## Lectures

- GET `/scheduledLecturesForTeacher/:teacherId`

  - Params: teacherId
  - Response: List of scheduled (presence) lectures given by a teacher and number of students currently booked

  - Results Examples:

1. [{"idLesson":3,"idCourse":2,"idTeacher":2,"idClassroom":5,"date":"2020-11-18","beginTime":"09:00:00","endTime":"11:00:00","inPresence":1,"active":1,"studentsNumber":4},{"idLesson":6,"idCourse":3,"idTeacher":2,"idClassroom":5,"date":"2020-11-20","beginTime":"14:00:00","endTime":"16:00:00","inPresence":1,"active":1,"studentsNumber":2}]
2. [{"idLesson":11,"idCourse":6,"idTeacher":13,"idClassroom":2,"date":"2020-11-20","beginTime":"09:00:00","endTime":"11:00:00","inPresence":1,"active":1,"studentsNumber":2}]

- GET `/bookableLessons/:studentId`

  - Params: studentId
  - Response: List of lessons that can be booked by a student

  - Result Examples :

1. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"}]
2. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"},{"name":"Sistemi Operativi","date":"2020-11-20","beginTime":"14","endTime":"16:00:00"}]
3. [{"name":"Algebra","date":"2020-11-15","beginTime":"11:00:00","endTime":"13:00:00"},{"name":"Geometria","date":"2020-11-17","beginTime":"14:00:00","endTime":"16:00:00"},{"name":"Geometria","date":"2020-11-18","beginTime":"14:00:00","endTime":"16:00:00"}]

- GET `/lecturesWithFullRoom/:studentId`

  - Params: studentId
  - Response: List of lectures of the student that have the classroom full

- PUT `/updateSchedule`

  - Body: { "idLesson", "idClassroom", "date", "beginTime", "endTime" }
  - Response: returns the <b>idLesson</b> just modified on success, <b>0</b> if there was no lesson with the given id or on failure

- Body Examples :

1. {"idLesson":"0", "idClassroom":"5", "date":"2020-01-13", "beginTime":"08:30", "endTime":"20:30"}
2. {"idLesson":"877", "idClassroom":"3", "date":"2020-01-13", "beginTime":"08:30", "endTime":"20:30"}

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
  - Response: returns the new <b>:bookingId</b> on success, <b>0</b> on failure

- PUT `/updateBooking/:bookingId`

  - Params: bookingId
  - Response: returns the oldest <b>:bookingId</b> in the waiting list for that lecture on success, <b>0</b> if the waiting list was empty or on failure

- PUT `/deleteLecture/:lectureId`

  - Params: lectureId
  - Response: number of rows changed inside lesson table (should be always one)

- PUT `/changeToOnline/:lectureId`

  - Params: lectureId
  - Response: number of rows changed inside lesson table (should be always one)

- PUT `/changeToOnlineByYear/:year`

  - Params: year
  - Response: number of rows changed inside lesson table

- PUT `/changeToPresenceByYear/:year`

  - Params: year
  - Response: number of rows changed inside lesson table

- PUT `/recordStudentPresence/:idBooking`

  - Params: bookingId
  - Response: number of rows changed inside booking table
  - Result: flips (0 to 1 and viceversa) the `present` flag of the given bookingId

  ## Statistics

- GET `/bookingStatistics?filterTime=`{_value_}`&filterCourse=`{_value_}`&type=`{_value_}`&isAttendance=`{_value_}

  - Params:

    - {_value_} for filterTime key is either one of the following strings:

      - <b>idLesson</b> (stats by lecture);
      - <b>year,monthOfYear</b> (stats by month);
      - <b>year_month_week</b> (stats by week);

      If nothing is passed then the default value is idLesson
      Example: filterTime=year,monthOfYear

    - {_value_} for filterCourse key is a list of comma separated course ids.
      Example: filterCourse=1,2,5
    - {_value_} for type key is an optional parameter.
      If you want cancellation stats you need to set it to 0, otherwise defaults to 1 (ie. stats will be about active lectures).
    - {_value_} for isAttendance is optional parameter.
      If you want attendance stats you need to set it to 1, otherwise default to 0 (do not set type in the url)

  - Example urls:

    - bookings: `/bookingStatistics?filterTime=year,monthOfYear&filterCourse=1,2,3,4,5`
    - cancellation: `/bookingStatistics?filterTime=year,monthOfYear&filterCourse=1,2,3,4,5&type=0`
    - attendance: `/bookingStatistics?filterTime=year,monthOfYear&filterCourse=L.idCourse&isAttendance=1`

  - Response: statistics list of bookings filtered by filterTime and filterCourse

- GET `/teacherStatistics/:teacherId?filterTime=`{_value_}`&filterCourse=`{_value_}`&type=`{_value_}`&isAttendance=`{_value_}

  - Params:

    - teacherId
    - {_value_} for filterTime key is either one of the following strings:

      - <b>idLesson</b> (stats by lecture);
      - <b>year,monthOfYear</b> (stats by month);
      - <b>year_month_week</b> (stats by week);

      If nothing is passed then the default value is idLesson
      Example: filterTime=year,monthOfYear

    - {_value_} for filterCourse key is a list of comma separated course ids.
      Example: filterCourse=1,2,5
    - {_value_} for type key is an optional parameter.
      If you want cancellation stats you need to set it to 0, otherwise defaults to 1 (ie. stats will be about active lectures).
      - {_value_} for isAttendance is optional parameter.
        If you want attendance stats you need to set it to 1, otherwise default to 0 (do not set type in the url)

  - Example urls:

    - bookings: `/teacherStatistics/2?filterTime=year,monthOfYear&filterCourse=1,2,3,4,5`
    - cancellation: `/teacherStatistics/:teacherId?filterTime=year,monthOfYear&filterCourse=1,2,3,4,5&type=0`
    - attendance: `/teacherStatistics/d9001?filterTime=year,monthOfYear&filterCourse=L.idCourse&isAttendance=1`

  - Response: statistics list of bookings for the given teacher, filtered by filterTime and filterCourse

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
  - Body Options:
    When _type_ is **studentsAttendingNextLecture**, _id_ is discarded;
    When _type_ is **bookingConfirmation** _id_ is the ID of the booking;
    When _type_ is **lectureCancelled**, _id_ is the ID of the lecture;
    When _type_ is **takenFromWaitingList**, _id_ is the ID of the booking;
    When _type_ is **lectureScheduleChange**, _id_ is the ID of the lecture;

  - Response: number of notifications sent

## Support Officer

- POST `/setUpCourses`
  - Body: parsed CSV of Courses into JSON
  - Response: return 1 or 0 (errors)
- POST `/setUpStudents`
  - Body: parsed CSV of Students into JSON
    - Response: return 1 or 0 (errors)
- POST `/setUpProfessors`
  - Body: parsed CSV of Professors into JSON
  - Response: return 1 or 0 (errors)
- POST `/setUpEnrollment`
  - Body: parsed CSV of Enrollments into JSON
  - Response: return 1 or 0 (errors)
- POST `/setUpLessons`
  - Body: parsed CSV of Schedule into JSON
  - Response: return 1 or 0 (errors)

## Report Tracing

- GET `/findStudentContacts/:studentID`
  - Response: list of students and teacher that met the studentID or 0 if nothing is found

# DB structure

- Classroom ( <u>idClassRoom</u>, totalSeats )

- Booking ( <u>idBooking</u>, idUser, idLesson, active, date, isWaiting )

- Courses ( <u>idCourse</u>, idTeacher, name )

- Enrollment ( <u>idEnrollment</u>, idUser, idCourse )

- Lessons ( <u>idLesson</u>, idCourse, idTeacher, idClassRoom, date, beginTime, endTime, inPresence, active)

- Users ( <u>idUser</u>, userName, password, role, name, email)
