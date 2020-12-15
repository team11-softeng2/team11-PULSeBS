<?php

use PHPUnit\Framework\TestCase;

class GatewaysReportTracingTest extends TestCase
{
    private $db;
    private $gatewayReportTracing;
    private $id;

    public function testfindStudentContactsFound()
    {
        $this->id = '902800';
        $exResult = array(

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

        );
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
        $this->gatewayReportTracing = new Server\api\GatewaysReportTracing($this->db);
        $result = $this->gatewayReportTracing->findStudentContacts($this->id);
        $this->assertEquals($exResult, $result);
    }
    public function testfindStudentContactsNotFound()
    {
        $this->id = '902800';
        $dbToFindFakeData = new \SQLite3('./tests/dbForTesting.db');
        $fakeReturn = $dbToFindFakeData->query('select * from users where idUser=34');
        $this->db = $this->getMockBuilder(\SQLite3::class)
            ->setConstructorArgs(['./tests/db_V3_testing.db'])
            ->setMethods(['query'])
            ->getMock();
        $this->db
            ->expects($this->any())
            ->method('query')
            ->willReturn($fakeReturn);
        $this->gatewayReportTracing = new Server\api\GatewaysReportTracing($this->db);
        $result = $this->gatewayReportTracing->findStudentContacts($this->id);
        $this->assertEquals(0, $result);
    }
}
