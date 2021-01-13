<?php

use PHPUnit\Framework\TestCase;

class GatewaysSupportOfficerTest extends TestCase
{

    private $db;
    private $gatewaySupportOfficer;
    private $courses;
    private $enrollment;
    private $professors;
    private $students;
    private $lessons;

    public function testsetUpCoursesFound()
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
        $this->gatewaySupportOfficer = new Server\api\GatewaysSupportOfficer($this->db);
        $result = $this->gatewaySupportOfficer->setUpCourses($this->courses);
        $this->assertTrue($result);
    }

    public function testsetUpCoursesNotFound()
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

        $this->db = new \SQLite3('./tests/dbForTesting.db');
        $this->gatewaySupportOfficer = $this->getMockBuilder(Server\api\GatewaysSupportOfficer::class)
            ->setConstructorArgs([$this->db])
            ->setMethods(array('truncateCoursesTable'))
            ->getMock();
        $this->gatewaySupportOfficer
            ->expects($this->any())
            ->method('truncateCoursesTable')
            ->willReturn(false);
        $result = $this->gatewaySupportOfficer->setUpCourses($this->courses);
        $this->assertFalse($result);
    }

    public function testsetUpEnrollmentFound()
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
        $this->gatewaySupportOfficer = new Server\api\GatewaysSupportOfficer($this->db);
        $result = $this->gatewaySupportOfficer->setUpEnrollment($this->enrollment);
        $this->assertTrue($result);
    }

    public function testsetUpEnrollmentNotFound()
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

        $this->db = new \SQLite3('./tests/dbForTesting.db');
        $this->gatewaySupportOfficer = $this->getMockBuilder(Server\api\GatewaysSupportOfficer::class)
            ->setConstructorArgs([$this->db])
            ->setMethods(array('truncateEnrollmentTable'))
            ->getMock();
        $this->gatewaySupportOfficer
            ->expects($this->any())
            ->method('truncateEnrollmentTable')
            ->willReturn(false);
        $result = $this->gatewaySupportOfficer->setUpEnrollment($this->enrollment);
        $this->assertFalse($result);
    }

    public function testsetUpStudentsFound()
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
        $this->gatewaySupportOfficer = new Server\api\GatewaysSupportOfficer($this->db);
        $result = $this->gatewaySupportOfficer->setUpStudents($this->students);
        $this->assertTrue($result);
    }

    public function testsetUpStudentsNotFound()
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

        $this->db = new \SQLite3('./tests/dbForTesting.db');
        $this->gatewaySupportOfficer = $this->getMockBuilder(Server\api\GatewaysSupportOfficer::class)
            ->setConstructorArgs([$this->db])
            ->setMethods(array('truncateStudentsFromUsersTable'))
            ->getMock();
        $this->gatewaySupportOfficer
            ->expects($this->any())
            ->method('truncateStudentsFromUsersTable')
            ->willReturn(false);
        $result = $this->gatewaySupportOfficer->setUpStudents($this->students);
        $this->assertFalse($result);
    }

    public function testsetUpProfessorsFound()
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
        $this->gatewaySupportOfficer = new Server\api\GatewaysSupportOfficer($this->db);
        $result = $this->gatewaySupportOfficer->setUpProfessors($this->professors);
        $this->assertTrue($result);
    }

    public function testsetUpProfessorsNotFound()
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

        $this->db = new \SQLite3('./tests/dbForTesting.db');
        $this->gatewaySupportOfficer = $this->getMockBuilder(Server\api\GatewaysSupportOfficer::class)
            ->setConstructorArgs([$this->db])
            ->setMethods(array('truncateProfessorsFromUsersTable'))
            ->getMock();
        $this->gatewaySupportOfficer
            ->expects($this->any())
            ->method('truncateProfessorsFromUsersTable')
            ->willReturn(false);
        $result = $this->gatewaySupportOfficer->setUpProfessors($this->professors);
        $this->assertFalse($result);
    }

    public function testsetUpLessonsFound()
    {
        $this->lessons = file_get_contents("./tests/Schedule.json");
        $this->lessons = json_decode($this->lessons, true);


        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->gatewaySupportOfficer = new Server\api\GatewaysSupportOfficer($this->db);
        $result = $this->gatewaySupportOfficer->setUpLessons($this->lessons);
        $this->assertTrue($result);
    }

    public function testsetUpLessonsNotFoundtruncateLessonsTable()
    {
        $this->lessons = file_get_contents("./tests/Schedule.json");
        $this->lessons = json_decode($this->lessons, true);

        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->gatewaySupportOfficer = $this->getMockBuilder(Server\api\GatewaysSupportOfficer::class)
            ->setConstructorArgs([$this->db])
            ->setMethods(array('truncateLessonsTable'))
            ->getMock();
        $this->gatewaySupportOfficer
            ->expects($this->any())
            ->method('truncateLessonsTable')
            ->willReturn(false);
        $result = $this->gatewaySupportOfficer->setUpLessons($this->lessons);
        $this->assertFalse($result);
    }
    public function testsetUpLessonsNotFoundtruncateClassRoomsTable()
    {
        $this->lessons = file_get_contents("./tests/Schedule.json");
        $this->lessons = json_decode($this->lessons, true);

        $this->db = new \SQLite3('./tests/db_V3_testing.db');
        $this->gatewaySupportOfficer = $this->getMockBuilder(Server\api\GatewaysSupportOfficer::class)
            ->setConstructorArgs([$this->db])
            ->setMethods(array('truncateClassRoomsTable'))
            ->getMock();
        $this->gatewaySupportOfficer
            ->expects($this->any())
            ->method('truncateClassRoomsTable')
            ->willReturn(false);
        $result = $this->gatewaySupportOfficer->setUpLessons($this->lessons);
        $this->assertFalse($result);
    }
    public function testFindGeneralSchedule()
    {
        $this->db = new SQLite3("./tests/dbStatistics.db");
        $this->gatewaySupportOfficer = new Server\api\GatewaysSupportOfficer($this->db);
        $idCourse = '2';
        $result = $this->gatewaySupportOfficer->findGeneralSchedule($idCourse);
        $this->assertIsArray($result);
    }
}
