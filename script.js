document.addEventListener('DOMContentLoaded', function() {
    const openFormBtn = document.getElementById('openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const formContainer = document.getElementById('formContainer');
    const form = document.getElementById('studentForm');

    openFormBtn.addEventListener('click', () => {
        formContainer.classList.add('active');
    });

    closeFormBtn.addEventListener('click', () => {
        formContainer.classList.remove('active');
        form.reset();
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const studentId = document.getElementById('studentId').value;
        const student = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            course: document.getElementById('course').value
        };

        let students = JSON.parse(localStorage.getItem('students')) || [];

        if (studentId) {
            // Update existing student
            const index = students.findIndex(s => s.id === studentId);
            students[index] = { id: studentId, ...student };
        } else {
            // Add new student
            const id = Date.now().toString();
            students.push({ id, ...student });
        }

        localStorage.setItem('students', JSON.stringify(students));
        form.reset();
        formContainer.classList.remove('active');
        alert('Student saved successfully!');
    });
});

