<?php
use PHPUnit\Framework\TestCase;

class ControllersUserTest extends TestCase
{
    private $db;
    private $controller;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
    }

    //get courses ok
    public function testGetAListOfValidCoures()
    {
        $this->controller = new Server\api\ControllersUser("GET", $this->db, "students");
        $result = $this->controller->processRequest();
        $this->assertIsArray(json_decode($result));
        $this->assertCount(10, json_decode($result));
    }

    // public function testGetAEmptyListOfUsers()
    // {
    //     $this->emptyDB();
    //     $this->controller = new Server\api\ControllersUser("GET", $this->db, "students");
    //     $result = $this->controller->processRequest();
    //     $this->assertEquals(0, $result);
    //     $this->restoreDB();
    // }

    public function testUseWrongMethod()
    {
        $this->controller = new Server\api\ControllersUser("POST", $this->db, "students");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid request method.", $result);
    }

    public function testUseWrongEndpoint()
    {
        $this->controller = new Server\api\ControllersUser("GET", $this->db, "studentsssss");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals("Invalid endpoint.", $result);
    }

}
