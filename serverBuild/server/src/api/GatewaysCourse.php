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
        $sql = "SELECT idCourse, name
                FROM courses";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idCourse" => $row['idCourse'],
                "courseName" => $row['name'],
            );
            $data[] = $subArray;
        }
        return $this->returnArray($data);
    }
}
