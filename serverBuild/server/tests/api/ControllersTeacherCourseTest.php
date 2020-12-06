<?php
use PHPUnit\Framework\TestCase;

class ControllersTeacherCourseTest extends TestCase
{
    private $db;
    private $controller;
    private $id;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbCourses.db");
    }

    //get courses ok
    public function testGetAListOfValidCouresForTeacher()
    {
        $this->id = 2;
        $this->controller = new Server\api\ControllersTeacherCourse("GET", $this->db, "teacherCourses", $this->id);
        $result = $this->controller->processRequest();
        $this->assertIsArray(json_decode($result));
        $this->assertCount(3, json_decode($result));
    }

    // get courses of a student -> wrong id
    public function testGetAEmptyListOfCoursesForTeacher()
    {
        $this->id = 1;
        $this->controller = new Server\api\ControllersTeacherCourse("GET", $this->db, "teacherCourses", $this->id);
        $this->assertEquals(0, $this->controller->processRequest());
    }

    public function testUseWrongMethod()
    {
        $this->controller = new Server\api\ControllersTeacherCourse("POST", $this->db, "teacherCourses");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid request method.", $result);
    }

    public function testUseWrongEndpoint()
    {
        $this->controller = new Server\api\ControllersTeacherCourse("GET", $this->db, "ticerCorsi");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
    }
}
