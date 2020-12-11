<?php
use PHPUnit\Framework\TestCase;

class GatewaysUserTest extends TestCase
{

    private $db;
    private $gatewayUser;

    protected function setUp(): void
    {
        $this->db = new SQLite3("./tests/dbForTesting2.db");
        $this->gatewayUser = new Server\api\GatewaysUser($this->db);
    }

    public function testfindUsersFound()
    {
        $result = $this->gatewayUser->findStudents();
        $this->assertIsArray($result);
        $this->assertCount(10, $result);
    }
}
