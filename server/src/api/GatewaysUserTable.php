<?php
class GatewaysUserTable{
    private $db = null;
    public function __construct($db){
        $this->db = $db;
    }
    public function login($username, $password){
        $sql = "SELECT * FROM USERS WHERE USERNAME= '".$username."' AND PASSWORD='".$password."'";
        $result = $this->db->query($sql)->fetchArray(SQLITE3_ASSOC);
        if($result)
            return $result;
        else
            return 0;
    }
}

?>