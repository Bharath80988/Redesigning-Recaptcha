let mouseMovementTimeout;
let mouseX = 0, mouseY = 0;
let lastMouseX = 0, lastMouseY = 0;
let typingSpeed = 0;
let keystrokeCount = 0;
let keyPressTimes = [];
let inactiveTime = 0;
let lastActivityTime = Date.now();

const debounce = (fn, delay) => {
  let timer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

document.addEventListener('mousemove', debounce((event) => {
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    mouseX = event.pageX;
    mouseY = event.pageY;
    
    const movementDistance = Math.sqrt(
      Math.pow(mouseX - lastMouseX, 2) + 
      Math.pow(mouseY - lastMouseY, 2)
    );
    
    if (movementDistance > 5) {
      lastActivityTime = Date.now();
      inactiveTime = 0;
    }
}, 50));

setInterval(() => {
  const currentTime = Date.now();
  inactiveTime = currentTime - lastActivityTime;
}, 1000);

const keypressHandler = debounce((e) => {
    if (e.target.id === 'email' || e.target.id === 'password') {
        const currentTime = Date.now();
        
        if (keyPressTimes.length > 0) {
            typingSpeed = currentTime - keyPressTimes[keyPressTimes.length - 1];
            lastActivityTime = currentTime;
            inactiveTime = 0;
        }
        
        keyPressTimes.push(currentTime);
        keystrokeCount++;
        
        if (keyPressTimes.length >= 5) {
            const recentTimings = [];
            for (let i = keyPressTimes.length - 5; i < keyPressTimes.length - 1; i++) {
                recentTimings.push(keyPressTimes[i+1] - keyPressTimes[i]);
            }
            
            const avgTiming = recentTimings.reduce((a, b) => a + b, 0) / recentTimings.length;
            const variance = recentTimings.reduce((a, b) => a + Math.pow(b - avgTiming, 2), 0) / recentTimings.length;
            
            if (variance < 10 && keyPressTimes.length > 10) {
                // Bot detection logic
            }
        }
    }
}, 10);

document.getElementById('loginForm').addEventListener('input', keypressHandler);

document.getElementById('honeypot').addEventListener('input', function() {
    this.value = ''; 
});

const loginButton = document.querySelector('button[type="submit"]');
loginButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (document.getElementById('honeypot').value !== '') {
        return false;
    }
    
    if (keystrokeCount > 0 && (Date.now() - keyPressTimes[0]) < 1000 && keystrokeCount > 10) {
        return false;
    }
    
    if (validateLogin()) {
        const metrics = {
            typingPatterns: keyPressTimes,
            mouseActivity: { x: mouseX, y: mouseY },
            completionTime: Date.now() - lastActivityTime
        };
        
        window.location.href = 'dashboard.html';
    } else {
        alert("Login failed, please try again.");
    }
});

function validateLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return false;
    }
    
    if (password.length < 6) {
        return false;
    }
    
    return true;
}
