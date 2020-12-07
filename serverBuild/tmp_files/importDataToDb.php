<?php


    
    // $Enrollment = null;
    // $Professors = null;
    // $Students

    
        $dbConn = new SQLite3("./db_V2.db");
        
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
                $sqlInsertRow = $sqlInsertRow . " ('".$enrollment['Code']."', ".$enrollment['Student'].")";
                $i=1;
            }
            else{
                $sqlInsertRow = $sqlInsertRow . ", ('".$enrollment['Code']."', ".$enrollment['Student'].")";

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
                    $lessonsToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Tue';
                    }) ;
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                        
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
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
                    $lessonsToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Wed';
                    }) ;
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                            
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
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
                    $lessonsToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Thu';
                    }) ;
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                        
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
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
                    $lessonsToBeAdded = array_filter($schedule, function($val) {
                        return $val['Day'] == 'Fri';
                    }) ;
                    foreach($lecturesToBeAdded as $lecture){
                        //insert on lessons table
                            
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
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
    
    //setUpCoursesDB();
    //setUpLessons();
    //setUpStudents();
    //setUpProfessors();
    setUpEnrollment();
    
?>