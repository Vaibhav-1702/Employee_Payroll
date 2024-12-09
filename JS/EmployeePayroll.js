document.addEventListener('DOMContentLoaded', () => {
    const empForm = document.getElementById('emp-form');

    empForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Fetching form data
        const name = document.getElementById('name').value;

        const profileImage = document.querySelector('input[name="profile"]:checked') 
                             ? document.querySelector('input[name="profile"]:checked').value 
                             : null;

        const gender = document.querySelector('input[name="gender"]:checked') 
                       ? document.querySelector('input[name="gender"]:checked').value 
                       : null;

        // Fetching selected departments (checkbox values)
        const departments = [];
        document.querySelectorAll('input[name="department"]:checked').forEach((checkbox) => {
            departments.push(checkbox.value);
        });

        const salary = document.getElementById('salary').value;

        // Fetching start date
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        const startDate = `${day}-${month}-${year}`;

        const notes = document.getElementById('notes').value;

        // Creating an object with form data
        const employeeData = {
            name: name,
            profileImage: profileImage,
            gender: gender,
            departments: departments,
            salary: salary,
            startDate: startDate,
            notes: notes
        };

        // Printing the object to the console
        console.log('Employee Data:', employeeData);
    });
});