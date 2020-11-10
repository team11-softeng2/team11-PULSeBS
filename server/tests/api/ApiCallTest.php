<?php


use PHPUnit\Framework\TestCase;

class ProvaTest extends TestCase
{
    public function testProva(){
        $userController = new Server\src\api\ControllersUser;
        $userController->userTestIfWork();
        $this->assertEquals($userController->userTestIfWork(), "worked");
        

    }
    
}
?>