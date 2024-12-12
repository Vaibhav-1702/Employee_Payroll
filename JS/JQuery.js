const employeeDat = [
    {
        profileImage: "C:/Users/vaibhav/Desktop/EmployeePayroll/Assets/profile1.png",
        name: "Jane Smith",
        gender: "Female",
        department: "HR",
        salary: "60,000",
        startDate: "10 Feb 2023"
    }
];

function populateEmployeeTable() {
    const $tableBody = $("#employeeTableBody"); // Using jQuery to select the table body

    // Iterate through each employee
    $.each(employeeDat, function(index, employee) {
        const $row = $("<tr></tr>"); // Create a table row using jQuery

        // Profile Image Cell
        const $profileCell = $("<td></td>");
        const $img = $("<img>")
            .attr("src", employee.profileImage)
            .attr("alt", "Profile Image")
            .addClass("profile-img");
        $profileCell.append($img);
        $row.append($profileCell);

        // Name Cell
        const $nameCell = $("<td></td>").text(employee.name);
        $row.append($nameCell);

        // Gender Cell
        const $genderCell = $("<td></td>").text(employee.gender);
        $row.append($genderCell);

        // Department Cell
        const $departmentCell = $("<td></td>").text(employee.department);
        $row.append($departmentCell);

        // Salary Cell
        const $salaryCell = $("<td></td>").text(employee.salary);
        $row.append($salaryCell);

        // Start Date Cell
        const $startDateCell = $("<td></td>").text(employee.startDate);
        $row.append($startDateCell);

        // Action Buttons Cell
        const $actionCell = $("<td></td>").addClass("action-buttons");

        // Delete Button
        const $deleteBtn = $("<button></button>")
            .attr("id", "delete-btn")
            .css("margin-top", "10px");
        const $deleteImg = $("<img>")
            .attr("src", "C:/Users/vaibhav/Desktop/EmployeePayroll/Assets/delete_icon.png")
            .attr("alt", "Delete")
            .attr("id", "delete_icon");
        $deleteBtn.append($deleteImg);
        $actionCell.append($deleteBtn);

        // Edit Button
        const $editBtn = $("<button></button>")
            .attr("id", "edit-btn")
            
            .css("margin-top", "10px");
        const $editImg = $("<img>")
            .attr("src", "C:/Users/vaibhav/Desktop/EmployeePayroll/Assets/edit_icon.png")
            .attr("alt", "Edit")
            .attr("id", "edit_icon");
        $editBtn.append($editImg);
        $actionCell.append($editBtn);

        // Append the Action Cell to Row
        $row.append($actionCell);

        // Append the Row to the Table Body
        $tableBody.append($row);
    });
}

// Call the Function to Populate Table on Page Load using jQuery
$(document).ready(populateEmployeeTable);