<?php
use PHPUnit\Framework\TestCase;

class GatewaysStudentCourseTest extends TestCase
{

    private $db;
    private $gatewayStudentCourse;
    private $id;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbCourses.db");
        $this->gatewayStudentCourse = new Server\api\GatewaysStudentCourse($this->db);
    }

    public function testfindStudentCoursesFound()
    {
        $this->id = 1;
        $result = $this->gatewayStudentCourse->findStudentCourses($this->id);
        $this->assertIsArray($result);
        $this->assertCount(2, $result);

        $this->id = 3;
        $result = $this->gatewayStudentCourse->findStudentCourses($this->id);
        $this->assertIsArray($result);
        $this->assertCount(2, $result);

    }

    public function testfindStudentCoursesWithTeacherId()
    {
        $this->id = 2;
        $result = $this->gatewayStudentCourse->findStudentCourses($this->id);
        $this->assertEquals(0, $result);
    }

    public function testfindStudentCoursesWithNonExistingId()
    {
        $this->id = 99;
        $result = $this->gatewayStudentCourse->findStudentCourses($this->id);
        $this->assertEquals(0, $result);
    }

}
