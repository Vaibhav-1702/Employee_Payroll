
document.addEventListener('DOMContentLoaded', () => {
    const empForm = $('#emp-form');

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

        // jQuery AJAX call
        $.ajax({
            url: 'http://localhost:3000/EmpList',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(employeeData),
            success: (response) => {
                console.log('Success:', response);
                alert('Employee data saved successfully!');
            },
            error: (xhr, status, error) => {
                console.error('Error:', xhr.responseText);
                alert('Failed to save employee data.');
            }
        });
    });
});