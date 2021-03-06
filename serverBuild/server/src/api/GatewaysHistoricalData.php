<?php

namespace Server\api;

class GatewaysHistoricalData extends Gateways
{
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getHistoricalDataBookings($filterTime, $filterCourse, $active, $isAttendanceStats)
    {
        $nwfilterCourse = explode(',', $filterCourse);
        $nwfilterCourse = array_map(function ($course) {
            return "'$course'";
        }, $nwfilterCourse);
        $nwfilterCourse = implode(',', $nwfilterCourse);
        $filterCourse = $filterCourse == 'L.idCourse' ? 'L.idCourse' : $nwfilterCourse;
        $present = ($isAttendanceStats == 0 ? 'present' : 1);
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
                (SELECT * FROM booking WHERE active=" . $active . " AND present=".$present.") B
                    ON
                L.idLesson=B.idLesson
        WHERE   L.idClassRoom<>0 AND
                L.idCourse IN (" . ($filterCourse == 'L.idCourse' ? $filterCourse : ('' . $filterCourse . '')) . ")
        GROUP BY " . $filterTime . "
        ORDER BY year_month_week
        ";
        return $this->returnData($filterTime, $sql);
    }

    public function getHistoricalDataBookingsForTeacher($filterTime, $filterCourse, $active, $id, $isAttendanceStats)
    {
        $nwfilterCourse = explode(',', $filterCourse);
        $nwfilterCourse = array_map(function ($course) {
            return "'$course'";
        }, $nwfilterCourse);
        $nwfilterCourse = implode(',', $nwfilterCourse);
        $filterCourse = $filterCourse == 'L.idCourse' ? 'L.idCourse' : $nwfilterCourse;
        $present = ($isAttendanceStats == 0 ? 'present' : 1);
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
                        b.present=". $present ." AND
				        u.idUser='" . $id . "') B
                    ON
                L.idLesson=B.idLesson
        WHERE   L.idClassRoom<>0 AND
                L.idCourse IN (" . ($filterCourse == 'L.idCourse' ? $filterCourse : ('' . $filterCourse . '')) . ")
        GROUP BY " . $filterTime . "
        ORDER BY year_month_week
        ";
        return $this->returnData($filterTime, $sql);
    }

    private function returnData($filter, $sql)
    {
        $result = $this->db->query($sql);
        $data = array();
        if ($filter == "L.idLesson") {
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
        } else if ($filter == "year,monthOfYear") {
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
        } else if ($filter == "year_month_week") {
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
        } else {
            return "not valid filter time";
        }

        return $this->returnArray($data);
    }
}
