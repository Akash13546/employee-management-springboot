const apiUrl = "http://localhost:8080/api/employees";

document.addEventListener("DOMContentLoaded", loadEmployees);

document.getElementById("employeeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("empId").value;

    const employee = {
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        salary: document.getElementById("salary").value
    };

    if (id) {
        updateEmployee(id, employee);
    } else {
        addEmployee(employee);
    }
});

function loadEmployees() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("employeeTable");
            table.innerHTML = "";
            data.forEach(emp => {
                table.innerHTML += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.department}</td>
                        <td>${emp.salary}</td>
                        <td>
                            <button onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.department}', ${emp.salary})">Edit</button>
                            <button onclick="deleteEmployee(${emp.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function addEmployee(employee) {
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    }).then(() => {
        resetForm();
        loadEmployees();
    });
}

function updateEmployee(id, employee) {
    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    }).then(() => {
        resetForm();
        loadEmployees();
    });
}

function deleteEmployee(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => loadEmployees());
}

function editEmployee(id, name, department, salary) {
    document.getElementById("empId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("department").value = department;
    document.getElementById("salary").value = salary;
}

function resetForm() {
    document.getElementById("empId").value = "";
    document.getElementById("employeeForm").reset();
}
