<?php
use PHPUnit\Framework\TestCase;

class ControllersTeacherBookingTest extends TestCase
{

    private $db;
    private $controller;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
    }
//test FindBookedStudentsForLecture----------------------------------------------------------------------------------------------------------
    public function testfindBookedStudentsForLectureFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $result = $this->controller->findBookedStudentsForLecture($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
    }

    public function testfindBookedStudentsForLectureNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $this->assertEquals(0, $this->controller->findBookedStudentsForLecture($this->id));
    }

    public function testProcessRequestbookedStudentsForLectureFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }

    public function testProcessRequestbookedStudentsForLectureNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "bookedStudentsForLecture", $this->id);
        $this->assertEquals(0, $this->controller->processRequest());
    }
//---------------------------------------------------------------------------------------------------------------------------------------------

//test FindScheduledLecturesForTeacher----------------------------------------------------------------------------------------------------------
    public function testfindScheduledLecturesForTeacherFound()
    {
        $this->setDatesToToday();
        $this->id = 2;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "scheduledLecturesForTeacher", $this->id);
        $result = $this->controller->findScheduledLecturesForTeacher($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
        $this->assertIsArray(json_decode($result));
        $this->assertCount(6, json_decode($result));
    }

    public function testfindScheduledLecturesForTeacherNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 2;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "scheduledLecturesForTeacher", $this->id);
        $this->assertEquals(0, $this->controller->findScheduledLecturesForTeacher($this->id));
    }

    public function testProcessRequestScheduledLecturesForTeacherFound()
    {
        $this->setDatesToToday();
        $this->id = 2;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "scheduledLecturesForTeacher", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
    }

    public function testProcessRequestScheduledLecturesForTeacherNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 2;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "scheduledLecturesForTeacher", $this->id);
        $this->assertEquals(0, $this->controller->processRequest());
    }
//---------------------------------------------------------------------------------------------------------------------------------------------

