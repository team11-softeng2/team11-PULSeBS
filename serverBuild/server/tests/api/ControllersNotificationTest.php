<?php
use PHPUnit\Framework\TestCase;

class ControllersNotificationTest extends TestCase
{
    private $db;
    private $controller;
    private $client;

    protected function setUp(): void
    {
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
        $this->db = new SQLite3("./tests/dbEmail.db");
    }

    public function testprocessRequestOK()
    {
        $body = '{"type":"bookingConfirmation","id":"1"}';
        $response = $this->client->request('POST', '/server/sendNotification', [
            'body' => $body,
            'headers' => ['Content-Type' => 'application/json'],
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $this->assertEquals(1, json_decode($response->getBody()));
        $this->client = null;
    }

    public function testSendNotificationOK()
    {
        $this->controller = new Server\api\ControllersNotification("POST", $this->db, "sendNotification");
        $result = $this->controller->sendNotification("bookingConfirmation", "1");
        $this->assertIsNumeric($result);
        $this->assertEquals(1, $result);
    }

    public function testUseWrongMethod()
    {
        $this->controller = new Server\api\ControllersNotification("GEEEEEET", $this->db, "sendNotification");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals($result, "Invalid request method.");
    }

    public function testUseWrongEndpoint()
    {
        $this->controller = new Server\api\ControllersNotification("POST", $this->db, "inviaNotifica");
        $result = $this->controller->processRequest();
        $this->assertIsString($result);
        $this->assertEquals($result, "Invalid endpoint.");
    }
}
