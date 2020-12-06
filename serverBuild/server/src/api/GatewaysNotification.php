<?php
namespace Server\api;

# Usage and Examples at: https: //github.com/PHPMailer/PHPMailer
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class GatewaysNotification
{
    private $db = null;
    private $signature = "<br><p>Regards, the Team 11.</p>";
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function sendEmail($type, $id)
    {
        switch ($type) {
            case 'studentsAttendingNextLecture':
                $queue = $this->studentsAttendingNextLecture();
                return $this->dispatch($queue);
                break;
            case 'bookingConfirmation':
                $queue = $this->bookingConfirmation($id);
                return $this->dispatch($queue);
                break;
            case 'lectureCancelled':
                $queue = $this->lectureCancelled($id);
                return $this->dispatch($queue);
                break;
            case 'takenFromWaitingList':
                $queue = $this->takenFromWaitingList($id);
                return $this->dispatch($queue);
                break;
            // case 'lectureScheduleChange':
            //     return "To be implemented...";
            //     break;
            default:
                return 0;
                break;
        }
    }

    private function dispatch($queue)
    {
        if (empty($queue)) {
            return 0;
        }

        $mail = new PHPMailer(true); // Passing `true` enables exceptions
        //Server settings
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'team11.pulsebs@gmail.com'; // SMTP username
        $mail->Password = 'w38W42f3Vuy4Ws8ysFXNm68CpEt4U2'; // SMTP password
        $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587; // TCP port to connect to
        //Recipients
        $mail->setFrom('no-reply@pulsebs.it', 'PULSeBS');
        //Content
        $mail->isHTML(true); // Set email format to HTML

        foreach ($queue as $recipient) {
            try {
                $mail->addAddress($recipient['to'], $recipient['userName']);
            } catch (Exception $e) {
                return 'Invalid Address.';
                continue;
            }
            //Set subject and body of the next email
            $mail->Subject = $recipient['subject'];
            $mail->Body = $recipient['body'];
            try {
                $mail->send();
            } catch (Exception $e) {
                //Reset the connection to abort sending this message
                //The loop will continue trying to send to the rest of the list
                $mail->getSMTPInstance()->reset();
                return 'Mailer Error.';
            }
            //Clear all addresses and attachments for the next iteration
            $mail->clearAddresses();
            $mail->clearAttachments();
        }
        return count($queue);
    }

    private function studentsAttendingNextLecture()
    {
        $tomorrow = date('Y-m-d', strtotime("tomorrow"));
        $sql = "SELECT l.*, c.name, t1.studentsCount, u.name as userName, u.email
                FROM    (SELECT COUNT(*) as studentsCount, idLesson
                        FROM booking
                        WHERE date LIKE '$tomorrow%'
                        GROUP BY idLesson) AS t1, courses as c, lessons as l, users as u
                WHERE   t1.idLesson = l.idLesson AND
                        l.idCourse=c.idCourse AND
                        l.inPresence=1 AND
                        l.active=1 AND
                        u.idUser=l.idTeacher";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $body = "<p>Dear prof. " . $row['userName'] . ",</p><p>the <b>lecture of " . $row['name'] . "</b> scheduled for " . $row['date'] . " at " . $row['beginTime'] . ", <b>has " . $row['studentsCount'] . " students currently booked</b>.</p>" . $this->signature;
            $subArray = array(
                "to" => $row['email'],
                "userName" => $row['userName'],
                "subject" => "Lecture Information",
                "body" => $body,
            );
            $data[] = $subArray;
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }

    private function bookingConfirmation($id)
    {
        $sql = "SELECT u.email, u.name as userName, c.name as courseName, l.date, l.beginTime
                FROM booking as b, users as u, courses as c, lessons as l
                WHERE   idBooking=$id AND
                        b.idUser=u.idUser AND
                        l.idLesson=b.idLesson AND
                        l.idCourse=c.idCourse";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $body = "<p>Hi " . $row['userName'] . ",</p><p><b>your booking</b> for the lecture of " . $row['courseName'] . ", scheduled for " . $row['date'] . " at " . $row['beginTime'] . ", <b>has been confirmed</b>.</p>" . $this->signature;
            $subArray = array(
                "to" => $row['email'],
                "userName" => $row['userName'],
                "subject" => "Booking Confirmation",
                "body" => $body,
            );
            $data[] = $subArray;
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }

    private function lectureCancelled($id)
    {
        $sql = "SELECT u.email, u.name as userName, c.name as courseName, l.date, l.beginTime
                FROM booking as b, users as u, courses as c, lessons as l
                WHERE   b.idLesson=$id AND
                        isWaiting=0 AND
                        b.idUser=u.idUser AND
                        l.idLesson=b.idLesson AND
                        l.idCourse=c.idCourse";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $body = "<p>Hi " . $row['userName'] . ",</p><p>this email is to inform you that <b>the lecture of " . $row['courseName'] . "</b>, scheduled for " . $row['date'] . " at " . $row['beginTime'] . ", <b>has been cancelled</b>.</p>" . $this->signature;
            $subArray = array(
                "to" => $row['email'],
                "userName" => $row['userName'],
                "subject" => "Lecture Cancelled",
                "body" => $body,
            );
            $data[] = $subArray;
        }
        if (!empty($data)) {
            return $data;
        } else {
            return 0;
        }
    }

    private function takenFromWaitingList($id)
    {
        $sql = "SELECT u.email, u.name as userName, c.name as courseName, l.date, l.beginTime
                FROM booking as b, users as u, courses as c, lessons as l
                WHERE   b.idBooking=$id AND
                        isWaiting=0 AND
                        b.idUser=u.idUser AND
                        l.idLesson=b.idLesson AND
                        l.idCourse=c.idCourse";
        $result = $this->db->query($sql);
        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $body = "<p>Hi " . $row['userName'] . ",</p><p>someone cancelled his reservation for the lecture of " . $row['courseName'] . ", scheduled for " . $row['date'] . " at " . $row['beginTime'] . ".<p>Therefore, <b>you have been taken from the waiting list</b> and <b>your previous booking is now confirmed</b>.</p>" . $this->signature;
            $subArray = array(
                "to" => $row['email'],
                "userName" => $row['userName'],
                "subject" => "Booking Confirmation",
                "body" => $body,
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