//test updateToNotActiveLecture----------------------------------------------------------------------------------------------------------------

    public function testupdateToNotActiveLectureFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $result = $this->controller->updateToNotActiveLecture($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testupdateToNotActiveLectureNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $this->assertEquals(-1, $this->controller->updateToNotActiveLecture($this->id));
    }

    public function testProcessRequestupdateToNotActiveLectureFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testProcessRequestupdateToNotActiveLectureNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "deleteLecture", $this->id);
        $this->assertEquals(-1, $this->controller->processRequest());
    }

    //---------------------------------------------------------------------------------------------------------

    //test changeToOnline--------------------------------------------------------------------------------------

    public function testchangeToOnlineFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $result = $this->controller->changeToOnlineLecture($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testchangeToOnlineNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $this->assertEquals(-1, $this->controller->changeToOnlineLecture($this->id));
    }

    public function testProcessRequestchangeToOnlineFound()
    {
        $this->updateDates();
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationActiveLecture($this->id);
    }

    public function testProcessRequestchangeToOnlineNotFound()
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnline", $this->id);
        $this->assertEquals(-1, $this->controller->processRequest());
    }

    //test changeToOnlineByYear--------------------------------------------------------------------------------------

    public function testchangeToOnlineByYearFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 1;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnlineByYear", $this->id);
        $result = $this->controller->changeToOnlineLectureByYear($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
        $this->restoreModificationUpdateToOnlineByYear();
    }

    public function testchangeToOnlineByYearNotFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 10;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnlineByYear", $this->id);
        $this->assertEquals(0, $this->controller->changeToOnlineLectureByYear($this->id));
        $this->restoreModificationUpdateToOnlineByYear();
    }

    public function testProcessRequestchangeToOnlineByYearFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 1;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnlineByYear", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationUpdateToOnlineByYear();
    }

    public function testProcessRequestchangeToOnlineByYearNotFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 10;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToOnlineByYear", $this->id);
        $this->assertEquals(0, $this->controller->processRequest());
        $this->restoreModificationUpdateToOnlineByYear();
    }

    //test changeToPresenceByYear--------------------------------------------------------------------------------------

    public function testchangeToPresenceByYearFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 1;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToPresenceByYear", $this->id);
        $result = $this->controller->changeToPresenceLectureByYear($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
        $this->restoreModificationUpdateToOnlineByYear();
    }

    public function testchangeToPresenceByYearNotFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 10;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToPresenceByYear", $this->id);
        $this->assertEquals(0, $this->controller->changeToPresenceLectureByYear($this->id));
        $this->restoreModificationUpdateToOnlineByYear();
    }

    public function testProcessRequestchangeToPresenceByYearFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 1;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToPresenceByYear", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationUpdateToOnlineByYear();
    }

    public function testProcessRequestchangeToPresenceByYearNotFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 10;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "changeToPresenceByYear", $this->id);
        $this->assertEquals(0, $this->controller->processRequest());
        $this->restoreModificationUpdateToOnlineByYear();
    }

    //test recordStudentPresence--------------------------------------------------------------------------------------

    public function testrecordStudentPresenceFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 2;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "recordStudentPresence", $this->id);
        $result = $this->controller->recordStudentPresence($this->id);
        $this->assertTrue((json_decode($result, true) == null) ? false : true);
        $this->restoreModificationRecordStudentPresence();
    }

    public function testrecordStudentPresenceNotFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 1;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "recordStudentPresence", $this->id);
        $this->assertEquals(0, $this->controller->recordStudentPresence($this->id));
        $this->restoreModificationRecordStudentPresence();
    }

    public function testProcessRequestrecordStudentPresenceFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 2;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "recordStudentPresence", $this->id);
        $output = $this->controller->processRequest();
        $this->assertNotEquals(0, $output);
        $this->assertFalse(empty($output));
        $this->restoreModificationRecordStudentPresence();
    }

    public function testProcessRequestrecordStudentPresenceNotFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->id = 1;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "recordStudentPresence", $this->id);
        $this->assertEquals(0, $this->controller->processRequest());
        $this->restoreModificationRecordStudentPresence();
    }
    //---------------------------------------------------------------------------------------------------------
    //TEST updateSchedule
    public function testupdateScheduleNotFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");

        $body = '{"idLesson":"0", "idClassroom":"99", "dow":"4", "beginTime":"08:30", "endTime":"20:30"}';
        $response = $this->client->request('POST', 'server/updateSchedule/0', [
            'body' => $body,
            'headers' => ['Content-Type' => 'application/json'],
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $this->assertEquals("0", json_decode($response->getBody()));
        $this->client = null;
    }

    public function testupdateScheduleFound()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");

        $body = '{"idLesson":"889", "idClassroom":"3", "dow":"1", "beginTime":"10:30", "endTime":"12:00"}';
        $response = $this->client->request('POST', 'server/updateSchedule/889', [
            'body' => $body,
            'headers' => ['Content-Type' => 'application/json'],
        ]);
        $this->controller = new Server\api\ControllersTeacherBooking("POST", $this->db, "updateSchedule");
        $this->assertEquals(13, $this->controller->updateSchedule(json_decode($body)));
    }

    public function testupdateScheduleWrongEndpoint()
    {
        $this->controller = new Server\api\ControllersTeacherBooking("POST", $this->db, "aggiornaOrari");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
    }
    //---------------------------------------------------------------------------------------------------------

    public function testUseWrongMethod()
    {
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("POOOOST", $this->db, "bookedStudentsForLecture", $this->id);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid request method.", $result);
    }

    public function testUseWrongEndpointWithGET()
    {
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("GET", $this->db, "wrongEndPoint", $this->id);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
    }

    public function testUseWrongEndpointWithPUT()
    {
        $this->id = 3;
        $this->controller = new Server\api\ControllersTeacherBooking("PUT", $this->db, "wrongEndPointAgain", $this->id);
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
    }

    // function useful for testing they modify db in order to make tests
    //---------------------------------------------------------------------------------------------------------
    protected function updateDates()
    {
        $this->db->exec("update booking set date=datetime('now', '3 days')");
        $this->db->exec("update lessons set date=date('now', '3 days');");
    }

    protected function setDatesToToday()
    {
        $this->db->exec("update booking set date=datetime('now', '1 days')");
        $this->db->exec("update lessons set date=date('now', '1 days');");
    }

    protected function restoreModificationActiveLecture($idLecture)
    {
        $sqlUpdateLessonTable = "update lessons set active=1 where idLesson=" . $idLecture . "";
        $sqlUpdateBookingTable = "update booking set active=1, isWaiting=0 where idLesson=" . $idLecture . "";
        $this->db->exec($sqlUpdateLessonTable);
        $this->db->exec($sqlUpdateBookingTable);
    }

    protected function restoreModificationUpdateToOnline($idLecture)
    {
        $sqlUpdateLessonTable = "update lessons set inPresence=1, idClassRoom=5 where idLesson=" . $idLecture . "";
        $sqlUpdateBookingTable = "update booking set active=1, isWaiting=0 where idLesson=" . $idLecture . "";
        $this->db->exec($sqlUpdateLessonTable);
        $this->db->exec($sqlUpdateBookingTable);
    }

    protected function restoreModificationUpdateToOnlineByYear()
    {
        $sqlUpdateLessonTable = "update lessons set inPresence=1";
        $this->db->exec($sqlUpdateLessonTable);
    }

    protected function restoreModificationRecordStudentPresence()
    {
        $sqlUpdateLessonTable = "UPDATE booking SET present=0";
        $this->db->exec($sqlUpdateLessonTable);
    }
    //---------------------------------------------------------------------------------------------------------
}
