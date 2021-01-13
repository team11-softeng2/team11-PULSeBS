<?php

use PHPUnit\Framework\TestCase;

class ControllersSupportOfficerTest extends TestCase
{
    private $db;
    private $controller;
    private $courses;
    private $enrollment;
    private $professors;
    private $students;
    private $lessons;
    private $requestMethod;
    private $value;
    private $id;

    public function testsetUpCoursesTrue()
    {
        $this->courses = json_decode('[
            {
              "Code": "XY1211",
              "Year": 1,
              "Semester": 1,
              "Course": "Metodi di finanziamento delle imprese",
              "Teacher": "d9000"
            },
            {
              "Code": "XY4911",
              "Year": 1,
              "Semester": 1,
              "Course": "Chimica",
              "Teacher": "d9001"
            },
            {
              "Code": "XY8612",
              "Year": 1,
              "Semester": 2,
              "Course": "Informatica",
              "Teacher": "d9002"
            },
            {
              "Code": "XY2312",
              "Year": 1,
              "Semester": 2,
              "Course": "Fisica I",
              "Teacher": "d9003"
            },
            {
              "Code": "XY6012",
              "Year": 1,
              "Semester": 2,
              "Course": "Algebra lineare e geometria",
              "Teacher": "d9004"
            },
            {
              "Code": "XY9712",
              "Year": 1,
              "Semester": 2,
              "Course": "Economia e organizzazione aziendale",
              "Teacher": "d9005"
            },
            {
              "Code": "XY3412",
              "Year": 1,
              "Semester": 2,
              "Course": "Economia e organizzazione aziendale",
              "Teacher": "d9006"
            },
            {
              "Code": "XY7121",
              "Year": 2,
              "Semester": 1,
              "Course": "Analisi matematica II",
              "Teacher": "d9007"
            }
        ]', true);
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpCourses';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpCourses($this->courses);
        $this->assertEquals(1, $result);
    }
    public function testsetUpCoursesFalse()
    {
        $this->courses = json_decode('[
            {
              "Code": "XY1211",
              "Year": 1,
              "Semester": 1,
              "Course": "Metodi di finanziamento delle imprese",
              "Teacher": "d9000"
            },
            {
              "Code": "XY4911",
              "Year": 1,
              "Semester": 1,
              "Course": "Chimica",
              "Teacher": "d9001"
            },
            {
              "Code": "XY8612",
              "Year": 1,
              "Semester": 2,
              "Course": "Informatica",
              "Teacher": "d9002"
            },
            {
              "Code": "XY2312",
              "Year": 1,
              "Semester": 2,
              "Course": "Fisica I",
              "Teacher": "d9003"
            },
            {
              "Code": "XY6012",
              "Year": 1,
              "Semester": 2,
              "Course": "Algebra lineare e geometria",
              "Teacher": "d9004"
            },
            {
              "Code": "XY9712",
              "Year": 1,
              "Semester": 2,
              "Course": "Economia e organizzazione aziendale",
              "Teacher": "d9005"
            },
            {
              "Code": "XY3412",
              "Year": 1,
              "Semester": 2,
              "Course": "Economia e organizzazione aziendale",
              "Teacher": "d9006"
            },
            {
              "Code": "XY7121",
              "Year": 2,
              "Semester": 1,
              "Course": "Analisi matematica II",
              "Teacher": "d9007"
            }
        ]', true);
        //$this->db = new \SQLite3('./tests/db_V2_testing.db');
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['exec'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('exec')
            ->willReturn(false);
        $this->requestMethod = 'POST';
        $this->value = 'setUpCourses';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpCourses($this->courses);
        $this->assertEquals(0, $result);
    }
    public function testsetUpEnrollemntTrue()
    {
        $this->enrollment = json_decode('
            [
                {
                    "Code": "XY1211",
                    "Student": 902800
                },
                {
                    "Code": "XY1211",
                    "Student": 902799
                },
                {
                    "Code": "XY1211",
                    "Student": 902798
                },
                {
                    "Code": "XY1211",
                    "Student": 902797
                }
            ]
        ', true);

        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpEnrollment';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpEnrollment($this->enrollment);
        $this->assertEquals(1, $result);
    }
    public function testsetUpEnrollemntFalse()
    {
        $this->enrollment = json_decode('
            [
                {
                    "Code": "XY1211",
                    "Student": 902800
                },
                {
                    "Code": "XY1211",
                    "Student": 902799
                },
                {
                    "Code": "XY1211",
                    "Student": 902798
                },
                {
                    "Code": "XY1211",
                    "Student": 902797
                }
            ]
        ', true);
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['exec'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('exec')
            ->willReturn(false);
        $this->requestMethod = 'POST';
        $this->value = 'setUpEnrollment';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpEnrollment($this->enrollment);
        $this->assertEquals(0, $result);
    }
    public function testsetUpStudentsTrue()
    {
        $this->students = json_decode('
            [
                {
                    "Id": 900000,
                    "Name": "Ambra",
                    "Surname": "Ferri",
                    "City": "Poggio Ferro",
                    "OfficialEmail": "s900000@students.politu.it",
                    "Birthday": "1991-11-04",
                    "SSN": "MK97060783"
                },
                {
                    "Id": 900001,
                    "Name": "Gianfranco",
                    "Surname": "Trentini",
                    "City": "Fenestrelle",
                    "OfficialEmail": "s900001@students.politu.it",
                    "Birthday": "1991-11-05",
                    "SSN": "SP80523410"
                },
                {
                    "Id": 900002,
                    "Name": "Maria Rosa",
                    "Surname": "Pugliesi",
                    "City": "Villapiccola",
                    "OfficialEmail": "s900002@students.politu.it",
                    "Birthday": "1991-11-05",
                    "SSN": "ZO70355767"
                }
            ]
        ', true);

        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpStudents';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpStudents($this->students);
        $this->assertEquals(1, $result);
    }
    public function testsetUpStudentsFalse()
    {
        $this->students = json_decode('
            [
                {
                    "Id": 900000,
                    "Name": "Ambra",
                    "Surname": "Ferri",
                    "City": "Poggio Ferro",
                    "OfficialEmail": "s900000@students.politu.it",
                    "Birthday": "1991-11-04",
                    "SSN": "MK97060783"
                },
                {
                    "Id": 900001,
                    "Name": "Gianfranco",
                    "Surname": "Trentini",
                    "City": "Fenestrelle",
                    "OfficialEmail": "s900001@students.politu.it",
                    "Birthday": "1991-11-05",
                    "SSN": "SP80523410"
                },
                {
                    "Id": 900002,
                    "Name": "Maria Rosa",
                    "Surname": "Pugliesi",
                    "City": "Villapiccola",
                    "OfficialEmail": "s900002@students.politu.it",
                    "Birthday": "1991-11-05",
                    "SSN": "ZO70355767"
                }
            ]
        ', true);

        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['exec'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('exec')
            ->willReturn(false);
        $this->requestMethod = 'POST';
        $this->value = 'setUpStudents';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpStudents($this->students);
        $this->assertEquals(0, $result);
    }
    public function testsetUpProfessorsTrue()
    {
        $this->professors = json_decode('
            [
                {
                    "Number": "d9000",
                    "GivenName": "Ines",
                    "Surname": "Beneventi",
                    "OfficialEmail": "Ines.Beneventi@politu.it",
                    "SSN": "XT6141393"
                },
                {
                    "Number": "d9001",
                    "GivenName": "Nino",
                    "Surname": "Lucciano",
                    "OfficialEmail": "Nino.Lucciano@politu.it",
                    "SSN": "BC32576022"
                },
                {
                    "Number": "d9002",
                    "GivenName": "Agostina",
                    "Surname": "Costa",
                    "OfficialEmail": "Agostina.Costa@politu.it",
                    "SSN": "OV16025746"
                }
            ]
        ', true);
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpProfessors';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpProfessors($this->professors);
        $this->assertEquals(1, $result);
    }
    public function testsetUpProfessorsFalse()
    {
        $this->professors = json_decode('
            [
                {
                    "Number": "d9000",
                    "GivenName": "Ines",
                    "Surname": "Beneventi",
                    "OfficialEmail": "Ines.Beneventi@politu.it",
                    "SSN": "XT6141393"
                },
                {
                    "Number": "d9001",
                    "GivenName": "Nino",
                    "Surname": "Lucciano",
                    "OfficialEmail": "Nino.Lucciano@politu.it",
                    "SSN": "BC32576022"
                },
                {
                    "Number": "d9002",
                    "GivenName": "Agostina",
                    "Surname": "Costa",
                    "OfficialEmail": "Agostina.Costa@politu.it",
                    "SSN": "OV16025746"
                }
            ]
        ', true);
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['exec'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('exec')
            ->willReturn(false);
        $this->requestMethod = 'POST';
        $this->value = 'setUpProfessors';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpProfessors($this->professors);
        $this->assertEquals(0, $result);
    }
    public function testsetUpLessonsTrue()
    {
        $this->lessons = file_get_contents("./tests/Schedule.json");
        $this->lessons = json_decode($this->lessons, true);
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpLessons';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpLessons($this->lessons);
        $this->assertEquals(1, $result);
    }
    public function testsetUpLessonsFalse()
    {
        $this->lessons = file_get_contents("./tests/Schedule.json");
        $this->lessons = json_decode($this->lessons, true);
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['exec'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('exec')
            ->willReturn(false);
        $this->requestMethod = 'POST';
        $this->value = 'setUpLessons';
        $this->id = -1;
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->setUpLessons($this->lessons);
        $this->assertEquals(0, $result);
    }


    //**********************------------------------------------
    //process request method------------------------------------
    //**********************------------------------------------

    public function testProcessRequest_setUpCoursesTrue()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpCourses';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpCourses'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpCourses')
            ->willReturn(1);
        $result = $this->controller->processRequest();
        $this->assertEquals(1, $result);
    }
    public function testProcessRequest_setUpCoursesFalse()
    {
        $this->courses = json_decode('[
            {
              "Code": "XY1211",
              "Year": 1,
              "Semester": 1,
              "Course": "Metodi di finanziamento delle imprese",
              "Teacher": "d9000"
            },
            {
              "Code": "XY4911",
              "Year": 1,
              "Semester": 1,
              "Course": "Chimica",
              "Teacher": "d9001"
            },
            {
              "Code": "XY8612",
              "Year": 1,
              "Semester": 2,
              "Course": "Informatica",
              "Teacher": "d9002"
            },
            {
              "Code": "XY2312",
              "Year": 1,
              "Semester": 2,
              "Course": "Fisica I",
              "Teacher": "d9003"
            },
            {
              "Code": "XY6012",
              "Year": 1,
              "Semester": 2,
              "Course": "Algebra lineare e geometria",
              "Teacher": "d9004"
            },
            {
              "Code": "XY9712",
              "Year": 1,
              "Semester": 2,
              "Course": "Economia e organizzazione aziendale",
              "Teacher": "d9005"
            },
            {
              "Code": "XY3412",
              "Year": 1,
              "Semester": 2,
              "Course": "Economia e organizzazione aziendale",
              "Teacher": "d9006"
            },
            {
              "Code": "XY7121",
              "Year": 2,
              "Semester": 1,
              "Course": "Analisi matematica II",
              "Teacher": "d9007"
            }
        ]', true);
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpCourses';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpCourses'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpCourses')
            ->willReturn(0);
        $result = $this->controller->processRequest();
        $this->assertEquals(0, $result);
    }
    public function testProcessRequest_setUpEnrollemntTrue()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpEnrollment';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpEnrollment'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpEnrollment')
            ->willReturn(1);
        $result = $this->controller->processRequest();
        $this->assertEquals(1, $result);
    }
    public function testProcessRequest_setUpEnrollemntFalse()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpEnrollment';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpEnrollment'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpEnrollment')
            ->willReturn(0);
        $result = $this->controller->processRequest();
        $this->assertEquals(0, $result);
    }
    public function testProcessRequest_setUpStudentsTrue()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpStudents';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpStudents'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpStudents')
            ->willReturn(1);
        $result = $this->controller->processRequest();
        $this->assertEquals(1, $result);
    }
    public function testProcessRequest_setUpStudentsFalse()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpStudents';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpStudents'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpStudents')
            ->willReturn(0);
        $result = $this->controller->processRequest();
        $this->assertEquals(0, $result);
    }
    public function testProcessRequest_setUpProfessorsTrue()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpProfessors';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpProfessors'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpProfessors')
            ->willReturn(1);
        $result = $this->controller->processRequest();
        $this->assertEquals(1, $result);
    }
    public function testProcessRequest_setUpProfessorsFalse()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpProfessors';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpProfessors'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpProfessors')
            ->willReturn(0);
        $result = $this->controller->processRequest();
        $this->assertEquals(0, $result);
    }
    public function testProcessRequest_setUpLessonsTrue()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpLessons';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpLessons'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpLessons')
            ->willReturn(1);
        $result = $this->controller->processRequest();
        $this->assertEquals(1, $result);
    }
    public function testProcessRequest_setUpLessonsFalse()
    {
        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->requestMethod = 'POST';
        $this->value = 'setUpLessons';
        $this->id = -1;
        //$this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $this->controller = $this->getMockBuilder(Server\api\ControllersSupportOfficer::class)
            ->setConstructorArgs([$this->requestMethod, $this->db, $this->value, $this->id])
            ->setMethods(array('setUpLessons'))
            ->getMock();
        $this->controller
            ->expects($this->any())
            ->method('setUpLessons')
            ->willReturn(0);
        $result = $this->controller->processRequest();
        $this->assertEquals(0, $result);
    }
    public function testFindGeneralSchedule()
    {
        $this->db = new SQLite3("./tests/dbStatistics.db");
        $this->requestMethod = 'GET';
        $this->value = 'findGeneralSchedule';
        $this->id = '2';
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $output = $this->controller->findGeneralSchedule($this->id);
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }
    public function testProcessRequest_findGeneralSchedule()
    {
        $this->db = new SQLite3("./tests/dbStatistics.db");
        $this->requestMethod = 'GET';
        $this->value = 'findGeneralSchedule';
        $this->id = '2';
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }
    public function testProcessRequest_findGeneralScheduleNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->requestMethod = 'GET';
        $this->value = 'findGeneralSchedule';
        $this->id = '2';
        $this->controller = new Server\api\ControllersSupportOfficer($this->requestMethod, $this->db, $this->value, $this->id);
        $output = $this->controller->processRequest();
        $this->assertTrue(empty($output));
    }
}
