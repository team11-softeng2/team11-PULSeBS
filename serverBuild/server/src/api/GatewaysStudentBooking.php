<?php
namespace Server\api;
class GatewaysStudentBooking{
    private $db = null;
    public function __construct($db){
        $this->db = $db;
    }
    
    public function findStudentLessons($id){
        $dateForQuery = calculateDate();
        $sql = "select idLesson 
        from lessons L join enrollment E
        where L.idCourse=E.idCourse
        and E.idUser=".$id."
        and date>='".$dateForQuery."'";
    }
    public function findStundetBookedLessons($id){
        $sql = "select idLesson
        from booking
        where idUser=".$id."";
    }
    public function findLessonsWithFullRoom($id){
        
    }
    public function calculateDate(){
        date_default_timezone_set("Europe/Rome");
        return  date("Y-m-d H:i:s", strtotime("+1 hours", strtotime(date("Y-m-d H:i:s"))));
    }
}

?>