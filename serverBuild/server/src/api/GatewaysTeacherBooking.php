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

    public function updateToNotActiveLecture($idLecture){
        $sqlUpdateLessonTable= "update lessons set active=0 where idLesson=".$idLecture."";
        $sqlUpdateBookingTable="update booking set active=0, isWaiting=0 where idLesson=".$idLecture."";
        $this->db->exec($sqlUpdateLessonTable);
        $changesLessonTable = $this->db->changes();
        if($changesLessonTable > 0){
            $this->db->exec($sqlUpdateBookingTable);
            return $changesLessonTable;    
        }
        else {
            return 0;
        }
    }

    public function changeToOnlineLecture($idLecture){
        $sqlUpdateLessonTable= "update lessons set inPresence=0, idClassRoom=0 where idLesson=".$idLecture."";
        $sqlUpdateBookingTable= "update booking set active=0, isWaiting=0 where idLesson=".$idLecture."";
        $this->db->exec($sqlUpdateLessonTable);
        $changesLessonTable = $this->db->changes();
        if($changesLessonTable > 0){
            $this->db->exec($sqlUpdateBookingTable);
            return $changesLessonTable;    
        }
        else {
            return 0;
        }
        
    }
    
    //Used to send emails to students 
    public function findAllBookingsOfLecture($idLecture){
        $sql= "select * from booking where idLesson=".$idLecture."";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idBooking" => $row['idBooking'],
                "idUser" => $row['idUser'],
                "idLesson" => $row['idLesson'],
                "active" => $row['active'],
                "date" => $row['date'],
                "isWaiting" => $row['isWaiting']
            );
            $data[] = $subArray;
        }
        return (empty($data) ? 0 : $data);

    }

}
