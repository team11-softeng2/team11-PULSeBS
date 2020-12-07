<?php


    
    // $Enrollment = null;
    // $Professors = null;
    // $Students

    
        $dbConn = new SQLite3("./db.db");
        
        // $num = count($data);
        //     for ($c=0; $c < $num; $c++) {
        //       $tmp = str_replace("'", "''", $data[$c]);
        //       $data[$c] = trim($tmp);
        //     }

    function setUpCoursesDB() {
        $courses = file_get_contents("./json/Courses.json");
        
        $courses = json_decode($courses, true);
        global $dbConn;
        $sqlInsertRow = "insert or replace into courses(idCourse, idTeacher, name, year, semester) values";
        $i=0;
        foreach($courses as $course) {
            $name = str_replace("'", "''", $course['Course']);
            $name = trim($name);
            
            if($i == 0){
                $sqlInsertRow = $sqlInsertRow." ('".$course['Code']."', 
                '".$course['Teacher']."','".$name."', '".$course['Year']."', 
                '".$course['Semester']."')";
                $i = 1;
            }
            else{
                $sqlInsertRow = $sqlInsertRow.", ('".$course['Code']."', 
                '".$course['Teacher']."','".$name."', '".$course['Year']."', 
                '".$course['Semester']."')";
            }
            
        }
        $dbConn->exec($sqlInsertRow);
    }

    function setUpStudents()
    {
        $students = file_get_contents("./json/Students.json");
        
        $students = json_decode($students, true);
        global $dbConn;
        $sqlInsertRow = "insert or replace into users(idUser, userName, password, role, name, email, city, birthday, ssn) values";
        $i=0;
        foreach($students as $student){
            $name = str_replace("'", "''", $student['Name']);
            $name = trim($name);
            $surname = str_replace("'", "''", $student['Surname']);
            $surname = trim($surname);
            $city = str_replace("'", "''", $student['City']);
            $city = trim($city);
            
            if($i == 0){
                $sqlInsertRow = $sqlInsertRow . " (".$student['Id'].", '".$student['OfficialEmail']."', 'test', 'student', '".$name.' '.$surname."',
                '".$student['OfficialEmail']."', '".$city."', '".$student['Birthday']."', '".$student['SSN']."')";
                $i=1;
            }
            else{
                $sqlInsertRow = $sqlInsertRow . ", (".$student['Id'].", '".$student['OfficialEmail']."', 'test', 'student', '".$name.' '.$surname."',
                '".$student['OfficialEmail']."', '".$city."', '".$student['Birthday']."', '".$student['SSN']."')";
            }

        }
        $dbConn->exec($sqlInsertRow);
    }

    function setUpProfessors()
    {
        $professors = file_get_contents("./json/Professors.json");
        
        $professors = json_decode($professors, true);
        global $dbConn;
        $sqlInsertRow = "insert or replace into users(idUser, userName, password, role, name, email, city, birthday, ssn) values";
        $i=0;
        foreach($professors as $professor){
            $name = str_replace("'", "''", $professor['GivenName']);
            $name = trim($name);
            $surname = str_replace("'", "''", $professor['Surname']);
            $surname = trim($surname);
            
            if($i == 0){
                $sqlInsertRow = $sqlInsertRow . " ('".$professor['Number']."', '".$professor['OfficialEmail']."', 'test', 'teacher', '".$name.' '.$surname."',
                '".$professor['OfficialEmail']."', '', '', '".$professor['SSN']."')";
                $i=1;
            }
            else{
                $sqlInsertRow = $sqlInsertRow . ", ('".$professor['Number']."', '".$professor['OfficialEmail']."', 'test', 'teacher', '".$name.' '.$surname."',
                '".$professor['OfficialEmail']."', '', '', '".$professor['SSN']."')";
            }

        }
        $dbConn->exec($sqlInsertRow);
    }

    function setUpEnrollment()
    {
        $enrollments = file_get_contents("./json/Enrollment.json");
        
        $enrollments = json_decode($enrollments, true);
        global $dbConn;
        $sqlInsertRow = "insert or replace into enrollment(idUser, idCourse) values";
        $i=0;
        foreach($enrollments as $enrollment){
            if($i==0){
                $sqlInsertRow = $sqlInsertRow . " (".$enrollment['Student'].", '".$enrollment['Code']."')";
                $i=1;
            }
            else{
                $sqlInsertRow = $sqlInsertRow . ", (".$enrollment['Student'].", '".$enrollment['Code']."')";

            }
        }
        $dbConn->exec($sqlInsertRow);
    }

    function setUpLessons()
    {
        global $dbConn;
        $schedule = file_get_contents("./json/Schedule.json");
        $schedule = json_decode($schedule, true);
        //count number of days in a range
        $beginDate = new DateTime("2020-09-28");
        $endDate = new DateTime("2021-01-16");
        $totDays = $endDate->diff($beginDate)->format("%a");
        $actualDate = $beginDate;
        $totDays++;
        $sqlInsertLectures = "insert or replace into lessons(idCourse, idTeacher, idClassRoom, date, beginTime, endTime, inPresence, active) values";
        $sqlTakeTeacherId = "";
        $sqlupdateLecturesWithTeacher = "";
        $sqlInsertClassRoom = "";
        $j = 0;
        for($i = 0; $i < $totDays; $i++) 
        {
            $lessonsToBeAdded = array();
            $dayOfWeek = $actualDate->format('w');
            
            if($dayOfWeek == 0 || $dayOfWeek == 6 || $actualDate->format("Y-m-d") == '2020-11-01' || $actualDate->format("Y-m-d") == '2020-12-08' || !validDate($actualDate->format("Y-m-d"))) 
            {
                $actualDate->add(new DateInterval('P1D'));
                continue;
            }
            switch ($dayOfWeek) 
            {
                case '1':
                    //mon
                    $lecturesToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Mon';
                    }) ;
                    
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if($j == 0){
                            $sqlInsertLectures = $sqlInsertLectures ." ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                            $j = 1;
                            
                        }
                        else {
                            $sqlInsertLectures = $sqlInsertLectures .", ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                        }
                        
                        //$dbConn->exec($sqlInsertLectures);
                        
                    }
                break;
                case '2':
                    //tue
                    $lecturesToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Tue';
                    }) ;
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                        
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if($j == 0){
                            $sqlInsertLectures = $sqlInsertLectures." ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                            $j = 1;
                        }
                        else {
                            $sqlInsertLectures = $sqlInsertLectures.", ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                        }
                        //$dbConn->exec($sqlInsertLectures);
                        
                    }
                break;
                case '3':
                    //wed
                    $lecturesToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Wed';
                    }) ;
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                            
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if($j == 0){
                            $sqlInsertLectures = $sqlInsertLectures ." ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                            $j = 1;
                        }
                        else {
                            $sqlInsertLectures = $sqlInsertLectures .", ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                        }
                        //$dbConn->exec($sqlInsertLectures);
                        
                    }
                break;
                case '4':
                    //thu
                    $lecturesToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Thu';
                    }) ;
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                        
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if($j == 0){
                            $sqlInsertLectures = $sqlInsertLectures." ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                            $j = 1;
                        }
                        else {
                            $sqlInsertLectures = $sqlInsertLectures.", ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                        }
                        //$dbConn->exec($sqlInsertLectures);
                        
                    }
                break;
                case '5':
                    //fri
                    $lecturesToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Fri';
                    }) ;
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                            
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if($j == 0){
                            $sqlInsertLectures = $sqlInsertLectures." ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                            $j = 1;
                        }
                        else {
                            $sqlInsertLectures = $sqlInsertLectures.", ('".$lecture['Code']."', '-1', '".$lecture['Room']."', '".$actualDate->format("Y-m-d")."', '".$time[0]."', '".$time[1]."', 1, 1)";
                        }
                        //$dbConn->exec($sqlInsertLectures);
                        
                    }
                break;
            }
            
            $actualDate->add(new DateInterval('P1D'));
        }

        
        $dbConn->exec($sqlInsertLectures);
        //update idTeacher in lesssons table
        $sqlupdateLecturesWithTeacher = "update lessons 
        set idTeacher = (select idTeacher 
        FROM courses c
        where c.idCourse = lessons.idCourse)";
        $dbConn->exec($sqlupdateLecturesWithTeacher);                   
        
        //find all classRoom

        $classRooms = array();
        $classRooms = array_map(function($class){
            return array(
                'Room' => $class['Room'],
                'Seats' => $class['Seats']
            );
        }, $schedule);
        $classRooms = unique_multidim_array($classRooms, 'Room');
        $sqlinsertOrReplaceClassRoom = "";

        //insert or replace classRoom in classroom table

        foreach($classRooms as $classRoom){
            $sqlinsertOrReplaceClassRoom = "insert or replace into classroom(idClassRoom, totalSeats, room) values(
                '".$classRoom['Room']."', '".$classRoom['Seats']."','".$classRoom['Room']."')";
            $dbConn->exec($sqlinsertOrReplaceClassRoom);
        }
        

    }
    
    function unique_multidim_array($array, $key) {
        $temp_array = array();
        $i = 0;
        $key_array = array();
       
        foreach($array as $val) {
            if (!in_array($val[$key], $key_array)) {
                $key_array[$i] = $val[$key];
                $temp_array[$i] = $val;
            }
            $i++;
        }
        return $temp_array;
    }

    function validDate($actualDate){
        return $actualDate>'2021-01-06' || $actualDate<'2020-12-23';

    }


    function findStudentLessons($id)
    {
        global $dbConn;
        date_default_timezone_set("Europe/Rome");
        $dateForQuery = date("Y-m-d");
        $sql = "SELECT idLesson, date, beginTime
        from lessons L join enrollment E
        where L.idCourse=E.idCourse
        and E.idUser=" . $id . "
        and date>='" . $dateForQuery . "'
        and inPresence =1
        and active=1";
        $result = $dbConn->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            if ($row['date'] . " " . $row['beginTime'] >= date('Y-m-d H:i:s', strtotime("+1 hours", strtotime(date('Y-m-d H:i:s'))))) {
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


    function getHistoricalDataBookings($filterTime, $filterCourse, $active)
    {
        
        $nwfilterCourse = explode(',', $filterCourse);
        $nwfilterCourse = array_map(function($course){
            return "'$course'";
        }, $nwfilterCourse) ;
        $nwfilterCourse = implode(',', $nwfilterCourse);
        $filterCourse = $filterCourse == 'L.idCourse' ? 'L.idCourse' : $nwfilterCourse;
        
        
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
                L.idCourse IN (".($filterCourse == 'L.idCourse' ? $filterCourse : (''.$filterCourse.'')).")
        GROUP BY " . $filterTime . "
        ORDER BY year_month_week
        ";
        
        return returnData($filterTime, $sql);
    }

    function returnData($filter, $sql)
    {
        global $dbConn;
        $result = $dbConn->query($sql);
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

        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }

    
    function getHistoricalDataBookingsForTeacher($filterTime, $filterCourse, $active, $id)
    {
        global $dbConn;
        $nwfilterCourse = explode(',', $filterCourse);
        $nwfilterCourse = array_map(function($course){
            return "'$course'";
        }, $nwfilterCourse) ;
        $nwfilterCourse = implode(',', $nwfilterCourse);
        $filterCourse = $filterCourse == 'L.idCourse' ? 'L.idCourse' : $nwfilterCourse;
        
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
                L.idCourse IN (".($filterCourse == 'L.idCourse' ? $filterCourse : (''.$filterCourse.'')).")
        GROUP BY " . $filterTime . "
        ORDER BY year_month_week
        ";
        return returnData($filterTime, $sql);
    }



    //setUpCoursesDB();
    //setUpLessons();
    //setUpStudents();
    //setUpProfessors();
    //setUpEnrollment();
    $result = getHistoricalDataBookingsForTeacher('L.idLesson', 'L.idCourse', '1', '2');
    print_r(json_encode($result));
?>