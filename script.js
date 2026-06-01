let employees =
    JSON.parse(
        localStorage.getItem("employees") || "[]"
    );

if (employees.length === 0) {
    employees.push({
        name: "",
        hours: 0
    });
}

const employeeTableBody =
    document.querySelector(
        "#employeeTable tbody"
    );

const resultsTableBody =
    document.querySelector(
        "#resultsTable tbody"
    );

document
    .getElementById("addEmployeeButton")
    .addEventListener("click", addEmployee);

document
    .getElementById("calculateButton")
    .addEventListener("click", calculateTips);

function saveEmployees() {
    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );
}

function renderEmployees() {

    employeeTableBody.innerHTML = "";

    employees.forEach((employee, index) => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                <input
                    type="text"
                    value="${employee.name}">
            </td>

            <td>
                <input
                    type="number"
                    min="0"
                    step="0.25"
                    value="${employee.hours}">
            </td>

            <td>
                <button class="deleteButton">
                    Delete
                </button>
            </td>
        `;

        const nameInput =
            row.querySelector(
                'input[type="text"]'
            );

        const hoursInput =
            row.querySelector(
                'input[type="number"]'
            );

        const deleteButton =
            row.querySelector(
                ".deleteButton"
            );

        nameInput.addEventListener(
            "change",
            event => {
                employees[index].name =
                    event.target.value;
                saveEmployees();
            }
        );

        hoursInput.addEventListener(
            "change",
            event => {
                employees[index].hours =
                    parseFloat(
                        event.target.value
                    ) || 0;

                saveEmployees();
            }
        );

        deleteButton.addEventListener(
            "click",
            () => {
                deleteEmployee(index);
            }
        );

        employeeTableBody.appendChild(row);
    });

    saveEmployees();
}

function addEmployee() {

    employees.push({
        name: "",
        hours: 0
    });

    renderEmployees();
}

function deleteEmployee(index) {

    employees.splice(index, 1);

    if (employees.length === 0) {
        employees.push({
            name: "",
            hours: 0
        });
    }

    renderEmployees();
}

function calculateTips() {

    const totalTips =
        parseFloat(
            document.getElementById(
                "totalTips"
            ).value
        ) || 0;

    const totalHours =
        employees.reduce(
            (sum, employee) =>
                sum + employee.hours,
            0
        );

    resultsTableBody.innerHTML = "";

    if (totalHours === 0) {

        resultsTableBody.innerHTML =
            "<tr><td colspan='2'>No hours entered.</td></tr>";

        return;
    }

    const ratePerHour =
        totalTips / totalHours;

    employees.forEach(employee => {

        const share =
            employee.hours *
            ratePerHour;

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${employee.name || "(Unnamed)"}
            </td>

            <td>
                £${share.toFixed(2)}
            </td>
        `;

        resultsTableBody.appendChild(row);
    });
}

renderEmployees();