<?php
use PHPUnit\Framework\TestCase;

class ControllersCourseTest extends TestCase
{
    private $db;
    private $controller;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbCourses.db");
    }

    public function testGetAListOfValidCoures()
    {
        $this->restoreDB();
        $this->controller = new Server\api\ControllersCourse("GET", $this->db, "courses");
        $result = $this->controller->processRequest();
        $this->assertIsArray(json_decode($result));
        $this->assertCount(7, json_decode($result));
    }

    public function testGetAEmptyListOfCourses()
    {
        $this->emptyDB();
        $this->controller = new Server\api\ControllersCourse("GET", $this->db, "courses");
        $result = $this->controller->processRequest();
        $this->assertEquals(0, $result);
        $this->restoreDB();
    }

    public function testGetAListOfValidClasses()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->restoreDBclassroom();
        $this->controller = new Server\api\ControllersCourse("GET", $this->db, "classrooms");
        $result = $this->controller->processRequest();
        $this->assertIsArray(json_decode($result));
        $this->assertCount(8, json_decode($result));
    }

    public function testGetAEmptyListOfClasses()
    {
        $this->db = new SQLite3("./tests/dbTeachers.db");
        $this->emptyDBclassroom();
        $this->controller = new Server\api\ControllersCourse("GET", $this->db, "classrooms");
        $result = $this->controller->processRequest();
        $this->assertEquals(0, $result);
        $this->restoreDBclassroom();
    }

    public function testUseWrongMethod()
    {
        $this->controller = new Server\api\ControllersCourse("POST", $this->db, "courses");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid request method.", $result);
    }

    public function testUseWrongEndpoint()
    {
        $this->controller = new Server\api\ControllersCourse("GET", $this->db, "coursesssss");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
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

    protected function emptyDBclassroom()
    {
        $sql = "DELETE FROM ClassRoom";
        $this->db->exec($sql);
    }

    protected function restoreDBclassroom()
    {
        $sql = "DELETE FROM ClassRoom;
                INSERT INTO ClassRoom (idClassRoom, totalSeats, room) VALUES
                ('1', '120', '1'),
                ('2', '120', '2'),
                ('3', '80', '3'),
                ('4', '80', '4'),
                ('5', '70', '5'),
                ('6', '70', '6'),
                ('7', '50', '7'),
                ('8', '1', '8');";
        $this->db->exec($sql);
    }
}
