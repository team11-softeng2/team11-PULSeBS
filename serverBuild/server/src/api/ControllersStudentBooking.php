<?php
namespace Server\api;
use Server\api\GatewaysStudentBooking;
//require("GatewaysUserTable.php");


class ControllersStudentBooking{
    private $requestMethod;
    private $studentBookingGateway;
    private $id;
    private $value;
    

    public function __construct($requestMethod, $db, $value, $id = -1){
        $this->requestMethod = $requestMethod;
        $this->studentBookingGateway = new GatewaysStudentBooking($db);
        $this->value = $value;
        $this->id = $id;
    }
    public function processRequest(){
        if($this->requestMethod == "POST"){
            if($this->value == "insertLecture"){
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                $response = $this->insertNewBooklesson($input);
                echo $response;
            }
        }
        else if($this->requestMethod == "GET"){
            if($this->value == "bookableLessons"){
                $response = $this->findBookableLessons();
                echo $response;

            } else if($this->value == "studentBookings") {
                $response = $this->findStudentBookings();
                echo $response;
            }
        }
        else if($this->requestMethod == "PUT"){
            if($this->value == "updateBooking"){
                $response = $this->updateBooking($this->id);
                echo $response;
            }
        }
    }
    public function findBookableLessons(){
        $allStudentLessons = $this->studentBookingGateway->findStudentLessons($this->id);
        if($allStudentLessons == 0){
            return json_encode(0);
        }
        else{
           $allStudentLessons = array_column($allStudentLessons, "idLesson"); 
        }
        $lessonsBooked = $this->studentBookingGateway->findStundetBookedLessons($this->id);
        if($lessonsBooked == 0){
            $lessonsBooked = array();
        }
        else{
            $lessonsBooked = array_column($lessonsBooked, "idLesson");
        }
        $lessonsWithFullRoom = $this->studentBookingGateway->findLessonsWithFullRoom();
        if($lessonsWithFullRoom == 0){
            $lessonsWithFullRoom = array();
        }
        else{
            $lessonsWithFullRoom = array_column($lessonsWithFullRoom, "idLesson");
        }
        $response = array_diff($allStudentLessons, $lessonsBooked, $lessonsWithFullRoom);
        $response = $this->studentBookingGateway->findDetailsOfLessons($response);
        return json_encode($response);
    }

    public function insertNewBooklesson($input){
        $response = json_encode($this->studentBookingGateway->insertBooking($input));
        return $response;
    }

    public function findStudentBookings() {
        $studentBookings = $this->studentBookingGateway->findStundetBookedLessons($this->id);
        if($studentBookings == 0){
            return json_encode(0);
        }
        else{
            $studentBookingsDetail = array_column($studentBookings, "idLesson");
            $studentBookingsDetail = $this->studentBookingGateway->findDetailsOfLessons($studentBookingsDetail);
            foreach($studentBookingsDetail as $key => $row)
                {
                    foreach($studentBookings as $key1 => $row1){
                        if($studentBookings[$key1]['idLesson'] == $studentBookingsDetail[$key]['idLesson']){
                            $idBooking = $studentBookings[$key1]['idBooking'];
                        }
                    }
                    $studentBookingsDetail[$key]['idBooking'] = $idBooking;
                }
            return json_encode($studentBookingsDetail);
        }
    }
    public function updateBooking($id){
        return json_encode($this->studentBookingGateway->updateBooking($id));
    }
    
}

?>