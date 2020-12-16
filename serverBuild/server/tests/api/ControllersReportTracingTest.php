<?php

use PHPUnit\Framework\TestCase;

class ControllersReportTracingTest extends TestCase
{
    private $db;
    private $controller;
    private $requestMethod;
    private $value;
    private $id;

    public function testfindStudentContactsFound()
    {
        $exResult = json_encode(array(

            [
                'idUser' => 1,
                'name' => 'Calogero Pisano',
                'email' => 'student@pulsebs.it',
                'role' => 'student',
            ],


            [
                'idUser' => 1,
                'name' => 'Calogero Pisano',
                'email' => 'student@pulsebs.it',
                'role' => 'student',
            ]

        ));
        $dbToFindFakeData = new \SQLite3('./tests/dbEmail.db');
        $fakeReturn = $dbToFindFakeData->query('select * from users where idUser=1');
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['query'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('query')
            ->willReturn($fakeReturn);
        $this->requestMethod = 'GET';
        $this->value = 'findStudentContacts';
        $this->id = '902800';
        $this->controller = new Server\api\ControllersReportTracing($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->findStudentContacts();
        $this->assertEquals($exResult, $result);
    }
    public function testfindStudentContactsNotFound()
    {
        $exResult = 0;
        $dbToFindFakeData = new \SQLite3('./tests/dbEmail.db');
        $fakeReturn = $dbToFindFakeData->query('select * from users where idUser=99999');
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['query'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('query')
            ->willReturn($fakeReturn);
        $this->requestMethod = 'GET';
        $this->value = 'findStudentContacts';
        $this->id = '902800';
        $this->controller = new Server\api\ControllersReportTracing($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->findStudentContacts();
        $this->assertEquals($exResult, $result);
    }
    public function testProcessRequest_findStudentContactsFound()
    {
        $exResult = json_encode(array(

            [
                'idUser' => 1,
                'name' => 'Calogero Pisano',
                'email' => 'student@pulsebs.it',
                'role' => 'student',
            ],


            [
                'idUser' => 1,
                'name' => 'Calogero Pisano',
                'email' => 'student@pulsebs.it',
                'role' => 'student',
            ]

        ));
        $dbToFindFakeData = new \SQLite3('./tests/dbEmail.db');
        $fakeReturn = $dbToFindFakeData->query('select * from users where idUser=1');
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['query'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('query')
            ->willReturn($fakeReturn);
        $this->requestMethod = 'GET';
        $this->value = 'findStudentContacts';
        $this->id = '902800';
        $this->controller = new Server\api\ControllersReportTracing($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->processRequest();
        $this->assertEquals($exResult, $result);
    }
    public function testProcessRequest_findStudentContactsNotFound()
    {
        $exResult = 0;
        $dbToFindFakeData = new \SQLite3('./tests/dbEmail.db');
        $fakeReturn = $dbToFindFakeData->query('select * from users where idUser=99999');
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['query'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('query')
            ->willReturn($fakeReturn);
        $this->requestMethod = 'GET';
        $this->value = 'findStudentContacts';
        $this->id = '902800';
        $this->controller = new Server\api\ControllersReportTracing($this->requestMethod, $this->db, $this->value, $this->id);
        $result = $this->controller->processRequest();
        $this->assertEquals($exResult, $result);
    }
    
}
