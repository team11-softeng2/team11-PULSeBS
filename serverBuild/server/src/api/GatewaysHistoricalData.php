<?php
namespace Server\api;

class GatewaysHistoricalData
{

    private $db = null;
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getHistoricalData($filterTime, $filterCourse){
        $sql = "
        select count(B.idBooking) as numberBookings, count(L.idLesson) as numberLectures, 100*(1.0*count(B.idBooking))/(1.0*count(L.idLesson)) as average, strftime('%Y-%m-%d', L.date) as dateLecture, L.idLesson, strftime('%W', L.date) as weekOfYear, strftime('%m', L.date) as monthOfYear, strftime('%Y', L.date) as year, strftime('%Y', L.date) || strftime('%m', L.date) || strftime('%W', L.date) as year_month_week
        from lessons L
        Left join booking B
        ON L.idLesson=B.idLesson
        and B.active=1
        and L.inPresence=1
        and L.active=1
        and L.idCourse in (".$filterCourse.")
        group by '".$filterTime."'
        order by year_month_week
        ";
        
    }

}
