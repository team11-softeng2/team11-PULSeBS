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
    
}
?>