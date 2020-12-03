<?php

use PHPUnit\Framework\TestCase;

class ControllersLoginTest extends TestCase
{
    private $db;
    private $username;
    private $password;
    private $requestMethod;
    private $controllerLogin;

    public function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbForTesting.db");
        $this->db->exec('DROP TABLE IF EXISTS "lessons";
        CREATE TABLE IF NOT EXISTS "lessons" (
            "idLesson"	INTEGER,
            "idCourse"	INTEGER,
            "idTeacher"	INTEGER,
            "idClassRoom"	INTEGER,
            "date"	TEXT,
            "beginTime"	TEXT,
            "endTime"	TEXT,
            "type"	TEXT,
            "active"	INTEGER,
            PRIMARY KEY("idLesson" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "ClassRoom";
        CREATE TABLE IF NOT EXISTS "ClassRoom" (
            "idClassRoom"	INTEGER,
            "totalSeats"	INTEGER,
            PRIMARY KEY("idClassRoom" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "enrollment";
        CREATE TABLE IF NOT EXISTS "enrollment" (
            "idEnrollment"	INTEGER,
            "idUser"	INTEGER,
            "idCourse"	INTEGER,
            PRIMARY KEY("idEnrollment" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "booking";
        CREATE TABLE IF NOT EXISTS "booking" (
            "idBooking"	INTEGER,
            "idUser"	INTEGER,
            "idLesson"	INTEGER,
            "active"	INTEGER,
            "date"	TEXT,
            "isWaiting"	INTEGER,
            PRIMARY KEY("idBooking" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "courses";
        CREATE TABLE IF NOT EXISTS "courses" (
            "idCourse"	INTEGER,
            "idTeacher"	INTEGER,
            "name"	TEXT,
            PRIMARY KEY("idCourse" AUTOINCREMENT)
        );
        DROP TABLE IF EXISTS "users";
        CREATE TABLE IF NOT EXISTS "users" (
            "idUser"	INTEGER NOT NULL UNIQUE,
            "userName"	TEXT,
            "password"	TEXT,
            "role"	TEXT,
            "name"	TEXT,
            PRIMARY KEY("idUser" AUTOINCREMENT)
        );');
    }

    public function testCheckLoginAccess()
    {
        $this->db->exec('INSERT INTO "users" VALUES (1,"calogero","test","student","Calogero Pisano");');
        $this->username = "calogero";
        $this->password = "test";
        $this->requestMethod = "POST";
        $this->controllerLogin = new Server\api\ControllersLogin($this->requestMethod, $this->db);
        $response = $this->controllerLogin->checkLogin($this->username, $this->password);
        $resBody = json_decode($response['body']);

        $this->assertEquals('HTTP/1.1 200 OK', $response['status_code_header']);
        $this->assertEquals("calogero", $resBody->userName);
        $this->assertEquals("test", $resBody->password);
        $this->assertEquals("student", $resBody->role);
        $this->assertEquals("Calogero Pisano", $resBody->name);
    }

    public function testCheckLoginRefused()
    {
        $this->db->exec('INSERT INTO "users" VALUES (1,"calogero","test","student","Calogero Pisano");');
        $this->username = "Rocco";
        $this->password = "test";
        $this->requestMethod = "POST";
        $this->controllerLogin = new Server\api\ControllersLogin($this->requestMethod, $this->db);
        $response = $this->controllerLogin->checkLogin($this->username, $this->password);
        $this->assertEquals('HTTP/1.1 200 OK', $response['status_code_header']);
        $this->assertEquals(0, $response['body']);
    }

    public function testProcessRequestCorrectMethod()
    {
        $this->db->exec('INSERT INTO "users" VALUES (1,"calogero","test","student","Calogero Pisano");');
        $this->username = "calogero";
        $this->password = "test";
        $this->requestMethod = "POST";
        $this->controllerLogin = new Server\api\ControllersLogin($this->requestMethod, $this->db);
        $this->expectOutputString('0');
        $this->controllerLogin->processRequest();
    }

    public function testProcessRequestWrongMethod()
    {
        $this->db->exec('INSERT INTO "users" VALUES (1,"calogero","test","student","Calogero Pisano");');
        $this->username = "calogero";
        $this->password = "test";
        $this->requestMethod = "GET";
        $this->controllerLogin = new Server\api\ControllersLogin($this->requestMethod, $this->db);
        $this->expectException(Error::class);
        $this->controllerLogin->processRequest();
    }
}
