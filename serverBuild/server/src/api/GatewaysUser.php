<?php
namespace Server\api;

class GatewaysUser
{
    private $db = null;
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findStudents()
    {
        $sql = "SELECT idUser, userName, name, email
                FROM users
                WHERE role='student'";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idStudent" => $row['idUser'],
                "name" => $row['name'],
                "email" => $row['email'],
            );
            $data[] = $subArray;
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }
}
