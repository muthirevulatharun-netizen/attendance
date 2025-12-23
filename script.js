// ===================== CONFIG =====================
const API_BASE_URL = 'https://mitsims.in';

// ===================== STATE ======================
let cachedAttendance = null;

// ===================== DOM =========================
const loginForm = document.getElementById('loginForm');
const loginSection = document.getElementById('loginSection');
const attendanceSection = document.getElementById('attendanceSection');
const errorMessage = document.getElementById('errorMessage');
const logoutBtn = document.getElementById('logoutBtn');
const calculateSkipBtn = document.getElementById('calculateSkipBtn');
const skipResults = document.getElementById('skipResults');
const skipDetails = document.getElementById('skipDetails');

// ===================== INIT ========================
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('loggedInUser');
    const storedData = localStorage.getItem('attendanceData');
    if (user && storedData) {
        try {
            const parsed = JSON.parse(storedData);
            cachedAttendance = parsed;
            displayAttendance(user, parsed.subjects, parsed.studentName);
        } catch (err) {
            console.error('Failed to restore cached attendance', err);
            localStorage.removeItem('attendanceData');
        }
    }
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    calculateSkipBtn?.addEventListener('click', calculateSkipDays);
});

// ===================== API ========================
async function fetchAttendanceFromMITS(rollNumber, password) {
    const response = await fetch(`${API_BASE_URL}/api/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNumber, password })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();

    // Expected response:
    // { studentName: "Surya Raju", attendance: [{ subject, present, total }, ...] }
    const subjects = data.attendance || data.subjects || data || [];
    const studentName = data.studentName || data.name || rollNumber;

    return { studentName, subjects };
}

// ===================== LOGIN =======================
async function handleLogin(e) {
    e.preventDefault();
    const roll = document.getElementById('rollNumber').value.trim();
    const pass = document.getElementById('password').value;

    try {
        errorMessage.textContent = 'Signing in...';
        const attendanceData = await fetchAttendanceFromMITS(roll, pass);
        cachedAttendance = attendanceData;
        localStorage.setItem('loggedInUser', roll);
        localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
        displayAttendance(roll, attendanceData.subjects, attendanceData.studentName);
        errorMessage.textContent = '';
    } catch (err) {
        console.error(err);
        errorMessage.textContent = 'Invalid Register Number or Password';
    }
}

// ===================== DISPLAY ====================
function displayAttendance(roll, subjects, studentName = roll) {
    document.getElementById('displayRoll').textContent = roll;
    document.getElementById('displayName').textContent = studentName;

    const list = document.getElementById('attendanceList');
    list.innerHTML = '';

    let totalPercent = 0;

    subjects.forEach(sub => {
        const percent = sub.total > 0
            ? Math.round((sub.present / sub.total) * 100)
            : 0;

        totalPercent += percent;

        list.innerHTML += `
            <div class="attendance-item">
                <h4>${sub.subject} ${percent < 75 ? '⚠️' : '✅'}</h4>
                <p>Present: ${sub.present} / ${sub.total}</p>
                <strong>${percent}%</strong>
            </div>
        `;
    });

    document.getElementById('overallAverage').textContent =
        subjects.length ? (totalPercent / subjects.length).toFixed(1) + '%' : '0%';

    loginSection.classList.remove('active');
    attendanceSection.classList.add('active');
}

// ===================== SKIP =======================
function calculateSkipDays() {
    const user = localStorage.getItem('loggedInUser');
    if (!user || !cachedAttendance) return;

    skipDetails.innerHTML = '';

    cachedAttendance.subjects.forEach(sub => {
        const percent = sub.total > 0 ? (sub.present / sub.total) * 100 : 0;

        let canSkip = percent >= 75
            ? Math.max(Math.floor((sub.total * 0.25) - (sub.total - sub.present)), 0)
            : 0;

        skipDetails.innerHTML += `
            <div class="skip-item">
                <strong>${sub.subject}</strong> → Can skip: ${canSkip}
            </div>
        `;
    });

    skipResults.style.display = 'block';
}

// ===================== LOGOUT =====================
function handleLogout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('attendanceData');
    cachedAttendance = null;
    attendanceSection.classList.remove('active');
    loginSection.classList.add('active');
    skipResults.style.display = 'none';
}