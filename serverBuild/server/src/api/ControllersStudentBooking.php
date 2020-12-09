<?php
namespace Server\api;

use Server\api\GatewaysStudentBooking;

class ControllersStudentBooking extends Controllers
{
    private $gatewayNotification;

    public function __construct($requestMethod, $db, $value, $id = -1)
    {
        $this->requestMethod = $requestMethod;
        $this->gateway = new GatewaysStudentBooking($db);
        $this->gatewayNotification = new GatewaysNotification($db);
        $this->value = $value;
        $this->id = $id;
    }

    public function processRequest()
    {
        if ($this->requestMethod == "POST") {
            if ($this->value == "insertLecture") {
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                return $this->insertNewBooklesson($input);
            } else {
                return $this->invalidEndpoint;
            }
        } else if ($this->requestMethod == "GET") {
            if ($this->value == "bookableLessons") {
                return $this->findBookableLessons();
            } else if ($this->value == "waitingLessons") {
                return $this->findWaitingLessons();
            } else if ($this->value == "studentBookings") {
                return $this->findStudentBookings();
            } else if ($this->value == "lecturesWithFullRoom") {
                return $this->findLectureWithFullRoom();
            } else {
                return $this->invalidEndpoint;
            }
        } else if ($this->requestMethod == "PUT") {
            if ($this->value == "updateBooking") {
                return $this->updateBooking($this->id);
            } else {
                return $this->invalidEndpoint;
            }
        } else {
            return $this->invalidMethod;
        }
    }

    public function findBookableLessons()
    {
        $allStudentLessons = $this->gateway->findStudentLessons($this->id);
        if ($allStudentLessons == 0) {
            return json_encode(0);
        } else {
            $allStudentLessons = array_column($allStudentLessons, "idLesson");
        }

        $lessonsBooked = $this->gateway->findStudentBookedLessons($this->id);
        if ($lessonsBooked == 0) {
            $lessonsBooked = array();
        } else {
            $lessonsBooked = array_column($lessonsBooked, "idLesson");
        }

        $lessonsWaiting = $this->gateway->findStudentWaitingLessons($this->id);
        if ($lessonsWaiting == 0) {
            $lessonsWaiting = array();
        } else {
            $lessonsWaiting = array_column($lessonsWaiting, "idLesson");
        }

        $lessonsWithFullRoom = $this->gateway->findLessonsWithFullRoom();
        if ($lessonsWithFullRoom == 0) {
            $lessonsWithFullRoom = array();
        } else {
            $lessonsWithFullRoom = array_column($lessonsWithFullRoom, "idLesson");
        }

        $response = array_diff($allStudentLessons, $lessonsBooked, $lessonsWaiting, $lessonsWithFullRoom);
        $response = $this->gateway->findDetailsOfLessons($response);
        return json_encode($response);
    }

    public function insertNewBooklesson($input)
    {
        $response = json_encode($this->gateway->insertBooking($input));
        $this->gatewayNotification->sendEmail('bookingConfirmation', $response);
        return $response;
    }

    public function findStudentBookings()
    {
        $studentBookings = $this->gateway->findStudentBookedLessons($this->id);
        if ($studentBookings == 0) {
            return json_encode(0);
        } else {
            $studentBookingsDetail = array_column($studentBookings, "idLesson");
            $studentBookingsDetail = $this->gateway->findDetailsOfLessons($studentBookingsDetail);
            foreach ($studentBookingsDetail as $key => $row) {
                foreach ($studentBookings as $key1 => $row1) {
                    if ($studentBookings[$key1]['idLesson'] == $studentBookingsDetail[$key]['idLesson']) {
                        $idBooking = $studentBookings[$key1]['idBooking'];
                    }
                }
                $studentBookingsDetail[$key]['idBooking'] = $idBooking;
            }
            return json_encode($studentBookingsDetail);
        }
    }

    public function findWaitingLessons()
    {
        $studentBookings = $this->gateway->findStudentWaitingLessons($this->id);
        if ($studentBookings == 0) {
            return json_encode(0);
        } else {
            $studentBookingsDetail = array_column($studentBookings, "idLesson");
            $studentBookingsDetail = $this->gateway->findDetailsOfLessons($studentBookingsDetail);
            foreach ($studentBookingsDetail as $key => $row) {
                foreach ($studentBookings as $key1 => $row1) {
                    if ($studentBookings[$key1]['idLesson'] == $studentBookingsDetail[$key]['idLesson']) {
                        $idBooking = $studentBookings[$key1]['idBooking'];
                    }
                }
                $studentBookingsDetail[$key]['idBooking'] = $idBooking;
            }
            return json_encode($studentBookingsDetail);
        }
    }

    public function updateBooking($id)
    {
        return json_encode($this->gateway->updateBooking($id));
    }

    public function findLectureWithFullRoom()
    {
        $allStudentLectures = $this->gateway->findStudentLessons($this->id);
        if ($allStudentLectures == 0) {
            $allStudentLectures = array();
        } else {
            $allStudentLectures = array_column($allStudentLectures, "idLesson");
        }
        $lecturesFullRoom = $this->gateway->findLessonsWithFullRoom();
        if ($lecturesFullRoom == 0) {
            $lecturesFullRoom = array();
        } else {
            $lecturesFullRoom = array_column($lecturesFullRoom, "idLesson");
        }
        $lecturesAlreadyBooked = $this->gateway->findStudentBookedLessons($this->id);
        if ($lecturesAlreadyBooked == 0) {
            $lecturesAlreadyBooked = array();
        } else {
            $lecturesAlreadyBooked = array_column($lecturesAlreadyBooked, "idLesson");
        }
        $lessonsWaiting = $this->gateway->findStudentWaitingLessons($this->id);
        if ($lessonsWaiting == 0) {
            $lessonsWaiting = array();
        } else {
            $lessonsWaiting = array_column($lessonsWaiting, "idLesson");
        }

        $allStudentLectures = array_diff($allStudentLectures, $lecturesAlreadyBooked, $lessonsWaiting);
        $resultLectures = array_intersect($lecturesFullRoom, $allStudentLectures);
        if (empty($resultLectures)) {
            return json_encode(0);
        } else {
            $resultLectures = $this->gateway->findDetailsOfLessons($resultLectures);
            return json_encode($resultLectures);
        }
    }

}
