<?php
use PHPUnit\Framework\TestCase;

class LoginTest extends TestCase
{
    private $client;

    protected function setUp(): void
    {
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
    }

    public function testLoginWorks()
    {
        $body = '{"username":"calogero","password":"test"}';
        $response = $this->client->request('POST', 'server/src/api/Login.php', [
            'body' => $body,
            'headers' => ['Content-Type' => 'application/json'],
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $username = json_decode($response->getBody())->{"userName"};
        $this->assertEquals("calogero", $username);
        $password = json_decode($response->getBody())->{"password"};
        $this->assertEquals("test", $password);
        $this->client = null;
    }

    public function testLoginNotWork()
    {
        $body = '{"username":"error","password":"test"}';
        $response = $this->client->request('POST', 'server/src/api/Login.php', [
            'body' => $body,
            'headers' => ['Content-Type' => 'application/json'],
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals('0', (string) $response->getBody());
    }

}
