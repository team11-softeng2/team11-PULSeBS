<?php
use PHPUnit\Framework\TestCase;

class ControllersTeacherCourseTest extends TestCase
{
    private $db;
    private $controllersTeacherCourse;
    private $id;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbCourses.db");
    }

    //get courses ok
    public function testGetAListOfValidCouresForTeacher()
    {
        $this->id = 2;
        $this->controllersTeacherCourse = new Server\api\ControllersTeacherCourse("GET", $this->db, "teacherCourses", $this->id);
        $result = $this->controllersTeacherCourse->processRequest();
        $this->assertIsArray(json_decode($result));
        $this->assertCount(3, json_decode($result));
    }

    // get courses of a student -> wrong id
    public function testGetAEmptyListOfCoursesForTeacher()
    {
        $this->id = 1;
        $this->controllersTeacherCourse = new Server\api\ControllersTeacherCourse("GET", $this->db, "teacherCourses", $this->id);
        $result = $this->controllersTeacherCourse->processRequest();
        $this->assertEquals($result, 0);
    }

    // get courses with wrong method
    public function testUseWrongMethod()
    {
        $this->controllersTeacherCourse = new Server\api\ControllersTeacherCourse("POST", $this->db, "teacherCourses");
        $result = $this->controllersTeacherCourse->processRequest();
        $this->assertEquals($result, "Invalid request method.");
    }

    //use wrong endpoint
    public function testUseWrongEndpoint()
    {
        $this->controllersTeacherCourse = new Server\api\ControllersTeacherCourse("GET", $this->db, "ticerCorsi");
        $result = $this->controllersTeacherCourse->processRequest();
        $this->assertEquals($result, "Invalid endpoint.");
    }
}
