<?php
namespace Server\api;

class GatewaysCourse
{
    private $db = null;
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
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }
}
