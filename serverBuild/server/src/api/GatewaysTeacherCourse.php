<?php
namespace Server\api;

class GatewaysTeacherCourse
{
    private $db = null;
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findTeacherCourses($id)
    {
        $sql = "SELECT *
                FROM courses
                WHERE idTeacher='$id'";
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
