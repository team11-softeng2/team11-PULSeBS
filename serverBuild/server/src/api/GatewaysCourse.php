<?php
namespace Server\api;

class GatewaysCourse extends Gateways
{
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findCourses()
    {
        $sql = "SELECT C.idCourse as idCourse, C.name as name, U.name as teacherName
                FROM courses C, users U
                WHERE C.idTeacher=U.idUser";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idCourse" => $row['idCourse'],
                "courseName" => $row['name'],
                "teacherName" => $row['teacherName'],
            );
            $data[] = $subArray;
        }
        return $this->returnArray($data);
    }

    public function findClasses()
    {
        $sql = "SELECT *
                FROM ClassRoom";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idClassroom" => $row['idClassRoom'],
                "totalSeats" => $row['totalSeats'],
                "roomNumber" => $row['room'],
            );
            $data[] = $subArray;
        }
        return $this->returnArray($data);
    }
}
