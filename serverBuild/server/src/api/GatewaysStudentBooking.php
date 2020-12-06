<?php
namespace Server\api;

class GatewaysStudentBooking
{
    private $db = null;
    protected $format = "Y-m-d H:i:s";

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findStudentLessons($id)
    {
        date_default_timezone_set("Europe/Rome");
        $dateForQuery = date("Y-m-d");
        $sql = "SELECT idLesson, date, beginTime
        from lessons L join enrollment E
        where L.idCourse=E.idCourse
        and E.idUser=" . $id . "
        and date>='" . $dateForQuery . "'
        and inPresence =1
        and active=1";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            if ($row['date'] . " " . $row['beginTime'] >= date($this->format, strtotime("+1 hours", strtotime(date($this->format))))) {
                $subArray = array(
                    "idLesson" => $row['idLesson'],
                );
                $data[] = $subArray;
            }
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }

    public function findStundetBookedLessons($id)
    {
        date_default_timezone_set("Europe/Rome");
        $sql = "SELECT B.idLesson as idLesson, idBooking
        from booking B join lessons L
        where B.idLesson=L.idLesson
        and idUser=" . $id . "
        and B.active=1
        and L.active=1
        and L.inPresence=1
        and B.date>='" . date($this->format) . "'";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idLesson" => $row['idLesson'],
                "idBooking" => $row['idBooking'],
            );
            $data[] = $subArray;
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }
    public function findLessonsWithFullRoom()
    {
        $sql = "SELECT L.idLesson
        from lessons L join ClassRoom C
        where L.idClassRoom=C.idClassRoom
        and C.totalSeats <= (SELECT count(*)
        from booking B
        where idLesson = L.idLesson
        and B.active=1)";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idLesson" => $row['idLesson'],
            );
            $data[] = $subArray;
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }

    public function findDetailsOfLessons($lessons)
    {
        $lessons = implode(",", $lessons);
        $sql = "SELECT L.idLesson, C.name, L.date, L.beginTime, L.endTime
        FROM LESSONS L JOIN courses C
        WHERE L.idCourse=C.idCourse
        and L.idLesson in (" . $lessons . ")";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idLesson" => $row['idLesson'],
                "name" => $row['name'],
                "date" => $row['date'],
                "beginTime" => $row['beginTime'],
                "endTime" => $row['endTime'],
            );
            $data[] = $subArray;
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }

    public function insertBooking($input)
    {
        $sql = "insert into booking(idUser, idLesson, active, date, isWaiting) values('" . $input->idUser . "', '" . $input->idLesson . "', 1, '" . $input->date . "', 0)";
        $return = $this->db->exec($sql);
        if ($return) {
            return $this->db->lastInsertRowID();
        }

    }

    public function updateBooking($id)
    {
        $sql = "update booking set active=0 where idBooking=" . $id . "";
        $return = $this->db->exec($sql);
        if ($return) {
            return $this->db->changes();
        }

    }

}
