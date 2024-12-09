// Employee Data Array (Single Entry)
const employeeData = [
    {
        profileImage: "C:/Users/vaibhav/Desktop/EmployeePayroll/Assets/profile1.png", 
        name: "John Doe",
        gender: "Male",
        department: "Engineering",
        salary: "70,000",
        startDate: "1 Jan 2024"
    }
];

// Function to Populate Table
function populateEmployeeTable() {
    const tableBody = document.getElementById("employeeTableBody");

    // Loop through employee data (only one entry in this case)
    employeeData.forEach(employee => {
        const row = document.createElement("tr");

        // Profile Image (1st column)
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
        departmentCell.textContent = employee.department;
        row.appendChild(departmentCell);

        // Salary
        const salaryCell = document.createElement("td");
        salaryCell.textContent = employee.salary;
        row.appendChild(salaryCell);

        // Start Date
        const startDateCell = document.createElement("td");
        startDateCell.textContent = employee.startDate;
        row.appendChild(startDateCell);

        // Action Buttons (Edit/Delete)
        const actionCell = document.createElement("td");
        actionCell.className = "action-buttons";

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.id = "delete-btn";
        const deleteImg = document.createElement("img");
        deleteImg.src = "C:\Users\vaibhav\Desktop\EmployeePayroll\Assets\delete_icon.png";
        deleteImg.alt = "Delete";
        deleteImg.id = "delete_icon";
        deleteBtn.appendChild(deleteImg);
        actionCell.appendChild(deleteBtn);

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.id = "edit-btn";
        const editImg = document.createElement("img");
        editImg.src = "C:\Users\vaibhav\Desktop\EmployeePayroll\Assets\edit_icon.png";
        editImg.alt = "Edit";
        editImg.id = "edit_icon";
        editBtn.appendChild(editImg);
        actionCell.appendChild(editBtn);

        row.appendChild(actionCell);

        // Append Row to Table Body
        tableBody.appendChild(row);
    });
}

// Call the Function to Populate Table on Page Load
window.onload = populateEmployeeTable;
