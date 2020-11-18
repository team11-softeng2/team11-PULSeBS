<?php
namespace Server\api;

class GatewaysTeacherBooking
{

    private $db = null;
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findBookedStudentsForLecture($id)
    {
        $sql = "select U.idUser, U.name from booking B join users U where B.idUser=U.idUser and B.idLesson=" . $id . " and U.role='student' and B.active=1 and B.isWaiting=0;";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idUser" => $row['idUser'],
                "name" => $row['name'],
            );
            $data[] = $subArray;
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }

    public function findScheduledLecturesForTeacher($id)
    {
        $today = date('Y-m-d');
        $sql = "SELECT  l.*, c.name as courseName, s.studentsNumber
                FROM    (SELECT idLesson, COUNT(*) as studentsNumber
                        FROM booking
                        WHERE isWaiting=0
                        GROUP BY idLesson) as s, lessons as l, courses as c
                WHERE   l.idTeacher='$id' AND
                        l.inPresence=1 AND
                        s.idLesson=l.idLesson AND
                        c.idCourse=l.idCourse AND
                        l.date >= '$today'";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idLesson" => $row['idLesson'],
                "idTeacher" => $row['idTeacher'],
                "idClassroom" => $row['idClassRoom'],
                "idCourse" => $row['idCourse'],
                "courseName" => $row['courseName'],
                "date" => $row['date'],
                "beginTime" => $row['beginTime'],
                "endTime" => $row['endTime'],
                "inPresence" => $row['inPresence'],
                "active" => $row['active'],
                "studentsNumber" => $row['studentsNumber'],
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
