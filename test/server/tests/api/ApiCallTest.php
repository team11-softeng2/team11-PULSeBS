<?php


use PHPUnit\Framework\TestCase;

class ProvaTest extends TestCase
{
    public function testProva(){
        $userController = new \Server\api\controllers\UserController;
        $userController->userTestIfWork();
        $this->assertEquals($userController->userTestIfWork(), "worked");

    }
    
}
?>