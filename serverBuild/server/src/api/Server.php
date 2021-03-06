<?php
header('Content-Type: application/json');
require '../../vendor/autoload.php';
if (isset($_SERVER['REQUEST_METHOD'])) {
    if ($_SERVER['HTTP_USER_AGENT'] == 'GuzzleHttp/7') {
        $dbConn = new \SQLite3("../../tests/dbForTesting2.db");
    } else {
        $dbConn = new \SQLite3("../db_V3.db");
    }
}

$msg = "Invalid endpoint.";
if (isset($_GET['url'])) {
    $var = $_GET['url'];
    $value = "undefined";
    $number = strval(preg_replace('/[^0-9]+\//', '', $var));
    switch ($var) {
        case "bookableLessons/$number":
            $value = "bookableLessons";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "waitingLessons/$number":
            $value = "waitingLessons";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "insertLecture":
            $value = "insertLecture";
            $controller = new Server\api\ControllersStudentBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "students":
            $value = "students";
            $controller = new Server\api\ControllersUser($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "studentBookings/$number":
            $value = "studentBookings";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "updateBooking/$number":
            $value = "updateBooking";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "updateSchedule/$number":
            if ($_SERVER['REQUEST_METHOD'] != "OPTIONS") {
                $value = "updateSchedule";
                $id = $number;
                $controller = new Server\api\ControllersTeacherBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value);
                echo $controller->processRequest();
                $gatewayNotification = new Server\api\GatewaysNotification($dbConn);
                $gatewayNotification->sendEmail('lectureScheduleChange', $id);
            }
            break;
        case "bookedStudentsForLecture/$number":
            $value = "bookedStudentsForLecture";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "scheduledLecturesForTeacher/$number":
            $value = "scheduledLecturesForTeacher";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "sendNotification":
            $value = "sendNotification";
            $controller = new Server\api\ControllersNotification($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "courses":
            $value = "courses";
            $controller = new Server\api\ControllersCourse($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "classrooms":
            $value = "classrooms";
            $controller = new Server\api\ControllersCourse($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "studentCourses/$number":
            $value = "studentCourses";
            $id = $number;
            $controller = new Server\api\ControllersStudentCourse($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "teacherCourses/$number":
            $value = "teacherCourses";
            $id = $number;
            $controller = new Server\api\ControllersTeacherCourse($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "lecturesWithFullRoom/$number":
            $value = "lecturesWithFullRoom";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "deleteLecture/$number":
            if ($_SERVER['REQUEST_METHOD'] != "OPTIONS") {
                $value = "deleteLecture";
                $id = $number;
                $controller = new Server\api\ControllersTeacherBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
                echo $controller->processRequest();
                $gatewayNotification = new Server\api\GatewaysNotification($dbConn);
                $gatewayNotification->sendEmail('lectureCancelled', $id);
            }
            break;
        case "changeToOnline/$number":
            $value = "changeToOnline";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "changeToOnlineByYear/$number":
            $value = "changeToOnlineByYear";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "changeToPresenceByYear/$number":
            $value = "changeToPresenceByYear";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $id);
            echo $controller->processRequest();
            break;
        case "bookingStatistics":
            $value = "bookingStatistics";
            $filterCourse = $_GET['filterCourse'];
            $filterTime = $_GET['filterTime'] == "" ? "L.idLesson" : $_GET['filterTime'];
            $active = !(isset($_GET['type'])) || $_GET['type'] == "" ? "1" : $_GET['type'];
            $isAttendanceStats = !(isset($_GET['isAttendance'])) || $_GET['isAttendance'] == "" ? "0" : $_GET['isAttendance'];
            $controller = new Server\api\ControllersHistoricalData($_SERVER['REQUEST_METHOD'], $dbConn, $value, $filterTime, $filterCourse, $active, -1, $isAttendanceStats);
            echo $controller->processRequest();
            break;
        case "teacherStatistics/$number":
            $value = "teacherStatistics";
            $idTeacher = $number;
            $filterCourse = $_GET['filterCourse'];
            $filterTime = $_GET['filterTime'] == "" ? "L.idLesson" : $_GET['filterTime'];
            $active = !(isset($_GET['type'])) || $_GET['type'] == "" ? "1" : $_GET['type'];
            $isAttendanceStats = !(isset($_GET['isAttendance'])) || $_GET['isAttendance'] == "" ? "0" : $_GET['isAttendance'];
            $controller = new Server\api\ControllersHistoricalData($_SERVER['REQUEST_METHOD'], $dbConn, $value, $filterTime, $filterCourse, $active, $idTeacher, $isAttendanceStats);
            echo $controller->processRequest();
            break;
        case "setUpCourses":
            $value = "setUpCourses";
            $controller = new Server\api\ControllersSupportOfficer($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "setUpStudents":
            $value = "setUpStudents";
            $controller = new Server\api\ControllersSupportOfficer($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "setUpProfessors":
            $value = "setUpProfessors";
            $controller = new Server\api\ControllersSupportOfficer($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "setUpEnrollment":
            $value = "setUpEnrollment";
            $controller = new Server\api\ControllersSupportOfficer($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "setUpLessons":
            $value = "setUpLessons";
            $controller = new Server\api\ControllersSupportOfficer($_SERVER['REQUEST_METHOD'], $dbConn, $value);
            echo $controller->processRequest();
            break;
        case "findStudentContacts/$number":
            $value = "findStudentContacts";
            $idStudent = $number;
            $controller = new Server\api\ControllersReportTracing($_SERVER['REQUEST_METHOD'], $dbConn, $value, $idStudent);
            echo $controller->processRequest();
            break;
        case "recordStudentPresence/$number":
            $value = "recordStudentPresence";
            $idBooking = $number;
            $controller = new Server\api\ControllersTeacherBooking($_SERVER['REQUEST_METHOD'], $dbConn, $value, $idBooking);
            echo $controller->processRequest();
            break;
        case "findGeneralSchedule/$number":
            $value = 'findGeneralSchedule';
            $idCourse = $number;
            $controller = new Server\api\ControllersSupportOfficer($_SERVER['REQUEST_METHOD'], $dbConn, $value, $idCourse);
            echo $controller->processRequest();
            break;
        default:
            echo $msg;
    }
}
