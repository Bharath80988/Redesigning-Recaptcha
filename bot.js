// Live event tracking and bot simulation
//Paste this in console for checking

// Event logs
const logEvent = (eventType, eventData) => {
    console.log(`${eventType} detected:`, eventData);
}

// Add a variable to track the bot detection state
let isBotDetected = false;

// Simulating mouse movements in a random pattern
function simulateMouseMovement() {
    const randomX = Math.floor(Math.random() * window.innerWidth);
    const randomY = Math.floor(Math.random() * window.innerHeight);

    const event = new MouseEvent('mousemove', {
        clientX: randomX,
        clientY: randomY,
    });

    // Log mouse movement
    logEvent('Mouse Movement', { clientX: randomX, clientY: randomY });
    document.dispatchEvent(event);
}

// Simulating keypresses with random timing and small variations
function simulateKeystrokes() {
    const keys = ['a', 'b', 'c', 'd', 'e', '1', '2', '3', '!', '@', '#'];
    let keyPressInterval = setInterval(() => {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const event = new KeyboardEvent('keydown', { key: randomKey });

        // Log keystrokes
        logEvent('Keystroke', { key: randomKey });
        document.dispatchEvent(event);
    }, Math.random() * 150 + 100); // Random interval between 100ms to 250ms
    
    // Stop after typing 10 characters (for demonstration)
    setTimeout(() => clearInterval(keyPressInterval), 2000);
}

// Simulating form input (email and password)
function simulateFormInput() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailInput.value = 'testuser@example.com';
    passwordInput.value = 'securepassword';

    // Log form input data
    logEvent('Form Input', { email: emailInput.value, password: passwordInput.value });

    // Simulate typing email
    emailInput.dispatchEvent(new Event('input'));

    // Simulate typing password after a small delay
    setTimeout(() => {
        passwordInput.dispatchEvent(new Event('input'));
    }, 500);
}

// Simulating clicks on the login button
function simulateClick() {
    const loginButton = document.querySelector('button[type="submit"]');
    
    // Log click event
    logEvent('Click Event', { button: 'Login' });
    loginButton.click(); // Trigger click event on login button
}

// Bot detection logic
function detectBot() {
    // If bot-like behavior is detected (e.g., fast keystrokes, repetitive mouse movements), set the flag
    if (isBotDetected) {
        alert('Bot Detected! Redirecting to the dashboard...');
        window.location.href = 'dashboard.html'; // Redirect to dashboard
    }
}

// Run the simulation
function runBotSimulation() {
    setInterval(simulateMouseMovement, 1000); // Simulate mouse movement every second
    simulateKeystrokes(); // Simulate typing
    simulateFormInput(); // Input the form values
    setTimeout(simulateClick, 4000); // Simulate click after 4 seconds
}

// Start the bot simulation after a slight delay
setTimeout(runBotSimulation, 1000);

// Listen to real user events to update the script dynamically
document.addEventListener('mousemove', (e) => {
    logEvent('User Mouse Movement', { clientX: e.clientX, clientY: e.clientY });
    // Detect if mouse movements are too fast (as a simple detection rule)
    if (Math.abs(e.clientX - lastMouseX) < 10 && Math.abs(e.clientY - lastMouseY) < 10) {
        isBotDetected = true;
    }
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

document.addEventListener('keydown', (e) => {
    logEvent('User Keystroke', { key: e.key });
    // Check if keystrokes are happening too fast (as an example of detection)
    if (e.timeStamp - lastKeyPressTime < 100) {
        isBotDetected = true;
    }
    lastKeyPressTime = e.timeStamp;
});

let lastMouseX = 0;
let lastMouseY = 0;
let lastKeyPressTime = 0;

// Trigger the bot detection check
setInterval(detectBot, 2000); // Check every 2 seconds for bot-like behavior
