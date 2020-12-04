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
        $this->populateDB();
        $this->controllersTeacherCourse = new Server\api\ControllersTeacherCourse("GET", $this->db, "teacherCourses", $this->id);
        $result = $this->controllersTeacherCourse->processRequest();
        $this->assertIsArray(json_decode($result));
        $this->assertCount(3, json_decode($result));
    }

    public function testGetAEmptyListOfCoursesForTeacher()
    {
        $this->id = 1;
        $this->emptyDB();
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

    protected function emptyDB()
    {
        $sql = "DELETE FROM courses";
        $this->db->exec($sql);
    }

    protected function populateDB()
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
