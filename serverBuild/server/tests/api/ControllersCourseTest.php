<?php
use PHPUnit\Framework\TestCase;

class ControllersCourseTest extends TestCase
{
    private $db;
    private $controllersCourse;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbCourses.db");
    }

    //get courses ok
    public function testGetAListOfValidCoures()
    {
        $this->restoreDB();
        $this->controllersCourse = new Server\api\ControllersCourse("GET", $this->db, "courses");
        $result = $this->controllersCourse->processRequest();
        $this->assertIsArray(json_decode($result));
        $this->assertCount(7, json_decode($result));
    }

    public function testGetAEmptyListOfCourses()
    {
        $this->emptyDB();
        $this->controllersCourse = new Server\api\ControllersCourse("GET", $this->db, "courses");
        $result = $this->controllersCourse->processRequest();
        $this->assertEquals($result, 0);
        $this->restoreDB();
    }

    // get courses with wrong method
    public function testUseWrongMethod()
    {
        $this->controllersCourse = new Server\api\ControllersCourse("POST", $this->db, "courses");
        $result = $this->controllersCourse->processRequest();
        $this->assertEquals($result, "Invalid request method.");
    }

    //use wrong endpoint
    public function testUseWrongEndpoint()
    {
        $this->controllersCourse = new Server\api\ControllersCourse("GET", $this->db, "coursesssss");
        $result = $this->controllersCourse->processRequest();
        $this->assertEquals($result, "Invalid endpoint.");
    }

    protected function emptyDB()
    {
        $sql = "DELETE FROM courses";
        $this->db->exec($sql);
    }

    protected function restoreDB()
    {
        $sql = "DELETE FROM courses;
                INSERT INTO courses (idCourse, idTeacher, name) VALUES
                ('1', '2', 'Calculus I'),
                ('2', '2', 'Software Engineering II'),
                ('3', '2', 'Geometry'),
                ('4', '12', 'Object Oriented Programming'),
                ('5', '12', 'Computer Science'),
                ('6', '13', 'Operating Systems'),
                ('7', '13', 'Human computer interaction');";
        $this->db->exec($sql);
    }
}
