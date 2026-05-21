// ==========================================
// 1. FIREBASE CONFIGURATION & INITIALIZATION
// ==========================================
// Make sure to replace these placeholder values with your actual web app keys from your Firebase Console!
const firebaseConfig = {
    apiKey: "AIzaSyC_ssAY3iXPGeRizhipkdTqScQJWZYbx5k",
    authDomain: "mystore-frontend.firebaseapp.com",
    projectId: "mystore-frontend",
    storageBucket: "mystore-frontend.firebasestorage.app",
    messagingSenderId: "688744287244",
    appId: "1:688744287244:web:fc5eb356e90f1b34bdb229",
    measurementId: "G-FP4L9ZZYWN"
};

// Initialize Firebase safely using standard compat mode
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ==========================================
// 2. DYNAMIC FORM SWITCHING CONFIGURATION
// ==========================================
window.toggleAuthForms = function(targetForm) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Hide error alerts and reset field inputs when switching tabs
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input').forEach(input => input.value = '');

    if (targetForm === 'signup') {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    }
};

// Regex format validators
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

// ==========================================
// 3. DOM EVENT LISTENERS & FORM WORKFLOWS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Sync cart badge UI count
    const navCartBadge = document.getElementById('navCartBadge');
    if (navCartBadge) {
        const cartItemsList = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
        navCartBadge.textContent = cartItemsList.reduce((acc, item) => acc + item.quantity, 0);
    }

    // A. HANDLE SECURE LOGIN
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            const emailInput = document.getElementById('loginEmail').value.trim();
            const passwordInput = document.getElementById('loginPassword').value;

            if (!isValidEmail(emailInput)) {
                document.getElementById('loginEmailErr').style.display = 'block';
                isFormValid = false;
            } else {
                document.getElementById('loginEmailErr').style.display = 'none';
            }

            if (passwordInput.trim() === '') {
                document.getElementById('loginPasswordErr').style.display = 'block';
                isFormValid = false;
            } else {
                document.getElementById('loginPasswordErr').style.display = 'none';
            }

            if (isFormValid) {
                auth.signInWithEmailAndPassword(emailInput, passwordInput)
                    .then((userCredential) => {
                        alert("Login Successful! Welcome back.");
                        window.location.href = 'index.html';
                    })
                    .catch((error) => {
                        console.error("Firebase auth login crash details:", error);
                        // Checks for real password mismatched data strings from backend console
                        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                            alert("Wrong password. Please enter the correct password!");
                        } else if (error.code === 'auth/user-not-found') {
                            alert("No user account matches this email record.");
                        } else {
                            alert("Error: " + error.message);
                        }
                    });
            }
        });
    }

    // B. HANDLE USER SIGNUP
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;

            const emailInput = document.getElementById('signupEmail').value.trim();
            const passwordInput = document.getElementById('signupPassword').value;
            const confirmInput = document.getElementById('confirmPassword').value;

            if (!isValidEmail(emailInput)) {
                document.getElementById('signupEmailErr').style.display = 'block';
                isFormValid = false;
            } else {
                document.getElementById('signupEmailErr').style.display = 'none';
            }

            if (!isValidPassword(passwordInput)) {
                document.getElementById('signupPasswordErr').style.display = 'block';
                isFormValid = false;
            } else {
                document.getElementById('signupPasswordErr').style.display = 'none';
            }

            if (passwordInput !== confirmInput || confirmInput.trim() === '') {
                document.getElementById('confirmPasswordErr').style.display = 'block';
                isFormValid = false;
            } else {
                document.getElementById('confirmPasswordErr').style.display = 'none';
            }

            if (isFormValid) {
                auth.createUserWithEmailAndPassword(emailInput, passwordInput)
                    .then((userCredential) => {
                        alert("Account successfully created with Firebase cloud security initialization structures!");
                        toggleAuthForms('login');
                    })
                    .catch((error) => {
                        console.error("Firebase signup registration crash details:", error);
                        alert("Signup Failed: " + error.message);
                    });
            }
        });
    }
});