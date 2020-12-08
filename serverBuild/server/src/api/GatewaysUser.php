<?php
namespace Server\api;

class GatewaysUser extends Gateways
{
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

        return $this->returnArray($data);
    }
}
