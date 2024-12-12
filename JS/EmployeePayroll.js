
document.addEventListener('DOMContentLoaded', () => {
    const empForm = $('#emp-form');
    const editEmployeeData = JSON.parse(localStorage.getItem('editEmployeeData'));

    // Prefill form fields if edit data exists
    if (editEmployeeData) {
        $('#name').val(editEmployeeData.name);
        $(`input[name="profile"][value="${editEmployeeData.profileImage}"]`).prop('checked', true);
        $(`input[name="gender"][value="${editEmployeeData.gender}"]`).prop('checked', true);

        // Set departments
        if (Array.isArray(editEmployeeData.departments)) {
            editEmployeeData.departments.forEach(department => {
                $(`input[name="department"][value="${department}"]`).prop('checked', true);
            });
        }

        $('#salary').val(editEmployeeData.salary);

        // Split startDate into day, month, year
        const [day, month, year] = editEmployeeData.startDate.split('-');
        $('#day').val(day);
        $('#month').val(month);
        $('#year').val(year);

        $('#notes').val(editEmployeeData.notes);
    }

    empForm.on('submit', (event) => {
        event.preventDefault();

        const employeeData = {
            name: $('#name').val(),
            profileImage: $('input[name="profile"]:checked').val() || null,
            gender: $('input[name="gender"]:checked').val() || null,
            departments: $('input[name="department"]:checked').map(function () { return this.value; }).get(),
            salary: $('#salary').val(),
            startDate: `${$('#day').val()}-${$('#month').val()}-${$('#year').val()}`,
            notes: $('#notes').val()
        };

        if (editEmployeeData) {
            // Update existing employee
            $.ajax({
                url: `http://localhost:3000/EmpList/${editEmployeeData.id}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(employeeData),
                success: (response) => {
                    console.log('Employee updated successfully:', response);
                    alert('Employee details updated successfully!');
                    localStorage.removeItem('editEmployeeData'); // Clear local storage
                    window.location.href = "../Pages/Dashboard.html"; // Redirect back to dashboard
                },
                error: (xhr, status, error) => {
                    console.error('Error updating employee:', xhr.responseText);
                    alert('Failed to update employee data.');
                }
            });
        } else {
            // Create new employee
            $.ajax({
                url: 'http://localhost:3000/EmpList',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(employeeData),
                success: (response) => {
                    console.log('Employee created successfully:', response);
                    alert('Employee data saved successfully!');
                    window.location.href = "../Pages/Dashboard.html"; // Redirect back to dashboard
                },
                error: (xhr, status, error) => {
                    console.error('Error creating employee:', xhr.responseText);
                    alert('Failed to save employee data.');
                }
            });
        }
    });
});
