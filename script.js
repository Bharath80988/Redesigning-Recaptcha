// Mouse and Keystroke Detection
let mouseMovementInterval;
let clickInterval;
let mouseX = 0, mouseY = 0;
let typingSpeed = 0;
let keystrokeCount = 0;
let keyPressTimes = [];

// Helper function to add delay between checks (for debounce effect)
const debounce = (fn, delay) => {
  clearTimeout(fn);
  return setTimeout(fn, delay);
};

// Mouse movement tracking
document.addEventListener('mousemove', (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;

    if (mouseMovementInterval) {
        clearInterval(mouseMovementInterval);
    }

    mouseMovementInterval = setInterval(() => {
        // Add logic here to compare movement speed or behavior
    }, 100);
});

// Keystroke tracking
document.getElementById('loginForm').addEventListener('input', (e) => {
    if (e.target.id === 'email' || e.target.id === 'password') {
        const currentTime = Date.now();
        if (keyPressTimes.length > 0) {
            typingSpeed = currentTime - keyPressTimes[keyPressTimes.length - 1];
        }
        keyPressTimes.push(currentTime);
        keystrokeCount++;
    }
});

// HoneyPot field for bot detection
document.getElementById('honeypot').addEventListener('input', function() {
    this.value = ''; // Reset honeypot if filled (used for bot detection)
});

// Button click event - Redirect to Dashboard
const loginButton = document.querySelector('button[type="submit"]');
loginButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Simulate login success (you can add validation here)
    if (validateLogin()) {
        // Redirect to dashboard after successful login
        window.location.href = 'dashboard.html';
    } else {
        // Handle validation failure or show error
        alert("Login failed, please try again.");
    }
});

// Validate login credentials (this is a mock validation, you can replace it with actual validation logic)
function validateLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple mock validation for demonstration
    if (email && password) {
        return true;
    }
    return false;
}

// The code for VPN detection has been removed
