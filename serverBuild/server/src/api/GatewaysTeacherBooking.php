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

    public function updateToNotActiveLecture($idLecture)
    {
        if ($this->validateDateBeforeUpdate($idLecture)) {
            $sqlUpdateLessonTable = "update lessons set active=0 where idLesson=" . $idLecture . "";
            $sqlUpdateBookingTable = "update booking set active=0, isWaiting=0 where idLesson=" . $idLecture . "";
            $this->db->exec($sqlUpdateLessonTable);
            $changesLessonTable = $this->db->changes();
            if ($changesLessonTable > 0) {
                $this->db->exec($sqlUpdateBookingTable);
                return $changesLessonTable;
            } else {
                return 0;
            }
        } else {
            return -1;
        }
    }

    public function changeToOnlineLecture($idLecture)
    {
        if ($this->validateDateBeforeUpdateToOnline($idLecture)) {
            $sqlUpdateLessonTable = "update lessons set inPresence=0, idClassRoom=0 where idLesson=" . $idLecture . "";
            $sqlUpdateBookingTable = "update booking set active=0, isWaiting=0 where idLesson=" . $idLecture . "";
            $this->db->exec($sqlUpdateLessonTable);
            $changesLessonTable = $this->db->changes();
            if ($changesLessonTable > 0) {
                $this->db->exec($sqlUpdateBookingTable);
                return $changesLessonTable;
            } else {
                return 0;
            }
        } else {
            return -1;
        }

    }

    //Used to send emails to students
    public function findAllBookingsOfLecture($idLecture)
    {
        $sql = "select * from booking where idLesson=" . $idLecture . "";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idBooking" => $row['idBooking'],
                "idUser" => $row['idUser'],
                "idLesson" => $row['idLesson'],
                "active" => $row['active'],
                "date" => $row['date'],
                "isWaiting" => $row['isWaiting'],
            );
            $data[] = $subArray;
        }
        return (empty($data) ? 0 : $data);

    }

    public function validateDateBeforeUpdate($idLecture)
    {
        $sql = "select * from lessons where idLesson = " . $idLecture . "";
        $result = $this->db->query($sql)->fetchArray(SQLITE3_ASSOC);
        if ($result) {
            date_default_timezone_set("Europe/Rome");
            $currentDateTimePlusOneHour = date("Y-m-d H:i:s", strtotime("+1 hours", strtotime(date("Y-m-d H:i:s"))));
            $dateTimeLecture = $result['date'] . " " . $result['beginTime'];
            return ($currentDateTimePlusOneHour < $dateTimeLecture); //if true it is possible to delete
        } else {
            //no row found
            return false;
        }
    }
    public function validateDateBeforeUpdateToOnline($idLecture)
    {
        $sql = "select * from lessons where idLesson = " . $idLecture . "";
        $result = $this->db->query($sql)->fetchArray(SQLITE3_ASSOC);
        if ($result) {
            date_default_timezone_set("Europe/Rome");
            $currentDateTimePlusOneHour = date("Y-m-d H:i:s", strtotime("+30 minutes", strtotime(date("Y-m-d H:i:s"))));
            $dateTimeLecture = $result['date'] . " " . $result['beginTime'];
            return ($currentDateTimePlusOneHour < $dateTimeLecture); //if true it is possible to delete
        } else {
            //no row found
            return false;
        }
    }

}
