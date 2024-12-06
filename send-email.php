<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Fehleranzeige aktivieren
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Composer Autoloader laden
require 'vendor/autoload.php';

// Prüfen, ob die Anfrage über POST erfolgt
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // POST-Daten validieren und filtern
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Überprüfen, ob alle Felder ausgefüllt sind
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "Fehler: Bitte füllen Sie alle Felder aus.";
        exit;
    }

    // PHPMailer konfigurieren und E-Mail senden
    $mail = new PHPMailer(true);

    try {
        // SMTP-Debugging aktivieren (nur für die Fehlersuche)
        $mail->SMTPDebug = 2; 
        $mail->Debugoutput = 'html';

        // Mailserver-Einstellungen
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'webseite.bla@gmail.com'; // Deine Gmail-Adresse
        $mail->Password = 'utgf xdyv uvui uqni'; // App-Passwort
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Absender und Empfänger
        $mail->setFrom('webseite.bla@gmail.com', $name); // Absender (deine Gmail-Adresse)
        $mail->addReplyTo($email, $name); // Benutzeradresse als Antwortadresse
        $mail->addAddress('webseite.bla@gmail.com'); // Zieladresse (deine Gmail-Adresse)

        // Inhalt der E-Mail
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = nl2br(htmlspecialchars($message));
        $mail->AltBody = strip_tags($message);

        // E-Mail senden
        $mail->send();
        echo "<script>alert('Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.'); window.location.href='support.html';</script>";
    } catch (Exception $e) {
        echo "<script>alert('Fehler beim Senden der E-Mail: {$mail->ErrorInfo}');</script>";
    }
} else {
    // Wenn die Datei direkt geöffnet wurde (kein POST), eine Fehlermeldung ausgeben
    echo "<script>alert('Ungültige Anfrage. Bitte senden Sie das Formular erneut.'); window.location.href='support.html';</script>";
}
?>
