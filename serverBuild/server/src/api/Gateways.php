<?php
namespace Server\api;

class Gateways
{
    private $db = null;

    public function returnArray($data)
    {
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }
}
