
function populateEmployeeTable(searchQuery = "") {
    const tableBody = document.getElementById("employeeTableBody");
    tableBody.innerHTML = ""; // Clear table before populating

    // Fetch data from JSON Server API
    fetch('http://localhost:3000/EmpList')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Filter employees based on search query
            let filteredData = data;
            if (searchQuery) {
                filteredData = data.filter(emp => 
                    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Iterate through each employee object
            filteredData.forEach(employee => {
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
                const departmentCell = document.createElement("td");
                if (Array.isArray(employee.departments)) {
                    departmentCell.textContent = employee.departments.join(", ");
                } else {
                    departmentCell.textContent = employee.departments;
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
                const deleteImg = document.createElement("img");
                deleteImg.src = "../Assets/delete_icon.png";
                deleteImg.alt = "Delete";
                deleteBtn.appendChild(deleteImg);
                deleteBtn.addEventListener("click", () => deleteEmployee(employee.id));
                actionCell.appendChild(deleteBtn);

                // Edit Button
                const editBtn = document.createElement("button");
                const editImg = document.createElement("img");
                editImg.src = "../Assets/edit_icon.png";
                editImg.alt = "Edit";
                editBtn.appendChild(editImg);
                editBtn.addEventListener("click", () => editEmployee(employee.id));
                actionCell.appendChild(editBtn);

                row.appendChild(actionCell);

                // Append Row to Table Body
                tableBody.appendChild(row);
            });

            // Display message if no data found
            if (filteredData.length === 0) {
                const emptyRow = document.createElement("tr");
                const emptyCell = document.createElement("td");
                emptyCell.colSpan = 7;
                emptyCell.textContent = "No employee found";
                emptyRow.appendChild(emptyCell);
                tableBody.appendChild(emptyRow);
            }
        })
        .catch(error => console.error("Error fetching employee data:", error));
}

function deleteEmployee(id) {
    fetch(`http://localhost:3000/EmpList/${id}`, { method: 'DELETE' })
        .then(() => {
            alert("Employee deleted successfully!");
            populateEmployeeTable(); // Reload table
        })
        .catch(error => console.error("Error deleting employee:", error));
}


function editEmployee(id) {
    // Fetch employee data by ID
    fetch(`http://localhost:3000/EmpList/${id}`)
        .then(response => response.json())
        .then(employeeData => {
            // Store employee data in local storage
            localStorage.setItem('editEmployeeData', JSON.stringify(employeeData));
            // Redirect to registration page
            window.location.href = "../Pages/EmployeePayroll.html";
        })
        .catch(error => console.error("Error fetching employee data for editing:", error));
}


function addSearchFunctionality() {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        const searchQuery = searchInput.value.trim();
        populateEmployeeTable(searchQuery);
        toggleCloseButton(searchQuery); // Show close button if query is not empty
    });

    // Clear search input and reload table
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.id = "close-btn";
    closeButton.style.display = "none"; // Initially hidden
    closeButton.style.marginLeft = "5px";
    closeButton.style.marginRight = "10px";
    closeButton.addEventListener("click", () => {
        searchInput.value = "";
        populateEmployeeTable(); // Reload table
        closeButton.style.display = "none"; // Hide close button
    });
    document.querySelector(".searchBar").appendChild(closeButton);

    function toggleCloseButton(query) {
        closeButton.style.display = query ? "inline-block" : "none";
    }
}

// Call functions on page load
window.onload = () => {
    populateEmployeeTable();
    addSearchFunctionality();
};
