<?php

namespace Server\api;

class GatewaysSupportOfficer
{
    private $db = null;
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function setUpCourses($courses)
    {
        $sqlInsertRow = "insert or replace into courses(idCourse, idTeacher, name, year, semester) values";
        $i = 0;
        foreach ($courses as $course) {
            $name = str_replace("'", "''", $course['Course']);
            $name = trim($name);

            if ($i == 0) {
                $sqlInsertRow = $sqlInsertRow . " ('" . $course['Code'] . "', 
                '" . $course['Teacher'] . "','" . $name . "', '" . $course['Year'] . "', 
                '" . $course['Semester'] . "')";
                $i = 1;
            } else {
                $sqlInsertRow = $sqlInsertRow . ", ('" . $course['Code'] . "', 
                '" . $course['Teacher'] . "','" . $name . "', '" . $course['Year'] . "', 
                '" . $course['Semester'] . "')";
            }
        }
        return $this->db->exec($sqlInsertRow);
    }

    public function setUpStudents($students)
    {

        $sqlInsertRow = "insert or replace into users(idUser, userName, password, role, name, email, city, birthday, ssn) values";
        $i = 0;
        foreach ($students as $student) {
            $name = str_replace("'", "''", $student['Name']);
            $name = trim($name);
            $surname = str_replace("'", "''", $student['Surname']);
            $surname = trim($surname);
            $city = str_replace("'", "''", $student['City']);
            $city = trim($city);

            if ($i == 0) {
                $sqlInsertRow = $sqlInsertRow . " (" . $student['Id'] . ", '" . $student['OfficialEmail'] . "', 'test', 'student', '" . $name . ' ' . $surname . "',
                '" . $student['OfficialEmail'] . "', '" . $city . "', '" . $student['Birthday'] . "', '" . $student['SSN'] . "')";
                $i = 1;
            } else {
                $sqlInsertRow = $sqlInsertRow . ", (" . $student['Id'] . ", '" . $student['OfficialEmail'] . "', 'test', 'student', '" . $name . ' ' . $surname . "',
                '" . $student['OfficialEmail'] . "', '" . $city . "', '" . $student['Birthday'] . "', '" . $student['SSN'] . "')";
            }
        }
        return $this->db->exec($sqlInsertRow);
    }

    public function setUpProfessors($professors)
    {
        $sqlInsertRow = "insert or replace into users(idUser, userName, password, role, name, email, city, birthday, ssn) values";
        $i = 0;
        foreach ($professors as $professor) {
            $name = str_replace("'", "''", $professor['GivenName']);
            $name = trim($name);
            $surname = str_replace("'", "''", $professor['Surname']);
            $surname = trim($surname);

            if ($i == 0) {
                $sqlInsertRow = $sqlInsertRow . " ('" . $professor['Number'] . "', '" . $professor['OfficialEmail'] . "', 'test', 'teacher', '" . $name . ' ' . $surname . "',
                '" . $professor['OfficialEmail'] . "', '', '', '" . $professor['SSN'] . "')";
                $i = 1;
            } else {
                $sqlInsertRow = $sqlInsertRow . ", ('" . $professor['Number'] . "', '" . $professor['OfficialEmail'] . "', 'test', 'teacher', '" . $name . ' ' . $surname . "',
                '" . $professor['OfficialEmail'] . "', '', '', '" . $professor['SSN'] . "')";
            }
        }
        return $this->db->exec($sqlInsertRow);
    }

    public function setUpEnrollment($enrollments)
    {
        $sqlInsertRow = "insert or replace into enrollment(idUser, idCourse) values";
        $i = 0;
        foreach ($enrollments as $enrollment) {
            if ($i == 0) {
                $sqlInsertRow = $sqlInsertRow . " (" . $enrollment['Student'] . ", '" . $enrollment['Code'] . "')";
                $i = 1;
            } else {
                $sqlInsertRow = $sqlInsertRow . ", (" . $enrollment['Student'] . ", '" . $enrollment['Code'] . "')";
            }
        }
        return $this->db->exec($sqlInsertRow);
    }

    public function setUpLessons($schedule)
    {
        
        //count number of days in a range
        $beginDate = new \DateTime("2020-09-28");
        $endDate = new \DateTime("2021-01-16");
        $totDays = $endDate->diff($beginDate)->format("%a");
        $actualDate = $beginDate;
        $totDays++;
        $sqlInsertLectures = "insert or replace into lessons(idCourse, idTeacher, idClassRoom, date, beginTime, endTime, inPresence, active) values";
        $sqlTakeTeacherId = "";
        $sqlupdateLecturesWithTeacher = "";
        $sqlInsertClassRoom = "";
        $j = 0;
        for ($i = 0; $i < $totDays; $i++) {
            $lessonsToBeAdded = array();
            $dayOfWeek = $actualDate->format('w');

            if ($dayOfWeek == 0 || $dayOfWeek == 6 || $actualDate->format("Y-m-d") == '2020-11-01' || $actualDate->format("Y-m-d") == '2020-12-08' || !$this->validDate($actualDate->format("Y-m-d"))) {
                $actualDate->add(new \DateInterval('P1D'));
                continue;
            }
            switch ($dayOfWeek) {
                case '1':
                    //mon
                    $lecturesToBeAdded = array_filter($schedule, function ($val) {
                        return $val['Day'] == 'Mon';
                    });

                    foreach ($lecturesToBeAdded as $lecture) {
                        //insert on lessons table
                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if ($j == 0) {
                            $sqlInsertLectures = $sqlInsertLectures . " ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                            $j = 1;
                        } else {
                            $sqlInsertLectures = $sqlInsertLectures . ", ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                        }


                    }
                    break;
                case '2':
                    //tue
                    $lecturesToBeAdded = array_filter($schedule, function ($val) {
                        return $val['Day'] == 'Tue';
                    });
                    foreach ($lecturesToBeAdded as $lecture) {
                        //insert on lessons table

                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if ($j == 0) {
                            $sqlInsertLectures = $sqlInsertLectures . " ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                            $j = 1;
                        } else {
                            $sqlInsertLectures = $sqlInsertLectures . ", ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                        }
                        

                    }
                    break;
                case '3':
                    //wed
                    $lecturesToBeAdded = array_filter($schedule, function ($val) {
                        return $val['Day'] == 'Wed';
                    });
                    foreach ($lecturesToBeAdded as $lecture) {
                        //insert on lessons table

                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if ($j == 0) {
                            $sqlInsertLectures = $sqlInsertLectures . " ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                            $j = 1;
                        } else {
                            $sqlInsertLectures = $sqlInsertLectures . ", ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                        }
                        

                    }
                    break;
                case '4':
                    //thu
                    $lecturesToBeAdded = array_filter($schedule, function ($val) {
                        return $val['Day'] == 'Thu';
                    });
                    foreach ($lecturesToBeAdded as $lecture) {
                        //insert on lessons table

                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if ($j == 0) {
                            $sqlInsertLectures = $sqlInsertLectures . " ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                            $j = 1;
                        } else {
                            $sqlInsertLectures = $sqlInsertLectures . ", ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                        }
                        

                    }
                    break;
                case '5':
                    //fri
                    $lecturesToBeAdded = array_filter($schedule, function ($val) {
                        return $val['Day'] == 'Fri';
                    });
                    foreach ($lecturesToBeAdded as $lecture) {
                        //insert on lessons table

                        //insertLecture 
                        $time = explode("-", $lecture['Time']);
                        $time[0] = strftime('%H:%M', strtotime($time[0]));
                        $time[1] = strftime('%H:%M', strtotime($time[1]));
                        if ($j == 0) {
                            $sqlInsertLectures = $sqlInsertLectures . " ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                            $j = 1;
                        } else {
                            $sqlInsertLectures = $sqlInsertLectures . ", ('" . $lecture['Code'] . "', '-1', '" . $lecture['Room'] . "', '" . $actualDate->format("Y-m-d") . "', '" . $time[0] . "', '" . $time[1] . "', 1, 1)";
                        }
                        

                    }
                    break;
            }

            $actualDate->add(new \DateInterval('P1D'));
        }


        $return = $this->db->exec($sqlInsertLectures);
        //update idTeacher in lesssons table
        $sqlupdateLecturesWithTeacher = "update lessons 
        set idTeacher = (select idTeacher 
        FROM courses c
        where c.idCourse = lessons.idCourse)";
        $this->db->exec($sqlupdateLecturesWithTeacher);

        //find all classRoom

        $classRooms = array();
        $classRooms = array_map(function ($class) {
            return array(
                'Room' => $class['Room'],
                'Seats' => $class['Seats']
            );
        }, $schedule);
        $classRooms = $this->unique_multidim_array($classRooms, 'Room');
        $sqlinsertOrReplaceClassRoom = "";

        //insert or replace classRoom in classroom table

        foreach ($classRooms as $classRoom) {
            $sqlinsertOrReplaceClassRoom = "insert or replace into classroom(idClassRoom, totalSeats, room) values(
                '" . $classRoom['Room'] . "', '" . $classRoom['Seats'] . "','" . $classRoom['Room'] . "')";
            $this->db->exec($sqlinsertOrReplaceClassRoom);
        }
        return $return;
    }

    public function unique_multidim_array($array, $key)
    {
        $temp_array = array();
        $i = 0;
        $key_array = array();

        foreach ($array as $val) {
            if (!in_array($val[$key], $key_array)) {
                $key_array[$i] = $val[$key];
                $temp_array[$i] = $val;
            }
            $i++;
        }
        return $temp_array;
    }

    public function validDate($actualDate)
    {
        return $actualDate > '2021-01-06' || $actualDate < '2020-12-23';
    }
}
