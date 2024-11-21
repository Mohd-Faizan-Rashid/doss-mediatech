// Firebase configuration



const firebaseConfig = {
    apiKey: "AIzaSyDPNraX2JQNVLY1S2kBFPtxnLciqo_3_nQ",
    authDomain: "form-35d9f.firebaseapp.com",
    databaseURL: "https://form-35d9f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "form-35d9f",
    storageBucket: "form-35d9f.firebasestorage.app",
    messagingSenderId: "556700482543",
    appId: "1:556700482543:web:0c5c54c6a60e063a5b941a",
    measurementId: "G-JTNS5R7GFY"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// DOM elements
const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
const submitBtn = document.getElementById('submitBtn');

// Event listener for form submission
studentForm.addEventListener('submit', submitForm);

// Function to submit the form
function submitForm(e) {
    e.preventDefault();
    
    const name = getElementVal('name');
    const email = getElementVal('email');
    const phone = getElementVal('phone');
    const studentId = getElementVal('studentId');
    
    if (studentId) {
        updateStudent(studentId, name, email, phone);
    } else {
        saveStudent(name, email, phone);
    }
    
    studentForm.reset();
    submitBtn.textContent = 'Add Student';
}

// Function to save student data
function saveStudent(name, email, phone) {
    const newStudentRef = database.ref('students').push();
    
    newStudentRef.set({
        name: name,
        email: email,
        phone: phone
    })
    .then(() => {
        console.log('Student added successfully');
        fetchStudents();
    })
    .catch((error) => {
        console.error('Error adding student: ', error);
    });
}

// Function to fetch students
function fetchStudents() {
    database.ref('students').once('value', (snapshot) => {
        studentTable.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const studentData = childSnapshot.val();
            const studentId = childSnapshot.key;
            const row = studentTable.insertRow();
            
            row.innerHTML = `
                <td>${studentData.name}</td>
                <td>${studentData.email}</td>
                <td>${studentData.phone}</td>
                <td>
                    <button class="edit-btn" data-id="${studentId}">Edit</button>
                    <button class="delete-btn" data-id="${studentId}">Delete</button>
                </td>
            `;
        });
        
        // Add event listeners to edit and delete buttons
        addButtonListeners();
    });
}

// Function to update student data
function updateStudent(id, name, email, phone) {
    database.ref('students/' + id).update({
        name: name,
        email: email,
        phone: phone
    })
    .then(() => {
        console.log('Student updated successfully');
        fetchStudents();
    })
    .catch((error) => {
        console.error('Error updating student: ', error);
    });
}

// Function to delete student data
function deleteStudent(id) {
    database.ref('students/' + id).remove()
    .then(() => {
        console.log('Student deleted successfully');
        fetchStudents();
    })
    .catch((error) => {
        console.error('Error deleting student: ', error);
    });
}

// Helper function to get element values
function getElementVal(id) {
    return document.getElementById(id).value;
}

// Function to add event listeners to edit and delete buttons
function addButtonListeners() {
    const editBtns = document.getElementsByClassName('edit-btn');
    const deleteBtns = document.getElementsByClassName('delete-btn');
    
    for (let btn of editBtns) {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editStudent(id);
        });
    }
    
    for (let btn of deleteBtns) {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteStudent(id);
        });
    }
}

// Function to populate form for editing
function editStudent(id) {
    database.ref('students/' + id).once('value', (snapshot) => {
        const studentData = snapshot.val();
        document.getElementById('studentId').value = id;
        document.getElementById('name').value = studentData.name;
        document.getElementById('email').value = studentData.email;
        document.getElementById('phone').value = studentData.phone;
        submitBtn.textContent = 'Update Student';
    });
}

// Fetch students when the page loads
window.onload = fetchStudents;