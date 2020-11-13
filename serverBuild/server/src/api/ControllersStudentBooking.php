<?php
namespace Server\api;
use Server\api\GatewaysStudentBooking;
//require("GatewaysUserTable.php");


class ControllersStudentBooking{
    private $requestMethod;
    private $studentBookingGateway;
    private $id;
    private $value;
    

    public function __construct($requestMethod, $db, $value, $id){
        $this->requestMethod = $requestMethod;
        $this->studentBookingGateway = new GatewaysStudentBooking($db);
        $this->value = $value;
        $this->id = $id;
    }
    public function processRequest(){
        if($this->requestMethod == "POST"){
            
        }
        else if($this->requestMethod == "GET"){
            if($this->value == "bookableLessons"){
                $response = $this->findBookableLessons();
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
    
}

?>