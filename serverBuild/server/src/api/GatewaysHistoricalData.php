<?php
namespace Server\api;

class GatewaysHistoricalData
{

    private $db = null;
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getHistoricalDataBookings($filterTime, $filterCourse, $active)
    {
        //all bookings made by students
        $sql = "
        SELECT  COUNT(DISTINCT B.idBooking) as numberBookings,
                COUNT(DISTINCT L.idLesson) as numberLectures,
                (1.0*COUNT(DISTINCT B.idBooking))/(1.0*COUNT(DISTINCT L.idLesson)) as average,
                strftime('%Y-%m-%d', L.date) || ' ' || L.beginTime  as dateLecture,
                L.idLesson as lectureID,
                strftime('%W', L.date) as weekOfYear,
                strftime('%m', L.date) as monthOfYear,
                strftime('%Y', L.date) as year,
                strftime('%Y', L.date) || strftime('%m', L.date) || strftime('%W', L.date) as year_month_week,
                L.idCourse as courseID
        FROM    lessons L
                    Left join
                (SELECT * FROM booking WHERE active=" . $active . ") B
                    ON
                L.idLesson=B.idLesson
        WHERE   L.idClassRoom<>0 AND
                L.idCourse IN (" . $filterCourse . ")
        GROUP BY " . $filterTime . "
        ORDER BY year_month_week
        ";
        $result = $this->db->query($sql);
        $data = array();
        if ($filterTime == "L.idLesson") {
            //statistics per lecture
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $subArray = array(
                    "numberBookings" => $row['numberBookings'],
                    "lectureID" => $row['lectureID'],
                    "weekOfYear" => $row['weekOfYear'],
                    "monthOfYear" => $row['monthOfYear'],
                    "year" => $row['year'],
                    "dateLecture" => $row['dateLecture'],
                    "year_month_week" => $row['year_month_week'],
                    "courseID" => $row['courseID'],
                );
                $data[] = $subArray;
            }
            if (!empty($data)) {
                return $data;
            } else {
                return 0;
            }

        } else if ($filterTime == "year,monthOfYear") {
            //statistics per month
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $subArray = array(
                    "numberBookings" => $row['numberBookings'],
                    "numberLectures" => $row['numberLectures'],
                    "average" => $row['average'],
                    "monthOfYear" => $row['monthOfYear'],
                    "year" => $row['year'],
                );
                $data[] = $subArray;
            }
            if (!empty($data)) {
                return $data;
            } else {
                return 0;
            }

        } else if ($filterTime == "year_month_week") {
            //statistics per weeek
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $subArray = array(
                    "numberBookings" => $row['numberBookings'],
                    "numberLectures" => $row['numberLectures'],
                    "average" => $row['average'],
                    "weekOfYear" => $row['weekOfYear'],
                    "monthOfYear" => $row['monthOfYear'],
                    "year" => $row['year'],
                    "year_month_week" => $row['year_month_week'],
                );
                $data[] = $subArray;
            }
            if (!empty($data)) {
                return $data;
            } else {
                return 0;
            }
        } else {
            return "not valid filter time";

        }

    }

    public function getHistoricalDataBookingsForTeacher($filterTime, $filterCourse, $active, $id)
    {
        //all bookings made by students
        $sql = "
        SELECT  COUNT(DISTINCT B.idBooking) as numberBookings,
                COUNT(DISTINCT L.idLesson) as numberLectures,
                (1.0*COUNT(DISTINCT B.idBooking))/(1.0*COUNT(DISTINCT L.idLesson)) as average,
                strftime('%Y-%m-%d', L.date) || ' ' || L.beginTime  as dateLecture,
                L.idLesson as lectureID,
                strftime('%W', L.date) as weekOfYear,
                strftime('%m', L.date) as monthOfYear,
                strftime('%Y', L.date) as year,
                strftime('%Y', L.date) || strftime('%m', L.date) || strftime('%W', L.date) as year_month_week,
                L.idCourse as courseID
        FROM    lessons L
                    Left join
                (SELECT b.*
		        FROM  	booking as b, lessons as l, courses as c, users as u
		        WHERE 	b.idLesson=l.idLesson AND
				        l.idCourse=c.idCourse AND
				        c.idTeacher=u.idUser AND
				        b.active=" . $active . " AND
				        u.idUser=" . $id . ") B
                    ON
                L.idLesson=B.idLesson
        WHERE   L.idClassRoom<>0 AND
                L.idCourse IN (" . $filterCourse . ")
        GROUP BY " . $filterTime . "
        ORDER BY year_month_week
        ";
        $result = $this->db->query($sql);
        $data = array();
        if ($filterTime == "L.idLesson") {
            //statistics per lecture
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $subArray = array(
                    "numberBookings" => $row['numberBookings'],
                    "lectureID" => $row['lectureID'],
                    "weekOfYear" => $row['weekOfYear'],
                    "monthOfYear" => $row['monthOfYear'],
                    "year" => $row['year'],
                    "dateLecture" => $row['dateLecture'],
                    "year_month_week" => $row['year_month_week'],
                    "courseID" => $row['courseID'],
                );
                $data[] = $subArray;
            }
            if (!empty($data)) {
                return $data;
            } else {
                return 0;
            }

        } else if ($filterTime == "year,monthOfYear") {
            //statistics per month
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $subArray = array(
                    "numberBookings" => $row['numberBookings'],
                    "numberLectures" => $row['numberLectures'],
                    "average" => $row['average'],
                    "monthOfYear" => $row['monthOfYear'],
                    "year" => $row['year'],
                );
                $data[] = $subArray;
            }
            if (!empty($data)) {
                return $data;
            } else {
                return 0;
            }

        } else if ($filterTime == "year_month_week") {
            //statistics per weeek
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $subArray = array(
                    "numberBookings" => $row['numberBookings'],
                    "numberLectures" => $row['numberLectures'],
                    "average" => $row['average'],
                    "weekOfYear" => $row['weekOfYear'],
                    "monthOfYear" => $row['monthOfYear'],
                    "year" => $row['year'],
                    "year_month_week" => $row['year_month_week'],
                );
                $data[] = $subArray;
            }
            if (!empty($data)) {
                return $data;
            } else {
                return 0;
            }
        } else {
            return "not valid filter time";

        }

    }

}
