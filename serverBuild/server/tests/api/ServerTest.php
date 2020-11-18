<?php


use PHPUnit\Framework\TestCase;
use Server\api\ControllersStudentBooking;

class ServerTest extends TestCase
{
    private $client;

    public function testApiCallBookableLessons(){

        //create a fake response to a request
        $exReturn='[
            {
            "idLesson": 6,
            "name": "Geometria",
            "date": "2020-11-20",
            "beginTime": "14:00:00",
            "endTime": "16:00:00"
            }
            ]';
        
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
        $response = $this->client->request('GET', '/server/bookableLessons/1');
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $return = (json_decode($response->getBody()));
        $this->assertEquals(json_decode($exReturn), $return);
        $this->client = null; 

    }
    public function testApiCallBookableLessonsNotFound(){

        //create a fake response to a request
        $exReturn='0';
        
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
        $response = $this->client->request('GET', '/server/bookableLessons/0');
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        
        $this->assertEquals($exReturn, (string) $response->getBody());
        $this->client = null; 

    }

    public function testApiCallstudentBookings(){
        $exReturn='[
            {
            "idLesson": 3,
            "name": "Algebra",
            "date": "2020-11-18",
            "beginTime": "09:00:00",
            "endTime": "11:00:00",
            "idBooking": 1
            }
            ]';

        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
        $response = $this->client->request('GET', '/server/studentBookings/1');
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $return = (json_decode($response->getBody()));
        $this->assertEquals(json_decode($exReturn), $return);
        $this->client = null;
    }

    public function testApiCallstudentBookingsNotFoud(){
        $exReturn='0';

        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
        $response = $this->client->request('GET', '/server/studentBookings/0');
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $this->assertEquals($exReturn, (string) $response->getBody());
        $this->client = null; 
    }

    public function testApiCallInsertBooking(){
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
        $body = '{
            "idUser":"7",
            "idLesson":"10",
            "date":"2020-11-18 11:00:00"
          }';
        $response = $this->client->request('POST', '/server/insertLecture', [
            'body' => $body,
            'headers' => [ 'Content-Type' => 'application/json' ]
        ]);
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $this->assertGreaterThan(0, (int)(string) $response->getBody());
        $this->client = null;
    }

    public function testCallupdateBooking(){
        $this->client = new GuzzleHttp\Client(['base_uri' => 'http://localhost']);
        $response = $this->client->request('PUT', '/server/updateBooking/2');
        $this->assertEquals(200, $response->getStatusCode());
        $contentType = $response->getHeaders()["Content-Type"][0];
        $this->assertEquals("application/json", $contentType);
        $this->assertEquals('1', (string)$response->getBody());
        $this->client = null;

    }

  
}
?>