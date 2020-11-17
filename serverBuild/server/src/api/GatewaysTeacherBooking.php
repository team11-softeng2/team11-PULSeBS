<?php
namespace Server\api;

class GatewaysTeacherBooking{

    private $db = null;
    public function __construct($db){
        $this->db = $db;
    }

    public function findBookedStudentsForLecture($id){
        $sql ="select U.idUser, U.name from booking B join users U where B.idUser=U.idUser and B.idLesson=".$id." and U.role='student' and B.active=1 and B.isWaiting=0;";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)){
            $subArray = array(
                "idUser" => $row['idUser'],
                "name" => $row['name']
            );
            $data[] = $subArray;
        }
        if(!empty($data)){
            return $data;
        }
        else{
            return 0;
        }
    }

    
}


?>