<?php
namespace Server\api;

class GatewaysTeacherBooking extends Gateways
{
    protected $format = "Y-m-d H:i:s";

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function updateSchedule($input)
    {
        $count = 0;
        $sql = "SELECT * FROM lessons WHERE idLesson='" . $input->idLesson . "'";
        $result = $this->db->query($sql)->fetchArray(SQLITE3_ASSOC);
        if ($result) {
            $idCourse = $result['idCourse'];

            $oldDate = $result['date'];
            $oldBeginTime = $result['beginTime'];
            $oldEndTime = $result['endTime'];
            $oldDateObj = new \DateTime($oldDate);
            $oldDow = $oldDateObj->format('w');

            $newClassroom = $input->idClassroom;
            $newBeginTime = $input->beginTime;
            $newEndTime = $input->endTime;
            $newDow = $input->dow;

            $diff = $newDow - $oldDow; //in days (es. 1 , -2, ecc..)

            //iterate over 52 weeks (ie. 1 year) and get the list of possible dates
            $possibleDays = array($oldDate);
            for ($i = 1; $i <= 52; $i++) {
                $n = $i * 7;
                \array_push($possibleDays, date('Y-m-d', \strtotime("+$n days", $oldDateObj->getTimestamp())));
            }

            //select all lessons of that course that might be eligible for update...
            $sql = "SELECT *
                    FROM lessons
                    WHERE   idCourse='" . $idCourse . "' AND
                            date >= '" . $oldDate . "' AND
                            beginTime= '" . $oldBeginTime . "' AND
                            endTime= '" . $oldEndTime . "'";
            $result = $this->db->query($sql);

            //for each row (ie. lesson)
            while ($lesson = $result->fetchArray(SQLITE3_ASSOC)) {
                $oldDate = $lesson['date'];
                // check if should be updated (ie. (nth-week x N)+7 )
                if (in_array($oldDate, $possibleDays)) {
                    $idLesson = $lesson['idLesson'];
                    $oldDateObj = new \DateTime($oldDate);
                    $newDate = date('Y-m-d', \strtotime("$diff days", $oldDateObj->getTimestamp()));

                    $sql = "UPDATE lessons
                            SET idClassRoom='" . $newClassroom . "', date='" . $newDate . "', beginTime='" . $newBeginTime . "', endTime='" . $newEndTime . "'
                            WHERE idLesson='" . $idLesson . "'";
                    if ($this->db->exec($sql)) {
                        $count++;
                    }
                }
            }
        }
        return $count;
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
