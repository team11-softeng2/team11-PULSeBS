<?php


use PHPUnit\Framework\TestCase;

class ControllersStudentBookingTest extends TestCase
{
    
    private $db;
    private $controllersStudentBooking;

    public function setUp(): void
    {
        
    }
    public function testfindBookableLessonsFound(){
        $id = 7;
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $result = $this->controllersStudentBooking->findBookableLessons();
        $this->assertTrue(( json_decode( $result , true ) == NULL ) ? false : true);
    }
    public function testfindBookableLessonsNotFound(){
        $id = 7;
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $result = $this->controllersStudentBooking->findBookableLessons();
        $this->assertEquals(0, $result);
    }

    public function testStudentBookingProcessRequestOutput(){
        $id = 7;
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $this->controllersStudentBooking->processRequest();
        $output = $this->getActualOutput();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
        
    }
    public function testStudentBookingProcessRequestZeroOutput(){
        $id = 7;
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->expectOutputString('0');
        $this->controllersStudentBooking = new Server\api\ControllersStudentBooking("GET", $this->db, "bookableLessons", $id);
        $this->controllersStudentBooking->processRequest();
        //$this->assertFalse(empty($output));
        
    }
}
?>