
function populateEmployeeTable() {
    const tableBody = document.getElementById("employeeTableBody");

    // Fetch data from JSON Server API
    fetch('http://localhost:3000/EmpList')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Iterate through each employee object
            data.forEach(employee => {
                const row = document.createElement("tr");

                // Profile Image
                const profileCell = document.createElement("td");
                const img = document.createElement("img");
                img.src = employee.profileImage;
                img.alt = "Profile Image";
                img.className = "profile-img";
                profileCell.appendChild(img);
                row.appendChild(profileCell);

                // Name
                const nameCell = document.createElement("td");
                nameCell.textContent = employee.name;
                row.appendChild(nameCell);

                // Gender
                const genderCell = document.createElement("td");
                genderCell.textContent = employee.gender;
                row.appendChild(genderCell);

                // Department
                // const departmentCell = document.createElement("td");
                // departmentCell.textContent = employee.department;
                // row.appendChild(departmentCell);

                const departmentCell = document.createElement("td");

            // Check if departments is an array and join them with commas
                if (Array.isArray(employee.departments)) {
                departmentCell.textContent = employee.departments.join(", "); // Join array elements as a string
                } 
                else 
                {
                departmentCell.textContent = employee.departments; // Handle single string value
                }

                row.appendChild(departmentCell);

                // Salary
                const salaryCell = document.createElement("td");
                salaryCell.textContent = employee.salary;
                row.appendChild(salaryCell);

                // Start Date
                const startDateCell = document.createElement("td");
                startDateCell.textContent = employee.startDate;
                row.appendChild(startDateCell);

                // Action Buttons
                const actionCell = document.createElement("td");
                actionCell.className = "action-buttons";

                // Delete Button
                const deleteBtn = document.createElement("button");
                deleteBtn.id = "delete-btn";
                deleteBtn.style.marginTop = "10px";
                const deleteImg = document.createElement("img");
                deleteImg.src = "../Assets/delete_icon.png";
                deleteImg.alt = "Delete";
                deleteImg.id = "delete_icon";
                deleteBtn.appendChild(deleteImg);
                deleteBtn.addEventListener("click", () => deleteEmployee(employee.id));
                actionCell.appendChild(deleteBtn);

                // Edit Button
                const editBtn = document.createElement("button");
                editBtn.id = "edit-btn";
                editBtn.style.marginTop = "10px";
                const editImg = document.createElement("img");
                editImg.src = "../Assets/edit_icon.png";
                editImg.alt = "Edit";
                editImg.id = "edit_icon";
                editBtn.appendChild(editImg);
                editBtn.addEventListener("click", () => editEmployee(employee.id));
                actionCell.appendChild(editBtn);

                row.appendChild(actionCell);

                // Append Row to Table Body
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching employee data:", error));
}

function deleteEmployee(id) {
    fetch(`http://localhost:3000/EmpList/${id}`, { method: 'DELETE' })
        .then(() => {
            alert("Employee deleted successfully!");
            location.reload();
        })
        .catch(error => console.error("Error deleting employee:", error));
}

// Call the Function to Populate Table on Page Load
window.onload = populateEmployeeTable;

