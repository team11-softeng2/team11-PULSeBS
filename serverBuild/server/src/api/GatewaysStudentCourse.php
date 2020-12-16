<?php
namespace Server\api;

class GatewaysStudentCourse extends Gateways
{
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findStudentCourses($id)
    {
        $sql = "SELECT c.*
                FROM enrollment as e, users as u, courses as c
                WHERE   e.idUser=u.idUser AND
                        c.idCourse=e.idCourse AND
                        u.idUser='$id'";
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
