// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const logoutBtn = document.querySelector('#logout-btn');
    const authContainer = document.querySelector('.auth-container');
    const profileContainer = document.querySelector('.profile-container');
    const profileUsername = document.querySelector('#profile-username');

    console.log('Script erfolgreich geladen.');

    // Initialisiere localStorage, falls nicht vorhanden
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }

    // Prüfen, ob ein Benutzer eingeloggt ist
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        console.log(`Benutzer "${storedUser}" ist eingeloggt.`);
        showProfile(storedUser);
    } else {
        console.log('Kein Benutzer eingeloggt.');
    }

    // Login
    loginBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Login-Button geklickt.');

        const username = document.querySelector('#username').value.trim();
        const password = document.querySelector('#password').value.trim();

        if (username && password) {
            if (login(username, password)) {
                alert('Login erfolgreich!');
                showProfile(username);
            } else {
                alert('Ungültige Anmeldedaten.');
                console.warn('Login fehlgeschlagen.');
            }
        } else {
            alert('Bitte Benutzername und Passwort eingeben.');
        }
    });

    // Registrierung
    registerBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Registrierungs-Button geklickt.');

        const username = document.querySelector('#username').value.trim();
        const password = document.querySelector('#password').value.trim();

        if (username && password) {
            if (register(username, password)) {
                alert('Registrierung erfolgreich!');
                console.log(`Benutzer "${username}" wurde registriert.`);
            } else {
                alert('Benutzername ist bereits vergeben.');
                console.warn(`Benutzername "${username}" existiert bereits.`);
            }
        } else {
            alert('Bitte Benutzername und Passwort eingeben.');
        }
    });

    // Logout
    logoutBtn?.addEventListener('click', () => {
        console.log('Logout-Button geklickt.');
        logout();
        showAuth();
        alert('Erfolgreich ausgeloggt.');
    });

    // Profil anzeigen
    function showProfile(username) {
        authContainer.classList.add('hidden');
        profileContainer.classList.remove('hidden');
        profileUsername.textContent = username;
        console.log(`Profil für Benutzer "${username}" angezeigt.`);
    }

    // Auth-Formular anzeigen
    function showAuth() {
        profileContainer.classList.add('hidden');
        authContainer.classList.remove('hidden');
        console.log('Authentifizierungsformular angezeigt.');
    }

    // Registrierung
    function register(username, password) {
        console.log('Registrierungsprozess gestartet...');
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            console.warn('Benutzername bereits vergeben.');
            return false;
        }
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        console.log(`Benutzer "${username}" erfolgreich gespeichert.`);
        return true;
    }

    // Login
    function login(username, password) {
        console.log('Loginprozess gestartet...');
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username] === password) {
            localStorage.setItem('currentUser', username);
            return true;
        }
        return false;
    }

    // Logout
    function logout() {
        localStorage.removeItem('currentUser');
    }
});
