<?php
namespace Server\api;

class GatewaysStudentBooking extends Gateways
{
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
        return $this->returnArray($data);
    }

    public function findStudentBookedLessons($id)
    {
        date_default_timezone_set("Europe/Rome");
        $sql = "SELECT B.idLesson as idLesson, idBooking
        from booking B join lessons L
        where B.idLesson=L.idLesson
        and idUser=" . $id . "
        and B.active=1
        and L.active=1
        and L.inPresence=1
        and B.isWaiting=0
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
        return $this->returnArray($data);
    }

    public function findStudentWaitingLessons($id)
    {
        date_default_timezone_set("Europe/Rome");
        $sql = "SELECT B.idLesson as idLesson, idBooking
        from booking B join lessons L
        where B.idLesson=L.idLesson
        and idUser=" . $id . "
        and B.active=1
        and L.active=1
        and L.inPresence=1
        and B.isWaiting=1
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
        return $this->returnArray($data);
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
        return $this->returnArray($data);
    }

    public function findDetailsOfLessons($lessons)
    {
        $lessons = implode(",", $lessons);
        $sql = "SELECT  L.idLesson, C.name, L.date, L.beginTime, L.endTime, L.idClassRoom, ifnull(B.peopleWaiting, 0) as peopleWaiting
                FROM 	lessons L LEFT JOIN (SELECT idLesson, COUNT(b.idLesson) as peopleWaiting
                        FROM booking as b
                        WHERE 	b.idLesson IN ($lessons)
                                AND b.active=1
                                AND b.isWaiting=1
                        GROUP BY b.idLesson) B ON B.idLesson=L.idLesson, courses as C
                WHERE 	L.idCourse=C.idCourse AND
                        L.idLesson IN ($lessons)";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idLesson" => $row['idLesson'],
                "name" => $row['name'],
                "date" => $row['date'],
                "beginTime" => $row['beginTime'],
                "endTime" => $row['endTime'],
                "idClassroom" => $row['idClassRoom'],
                "peopleWaiting" => $row['peopleWaiting'],
            );
            $data[] = $subArray;
        }
        return $this->returnArray($data);
    }

    public function insertBooking($input)
    {
        $isWaiting = $this->isWaiting($input->idLesson);
        $sql = "INSERT INTO booking('idUser', 'idLesson', 'active', 'date', 'isWaiting') VALUES('" . $input->idUser . "', '" . $input->idLesson . "', 1, '" . $input->date . "', '" . $isWaiting . "')";
        if ($this->db->exec($sql)) {
            return array("bookingId" => $this->db->lastInsertRowID(), "isWaiting" => $isWaiting);
        } else {
            return array();
        }
    }

    public function updateBooking($id)
    {
        // delete my booking
        $sql = "UPDATE booking SET active=0, isWaiting=0 WHERE idBooking=$id";
        // if my booking was deleted successfully
        if ($this->db->exec($sql)) {
            // get the lesson id of this booking
            $lessonId = $this->db->query("SELECT idLesson FROM booking WHERE idBooking=$id")->fetchArray(SQLITE3_ASSOC)["idLesson"];
            // if there was someone waiting for a seat in this lecture (the one with lowest bookingId)
            if ($this->isWaiting($lessonId) == 0) {
                // get the bookingId
                $bookingId = $this->db->query("SELECT idBooking
                                    FROM    booking
                                    WHERE   idLesson=$lessonId AND
                                            active=1 AND
                                            isWaiting=1
                                    ORDER BY idBooking
                                    LIMIT 1")->fetchArray(SQLITE3_ASSOC)["idBooking"];
                // set the booking to isWaiting=0
                $sql = "UPDATE booking
                    SET isWaiting=0
                    WHERE idBooking=$bookingId";
                // if operation was successfull, return the bookingId; otherwise return 0 on any other error
                if ($this->db->exec($sql)) {
                    return $bookingId;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        } else {
            return 0;
        }

    }

    // returns 1 if there are more confirmed bookings than actual seats, given a lesson id -> student must wait
    // returns 0 if there are still seats available, given a lesson id -> booking confirmed (no waiting needed)
    private function isWaiting($id)
    {
        $sql = "SELECT COUNT(b.idBooking) as bookedSeats, ifnull(cr.totalSeats, COUNT(b.idBooking)+1) as totalSeats
                FROM booking as b, courses as c, lessons as l, ClassRoom as cr
                WHERE   b.idLesson=$id AND
                        l.idLesson=b.idLesson AND
                        c.idCourse=l.idCourse AND
                        cr.idClassRoom=l.idClassRoom AND
                        b.active=1 AND b.isWaiting=0";
        $result = $this->db->query($sql)->fetchArray(SQLITE3_ASSOC);
        return $result["bookedSeats"] >= $result["totalSeats"] ? 1 : 0;
    }
}
