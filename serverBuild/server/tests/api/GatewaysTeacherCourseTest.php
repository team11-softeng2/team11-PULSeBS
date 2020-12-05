<?php
use PHPUnit\Framework\TestCase;

class GatewaysTeacherCourseTest extends TestCase
{

    private $db;
    private $gatewayTeacherCourse;
    private $id;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbCourses.db");
        $this->gatewayTeacherCourse = new Server\api\GatewaysTeacherCourse($this->db);
    }

    public function testfindTeacherCoursesFound()
    {
        $this->id = 2;
        $result = $this->gatewayTeacherCourse->findTeacherCourses($this->id);
        $this->assertIsArray($result);
        $this->assertCount(3, $result);

        $this->id = 12;
        $result = $this->gatewayTeacherCourse->findTeacherCourses($this->id);
        $this->assertIsArray($result);
        $this->assertCount(2, $result);

    }

    public function testfindTeacherCoursesWithStudentId()
    {
        $this->id = 1;
        $result = $this->gatewayTeacherCourse->findTeacherCourses($this->id);
        $this->assertEquals(0, $result);
    }

    public function testfindTeacherCoursesWithNonExistingId()
    {
        $this->id = 99;
        $result = $this->gatewayTeacherCourse->findTeacherCourses($this->id);
        $this->assertEquals(0, $result);
    }

}
