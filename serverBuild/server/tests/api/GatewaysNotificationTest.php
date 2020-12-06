<?php
use PHPUnit\Framework\TestCase;

class GatewaysNotificationTest extends TestCase
{

    private $db;
    private $gatewayNotification;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbEmail.db");
        $this->gatewayNotification = new Server\api\GatewaysNotification($this->db);
        $this->updateEmails();
        $this->updateDates();
    }

    public function testStudentsAttendingNextLecture()
    {
        $result = $this->gatewayNotification->sendEmail('studentsAttendingNextLecture', '0');
        $this->assertIsInt($result);
        $this->assertEquals(6, $result);
    }

    public function testStudentsAttendingNextLectureNotFound()
    {
        $this->updateDatesToFuture();
        $result = $this->gatewayNotification->sendEmail('studentsAttendingNextLecture', '0');
        $this->assertIsInt($result);
        $this->assertEquals(0, $result);
    }

    public function testBookingConfirmation()
    {
        $result = $this->gatewayNotification->sendEmail('bookingConfirmation', '1');
        $this->assertIsInt($result);
        $this->assertEquals(1, $result);
    }

    public function testBookingConfirmationNotFound()
    {
        $result = $this->gatewayNotification->sendEmail('bookingConfirmation', '0');
        $this->assertIsInt($result);
        $this->assertEquals(0, $result);
    }

    public function testLectureCancelled()
    {
        $result = $this->gatewayNotification->sendEmail('lectureCancelled', '3');
        $this->assertIsInt($result);
        $this->assertEquals(4, $result);
    }

    public function testLectureCancelledNotFound()
    {
        $result = $this->gatewayNotification->sendEmail('lectureCancelled', '0');
        $this->assertIsInt($result);
        $this->assertEquals(0, $result);
    }

    public function testTakenFromWaitingList()
    {
        $result = $this->gatewayNotification->sendEmail('takenFromWaitingList', '1');
        $this->assertIsInt($result);
        $this->assertEquals(1, $result);
    }

    public function testTakenFromWaitingListNotFound()
    {
        $result = $this->gatewayNotification->sendEmail('takenFromWaitingList', '0');
        $this->assertIsInt($result);
        $this->assertEquals(0, $result);
    }

    public function testWrongEmail()
    {
        $result = $this->gatewayNotification->sendEmail('nonExistentEmailType', '99');
        $this->assertIsInt($result);
        $this->assertEquals(0, $result);
    }

    public function testDispatch()
    {
        $queue = array(array('to' => 'student@pulsebs.it', 'userName' => 'Test Suite Student', 'subject' => 'Automated Test', 'body' => 'This was an automated test done with PHP Unit. Please ignore this email'));
        $result = $this->gatewayNotification->dispatch($queue);
        $this->assertIsInt($result);
        $this->assertEquals(1, $result);
    }

    public function testDispatchWithWrongAddressException()
    {
        $queue = array(array('to' => 'student!@#$%^&*()_~@pulsebs.it', 'userName' => 'Test Suite Student', 'subject' => 'Automated Test', 'body' => 'This was an automated test done with PHP Unit. Please ignore this email'));
        $result = $this->gatewayNotification->dispatch($queue);
        $this->assertIsString($result);
        $this->assertEquals("Invalid Address.", $result);
    }

    // public function testDispatchWithTimeoutException()
    // {
    //     // Create a stub for the SomeClass class.
    //     $stub = $this->createStub(Server\api\GatewaysNotification::class);
    //     // Configure the stub.
    //     $stub->method('dispatch')
    //         ->will($this->throwException(new Exception("Mailer Error.")));

    //     $queue = array(array('to' => 'student@pulsebs.it', 'userName' => 'Test Suite Student', 'subject' => 'Automated Test', 'body' => 'This was an automated test done with PHP Unit. Please ignore this email'));
    //     // $this->assertIsString($result);
    //     $this->assertEquals("Mailer Error.", $stub->dispatch($queue));
    // }

    protected function updateEmails()
    {
        $this->db->exec("update users set email='teacher@pulsebs.it' where role='teacher'");
        $this->db->exec("update users set email='student@pulsebs.it' where role='student'");
    }

    protected function updateDates()
    {
        $this->db->exec("update booking set date=datetime('now', '1 days')");
        $this->db->exec("update lessons set date=date('now', '1 days');");
    }

    protected function updateDatesToFuture()
    {
        $this->db->exec("update booking set date=datetime('now', '3 days')");
        $this->db->exec("update lessons set date=date('now', '3 days');");
    }
}
