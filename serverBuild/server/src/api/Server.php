<?php
header('Content-Type: application/json');
require '../../vendor/autoload.php';
if (isset($_SERVER['REQUEST_METHOD'])) {
    if ($_SERVER['HTTP_USER_AGENT'] == 'GuzzleHttp/7') {
        $dbConn = new \SQLite3("../../tests/dbForTesting2.db");
    } else {
        $dbConn = new \SQLite3("../db.db");
    }
}

$msg = "Invalid API!";
if (isset($_GET['url'])) {
    $var = $_GET['url'];
    $value = "undefined";
    $number = intval(preg_replace('/[^0-9]+/', '', $var));
    switch ($var) {
        case "bookableLessons/$number":
            $value = "bookableLessons";
            $requestMethod = "GET";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "insertLecture":
            $value = "insertLecture";
            $requestMethod = "POST";
            $controller = new Server\api\ControllersStudentBooking($requestMethod, $dbConn, $value);
            $controller->processRequest();
            break;
        case "studentBookings/$number":
            $value = "studentBookings";
            $requestMethod = "GET";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "updateBooking/$number":
            $value = "updateBooking";
            $requestMethod = "PUT";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "bookedStudentsForLecture/$number":
            $value = "bookedStudentsForLecture";
            $requestMethod = "GET";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "scheduledLecturesForTeacher/$number":
            $value = "scheduledLecturesForTeacher";
            $requestMethod = "GET";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "sendNotification":
            $value = "sendNotification";
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            $controller = new Server\api\ControllersNotification($requestMethod, $dbConn, $value);
            $controller->processRequest();
            break;
        case "courses":
            $value = "courses";
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            $controller = new Server\api\ControllersCourse($requestMethod, $dbConn, $value);
            $controller->processRequest();
            break;
        case "studentCourses/$number":
            $value = "studentCourses";
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            $id = $number;
            $controller = new Server\api\ControllersStudentCourse($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "teacherCourses/$number":
            $value = "teacherCourses";
            $requestMethod = $_SERVER['REQUEST_METHOD'];
            $id = $number;
            $controller = new Server\api\ControllersTeacherCourse($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "lecturesWithFullRoom/$number":
            $value = "lecturesWithFullRoom";
            $requestMethod = "GET";
            $id = $number;
            $controller = new Server\api\ControllersStudentBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "deleteLecture/$number":
            $value = "deleteLecture";
            $requestMethod = "PUT";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "changeToOnline/$number":
            $value = "changeToOnline";
            $requestMethod = "PUT";
            $id = $number;
            $controller = new Server\api\ControllersTeacherBooking($requestMethod, $dbConn, $value, $id);
            $controller->processRequest();
            break;
        case "bookingStatistics":
            $value = "bookingStatistics";
            $requestMethod = "GET";
            $filterCourse = $_GET['filterCourse'];
            $filterTime = $_GET['filterTime'] == "" ? "L.idLesson" : $_GET['filterTime'];
            $active = !(isset($_GET['type'])) || $_GET['type'] == "" ? "1" : $_GET['type'];  
            //if type is 1 then bookings statistics, if type is 0 then cancellation statistics, default is 1(booking stats)
            $controller = new Server\api\ControllersHistoricalData($requestMethod, $dbConn, $value, $filterTime, $filterCourse, $active);
            $controller->processRequest();
            break;
        default:
            echo $msg;
    }
}
