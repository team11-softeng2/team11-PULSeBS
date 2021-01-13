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
        $sql = "SELECT U.idUser, U.name, B.idBooking, B.present
                FROM booking B JOIN users U
                WHERE   B.idUser=U.idUser AND
                        B.idLesson=$id AND
                        U.role='student' AND
                        B.active=1 AND
                        B.isWaiting=0;";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idUser" => $row['idUser'],
                "name" => $row['name'],
                "idBooking" => $row['idBooking'],
                "isPresent" => $row['present'],
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
            $sqlUpdateLessonTable = "UPDATE lessons SET active=0 WHERE idLesson=" . $idLecture . "";
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
            $sqlUpdateLessonTable = "UPDATE lessons SET inPresence=0 WHERE idLesson=" . $idLecture . "";
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

    public function changeToOnlineLectureByYear($year)
    {
        $sqlUpdateLessonTable = "UPDATE lessons
                                SET inPresence=0
                                WHERE idCourse IN   (SELECT c.idCourse
                                                    FROM lessons as l, courses as c
                                                    WHERE l.idCourse=c.idCourse AND c.year=$year)";
        $this->db->exec($sqlUpdateLessonTable);
        $changesLessonTable = $this->db->changes();
        if ($changesLessonTable > 0) {
            return $changesLessonTable;
        } else {
            return 0;
        }
    }

    public function changeToPresenceLectureByYear($year)
    {
        $sqlUpdateLessonTable = "UPDATE lessons
                                SET inPresence=1
                                WHERE idCourse IN   (SELECT c.idCourse
                                                    FROM lessons as l, courses as c
                                                    WHERE l.idCourse=c.idCourse AND c.year=$year)";
        $this->db->exec($sqlUpdateLessonTable);
        $changesLessonTable = $this->db->changes();
        if ($changesLessonTable > 0) {
            return $changesLessonTable;
        } else {
            return 0;
        }
    }

    public function recordStudentPresence($idBooking)
    {
        $sqlUpdateLessonTable = "UPDATE booking
                                SET present=(SELECT ifnull(nullif(1, present), 0)
                                            WHERE idBooking=$idBooking)
                                WHERE idBooking=$idBooking";
        $this->db->exec($sqlUpdateLessonTable);
        $changesLessonTable = $this->db->changes();
        if ($changesLessonTable > 0) {
            return $changesLessonTable;
        } else {
            return 0;
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
