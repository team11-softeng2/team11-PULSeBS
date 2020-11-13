<?php
namespace Server\api;
use Server\api\GatewaysStudentBooking;
//require("GatewaysUserTable.php");


class ControllersLogin{
    private $requestMethod;
    private $studentBookingGateway;
    private $id;
    

    public function __construct($requestMethod, $db){
        $this->requestMethod = $requestMethod;
        $this->studentBookingGateway = new GatewaysStudentBooking($db);
        
    }
    public function processRequest(){
        if($this->requestMethod == "POST"){
            
        }
        else if($this->requestMethod == "GET"){

        }
        
    }
    
}

?>