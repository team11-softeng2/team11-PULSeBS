<?php
use PHPUnit\Framework\TestCase;

class GatewaysCourseTest extends TestCase
{

    private $db;
    private $gatewayCourse;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbCourses.db");
        $this->gatewayCourse = new Server\api\GatewaysCourse($this->db);
    }

    public function testfindCoursesFound()
    {
        $result = $this->gatewayCourse->findCourses();
        $this->assertIsArray($result);
        $this->assertCount(7, $result);
    }
}
