<?php


use PHPUnit\Framework\TestCase;

class GatewaysStudentBookingTest extends TestCase
{
    
    private $db;
    private $gatewayStudentBooking;
    private $idStudent;
    public function setUp(): void
    {
        
    }

    public function testFindStudentLessonsFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->id = 7;
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        // $exceptedData = array();
        $dataExcepted = array();
        $result = $this->gatewayStudentBooking->findStudentLessons($this->id);
        $this->assertIsArray($result);
        
    }
    public function testFindStudentLessonsNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 7;
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $dataExcepted = array();
        $result = $this->gatewayStudentBooking->findStudentLessons($this->id);
        //print_r($result);
        $this->assertEquals(0, $result);
    }
    public function testFindBookedLessonFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->id = 7;
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $dataExcepted = array();
        $result = $this->gatewayStudentBooking->findStundetBookedLessons($this->id);
        $this->assertIsArray($result);
        
    }
    public function testFindBookedLessonNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 7;
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $dataExcepted = array();
        $result = $this->gatewayStudentBooking->findStundetBookedLessons($this->id);
        $this->assertEquals(0, $result);
    }

    public function testFindLessonsWithFullRoomFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $dataExcepted = array();
        $result = $this->gatewayStudentBooking->findLessonsWithFullRoom();
        $this->assertIsArray($result);
        
    }
    public function testFindLessonsWithFullRoomNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $dataExcepted = array();
        $result = $this->gatewayStudentBooking->findLessonsWithFullRoom();
        $this->assertEquals(0, $result);
    }

    public function testfindDetailsOfLessonsFound(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $arrayForTest = array(1, 2, 3);
        $result = $this->gatewayStudentBooking->findDetailsOfLessons($arrayForTest);
        $this->assertIsArray($result);
        
    }
    public function testfindDetailsOfLessonsNotFound(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $arrayForTest = array(1, 2, 3);
        $result = $this->gatewayStudentBooking->findDetailsOfLessons($arrayForTest);
        $this->assertEquals(0, $result);

    
    }
    public function testInsertNewBookingWorked(){
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->restoreDB();
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $bookForTest = new class{
            public $idUser = 20;
            public $idLesson = 20;
            public $date = "2021-12-20 11:00:00";

        };
        $result = $this->gatewayStudentBooking->insertBooking($bookForTest);
        $this->assertIsInt($result);
    }
    public function testUpdateBooking(){
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->gatewayStudentBooking = new Server\api\GatewaysStudentBooking($this->db);
        $idBooking = 2;
        $lineUpdated = $this->gatewayStudentBooking->updateBooking($idBooking);
        $this->assertEquals(1, $lineUpdated);
        $this->restoreValueAfterUpdate();
    }    

    protected function restoreDB(){
        $this->db->exec('DROP TABLE IF EXISTS "lessons";
        CREATE TABLE IF NOT EXISTS "lessons" (
            "idLesson"	INTEGER,
            "idCourse"	INTEGER,
            "idTeacher"	INTEGER,
            "idClassRoom"	INTEGER,
            "date"	TEXT,
            "beginTime"	TEXT,
            "endTime"	TEXT,
            "type"	TEXT,
            "active"	INTEGER,
            PRIMARY KEY("idLesson" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "ClassRoom";
        CREATE TABLE IF NOT EXISTS "ClassRoom" (
            "idClassRoom"	INTEGER,
            "totalSeats"	INTEGER,
            PRIMARY KEY("idClassRoom" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "enrollment";
        CREATE TABLE IF NOT EXISTS "enrollment" (
            "idEnrollment"	INTEGER,
            "idUser"	INTEGER,
            "idCourse"	INTEGER,
            PRIMARY KEY("idEnrollment" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "booking";
        CREATE TABLE IF NOT EXISTS "booking" (
            "idBooking"	INTEGER,
            "idUser"	INTEGER,
            "idLesson"	INTEGER,
            "active"	INTEGER,
            "date"	TEXT,
            "isWaiting"	INTEGER,
            PRIMARY KEY("idBooking" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "courses";
        CREATE TABLE IF NOT EXISTS "courses" (
            "idCourse"	INTEGER,
            "idTeacher"	INTEGER,
            "name"	TEXT,
            PRIMARY KEY("idCourse" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "users";
        CREATE TABLE IF NOT EXISTS "users" (
            "idUser"	INTEGER NOT NULL UNIQUE,
            "userName"	TEXT,
            "password"	TEXT,
            "role"	TEXT,
            "name"	TEXT,
            PRIMARY KEY("idUser" AUTOINCREMENT)
        );');
    }
    protected function restoreValueAfterUpdate(){
        $this->db->exec("update booking set active=1 where idBooking=2");
    }
}
?>