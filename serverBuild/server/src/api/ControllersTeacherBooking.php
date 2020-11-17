<?php
namespace Server\api;
use Server\api\GatewaysTeacherBooking;
class ControllersTeacherBooking{

    private $requestMethod;
    private $teacherGatewayBooking;
    private $id;
    private $value;
    public function __construct($requestMethod, $db, $value, $id = -1){
        $this->requestMethod = $requestMethod;
        $this->teacherGatewayBooking = new GatewaysTeacherBooking($db);
        $this->value = $value;
        $this->id = $id;
    }

    public function processRequest(){
        if($this->requestMethod == "GET"){
            if($this->value == "bookedStudentsForLecture"){
                $response = $this->findBookedStudentsForLecture($this->id);
                echo $response;
            }
        } 
    }
    public function findBookedStudentsForLecture($id){
        $bookedStudentsForLecture = $this->teacherGatewayBooking->findBookedStudentsForLecture($id);
        return json_encode($bookedStudentsForLecture);
    }
}


?>