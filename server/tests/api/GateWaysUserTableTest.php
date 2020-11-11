<?php


use PHPUnit\Framework\TestCase;

class GateWaysUserTableTest extends TestCase
{
    
    private $db;
    private $username;
    private $password;
    private $gatewayUserTable;

    public function setUp(): void
    {
        $this->db = new SQLite3("dbForTesting.db");
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


    public function testLoginAccess(){
        $this->db->exec('INSERT INTO "users" VALUES (1,"calogero","test","student","Calogero Pisano");');
        
        
        $this->username = "calogero";
        $this->password = "test";
        $this->gatewayUserTable = new Server\api\GatewaysUserTable($this->db);
        $res = $this->gatewayUserTable->login($this->username, $this->password);
        $this->assertEquals($res['userName'], "calogero");
        $this->assertEquals($res['password'], "test");
        $this->assertEquals($res['role'], "student");
        $this->assertEquals($res['name'], "Calogero Pisano");
           
    }
    public function testLoginRefused(){
        $this->db->exec('INSERT INTO "users" VALUES (1,"calogero","test","student","Calogero Pisano");');
        $this->username = "rocco";
        $this->password = "test2";
        $this->gatewayUserTable = new Server\api\GatewaysUserTable($this->db);
        $res = $this->gatewayUserTable->login($this->username, $this->password);
        $this->assertEquals($res, 0);
           
    }
    
}
?>