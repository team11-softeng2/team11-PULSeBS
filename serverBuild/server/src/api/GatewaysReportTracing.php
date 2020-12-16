<?php

namespace Server\api;

class GatewaysReportTracing extends Gateways
{
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findStudentContacts($idStudent)
    {
        $sqlFindingStudents = "SELECT * from booking B, lessons L, users U where B.idLesson=L.idLesson and B.idUser=U.idUser and B.idUser<>'" . $idStudent . "' 
        and B.active=1 and B.isWaiting=0 
        and L.idLesson in (
        SELECT idLesson from booking where idUser = '" . $idStudent . "'
        and date < datetime('now')
        )
        GROUP by U.idUser";

        $sqlFindingTeachers = "SELECT distinct idUser, U.name as name, U.email as email, U.role as role from users U, courses C, lessons L where U.idUser=C.idTeacher and L.idCourse=C.idCourse and L.idCourse in (SELECT idCourse 
        from lessons L1, booking B1, users U1 
        where L1.idLesson = B1.idLesson
        and B1.idUser = U1.idUser
        and U1.idUser = '" . $idStudent . "'
        and B1.active = 1
        and B1.isWaiting = 0
        and B1.date < datetime('now')
        and L1.idLesson in (
	    SELECT idLesson from booking where idUser = '" . $idStudent . "'
            ) 
        )
        GROUP by idUser";

        $contactStudents = $this->db->query($sqlFindingStudents);
        $contactTeachers = $this->db->query($sqlFindingTeachers);

        $dataContactStudents = array();
        $dataContactTeachers = array();

        while ($row = $contactStudents->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idUser" => $row['idUser'],
                "name" => $row['name'],
                "email" => $row['email'],
                "role" => $row['role'],
            );
            $dataContactStudents[] = $subArray;
        }

        while ($row = $contactTeachers->fetchArray(SQLITE3_ASSOC)) {
            $subArray = array(
                "idUser" => $row['idUser'],
                "name" => $row['name'],
                "email" => $row['email'],
                "role" => $row['role'],
            );
            $dataContactTeachers[] = $subArray;
        }

        $data = array_merge($dataContactStudents, $dataContactTeachers);
        return empty($data) ? 0 : $data;
    }
}
