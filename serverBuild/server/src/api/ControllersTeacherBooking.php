<?php
namespace Server\api;

class ControllersTeacherBooking{

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
            if($this->value == "bookedStudentsForLecture"){
                $postBody = file_get_contents("php://input");
                $input = (json_decode($postBody));
                $response = $this->insertNewBooklesson($input);
                echo $response;
            }
        } 
    }
}


?>