document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#studentTable tbody');
    
    function updateTable() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        tableBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.age}</td>
                <td>${student.gender}</td>
                <td>${student.course}</td>
                <td>
                    <button onclick="editStudent('${student.id}')" class="btn">Edit</button>
                    <button onclick="deleteStudent('${student.id}')" class="btn btn-secondary">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    updateTable();

    window.editStudent = function(id) {
        window.location.href = `index.html?id=${id}`;
    }

    window.deleteStudent = function(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            let students = JSON.parse(localStorage.getItem('students')) || [];
            students = students.filter(s => s.id !== id);
            localStorage.setItem('students', JSON.stringify(students));
            updateTable();
        }
    }
});

