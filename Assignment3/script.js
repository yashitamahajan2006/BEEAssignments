const form = document.getElementById("feedbackForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const course = document.getElementById("course");
const feedback = document.getElementById("feedback");

// Show Error
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Clear Error
function clearError(id) {
    document.getElementById(id).textContent = "";
}

// Remove errors automatically
name.addEventListener("input", () => {
    if (name.value.trim().length >= 3) {
        clearError("nameError");
    }
});

email.addEventListener("input", () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(email.value)) {
        clearError("emailError");
    }
});

course.addEventListener("change", () => {
    if (course.value !== "") {
        clearError("courseError");
    }
});

feedback.addEventListener("input", () => {
    if (feedback.value.trim() !== "") {
        clearError("feedbackError");
    }
});

// Submit Form
form.addEventListener("submit", function (e) {

    e.preventDefault();

    let valid = true;

    // Name Validation
    if (name.value.trim().length < 3) {
        showError("nameError", "Name must contain at least 3 characters.");
        valid = false;
    }

    // Email Validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        showError("emailError", "Email is required.");
        valid = false;
    } else if (!pattern.test(email.value)) {
        showError("emailError", "Enter a valid email.");
        valid = false;
    }

    // Course Validation
    if (course.value === "") {
        showError("courseError", "Please select a course.");
        valid = false;
    }

    // Feedback Validation
    if (feedback.value.trim() === "") {
        showError("feedbackError", "Please enter feedback.");
        valid = false;
    }

    if (valid) {

        const studentData = {
            name: name.value,
            email: email.value,
            course: course.value,
            feedback: feedback.value
        };

        // Store in Local Storage
        localStorage.setItem("feedback", JSON.stringify(studentData));

        // Store in Session Storage
        sessionStorage.setItem("sessionUser", name.value);

        // Display Data
        displayData();

        // Reset Form
        form.reset();

        // Clear Error Messages
        clearError("nameError");
        clearError("emailError");
        clearError("courseError");
        clearError("feedbackError");
    }

});

// Display Stored Data
function displayData() {

    const data = JSON.parse(localStorage.getItem("feedback"));
    const sessionUser = sessionStorage.getItem("sessionUser");

    if (data) {

        document.getElementById("storedData").innerHTML = `
            <h3>Stored Feedback</h3>
            <p><b>Name:</b> ${data.name}</p>
            <p><b>Email:</b> ${data.email}</p>
            <p><b>Course:</b> ${data.course}</p>
            <p><b>Feedback:</b> ${data.feedback}</p>
        `;

    } else {

        document.getElementById("storedData").innerHTML = "No feedback stored.";
    }

    if (sessionUser) {

        document.getElementById("sessionUser").innerHTML =
            `Current Session User: <b>${sessionUser}</b>`;

    } else {

        document.getElementById("sessionUser").innerHTML = "";
    }
}

// Delete Stored Data
document.getElementById("deleteBtn").addEventListener("click", function () {

    localStorage.removeItem("feedback");
    sessionStorage.removeItem("sessionUser");

    document.getElementById("storedData").innerHTML = "No feedback stored.";
    document.getElementById("sessionUser").innerHTML = "";
});

// Display Stored Data when page loads
displayData();