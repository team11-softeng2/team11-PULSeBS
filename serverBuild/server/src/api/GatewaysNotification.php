<?php
namespace Server\api;

require '../../vendor/autoload.php';
# Usage and Examples at: https: //github.com/PHPMailer/PHPMailer
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class GatewaysNotification
{
    private $db = null;
    public function __construct($db)
    {
        $this->db = $db;
    }

    public function sendEmail($input)
    {
        switch ($input->type) {
            case 'studentsAttendingNextLecture':
                $queue = $this->studentsAttendingNextLecture();
                return $this->dispatch($queue);
                break;
            case 'bookingConfirmation':
                $queue = $this->bookingConfirmation($input->id);
                return $this->dispatch($queue);
                break;
            case 'lectureCancelled':
                $body = "Message body.";
                return "To be implemented...";
                break;
            case 'takenFromWaitingList':
                $body = "Message body.";
                return "To be implemented...";
                break;
            case 'lectureScheduleChange':
                $body = "Message body.";
                return "To be implemented...";
                break;
            default:
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
        $mail->Host = 'authsmtp.securemail.pro'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'no-reply@pulsebs.it'; // SMTP username
        $mail->Password = 'Li7h66eWq896g5aW8tUmCovaKX9jj3'; // SMTP password
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465; // TCP port to connect to
        //Recipients
        $mail->setFrom('no-reply@pulsebs.it', 'PULSeBS');
        //Content
        $mail->isHTML(true); // Set email format to HTML

        foreach ($queue as $key => $row) {
            try {
                $mail->addAddress($row['to'], $row['userName']);
            } catch (Exception $e) {
                echo 'Invalid address skipped: ' . htmlspecialchars($row['email']) . '<br>';
                continue;
            }

            $mail->Subject = $row['subject'];
            $mail->Body = $row['body'];

            try {
                $mail->send();
                // DEBUG
                // print_r($row);
                // echo 'Message sent to :' . htmlspecialchars($row['userName']) . ' (' . htmlspecialchars($row['to']) . ')';
            } catch (Exception $e) {
                echo 'Mailer Error (' . htmlspecialchars($row['to']) . ') ' . $mail->ErrorInfo . '<br>';
                //Reset the connection to abort sending this message
                //The loop will continue trying to send to the rest of the list
                $mail->getSMTPInstance()->reset();
                return 0;
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
            $body = "Dear prof. " . $row['userName'] . ", the lecture of " . $row['name'] . " scheduled for " . $row['date'] . " at " . $row['beginTime'] . ", has " . $row['studentsCount'] . " students currently booked.";
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
            $body = "Hi " . $row['userName'] . ", your booking for the lecture of " . $row['courseName'] . ", scheduled for " . $row['date'] . " at " . $row['beginTime'] . ", has been confirmed.";
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
