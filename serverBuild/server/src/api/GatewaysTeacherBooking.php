<?php
namespace Server\api;

class GatewaysTeacherBooking extends Gateways
{
    protected $format = "Y-m-d H:i:s";

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

        return $this->returnArray($data);
    }

    public function findScheduledLecturesForTeacher($id)
    {
        $today = date('Y-m-d');
        $sql = "SELECT  l.*, c.name as courseName
                FROM    lessons as l, courses as c
                WHERE   l.idTeacher='$id' AND
                        c.idCourse=l.idCourse AND
                        l.date >= '$today' AND
						l.active=1";
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
            );
            $data[] = $subArray;
        }

        return $this->returnArray($data);
    }

    public function updateToNotActiveLecture($idLecture)
    {
        if ($this->validateDateBeforeUpdate($idLecture)) {
            $sqlUpdateLessonTable = "update lessons set active=0 where idLesson=" . $idLecture . "";
            $this->db->exec($sqlUpdateLessonTable);
            $changesLessonTable = $this->db->changes();
            if ($changesLessonTable > 0) {
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
            $sqlUpdateLessonTable = "update lessons set inPresence=0 where idLesson=" . $idLecture . "";
            $this->db->exec($sqlUpdateLessonTable);
            $changesLessonTable = $this->db->changes();
            if ($changesLessonTable > 0) {
                return $changesLessonTable;
            } else {
                return 0;
            }
        } else {
            return -1;
        }
    }

    public function validateDateBeforeUpdate($idLecture)
    {
        $sql = "select * from lessons where idLesson = " . $idLecture . "";
        $result = $this->db->query($sql)->fetchArray(SQLITE3_ASSOC);
        if ($result) {
            date_default_timezone_set("Europe/Rome");
            $currentDateTimePlusOneHour = date($this->format, strtotime("+1 hours", strtotime(date($this->format))));
            $dateTimeLecture = $result['date'] . " " . $result['beginTime'];
            return ($currentDateTimePlusOneHour < $dateTimeLecture); //if true it is possible to delete
        } else { //no row found
            return false;
        }
    }
    public function validateDateBeforeUpdateToOnline($idLecture)
    {
        $sql = "select * from lessons where idLesson = " . $idLecture . "";
        $result = $this->db->query($sql)->fetchArray(SQLITE3_ASSOC);
        if ($result) {
            date_default_timezone_set("Europe/Rome");
            $currentDateTimePlusOneHour = date($this->format, strtotime("+30 minutes", strtotime(date($this->format))));
            $dateTimeLecture = $result['date'] . " " . $result['beginTime'];
            return ($currentDateTimePlusOneHour < $dateTimeLecture); //if true it is possible to delete
        } else { //no row found
            return false;
        }
    }

}
