let editingIndex = -1;

document.addEventListener("DOMContentLoaded", loadStudents);

function addStudent() {
  const name = document.getElementById("name").value;
  const className = document.getElementById("class").value;
  const address = document.getElementById("address").value;
  const contact = document.getElementById("contact").value;

  if (name === "" || className === "" || address === "" || contact === "") {
    alert("Please fill all fields.");
    return;
  }

  const studentsTable = document
    .getElementById("studentsTable")
    .getElementsByTagName("tbody")[0];

  if (editingIndex === -1) {
    // Adding a new student
    const row = studentsTable.insertRow();
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = className;
    row.insertCell(2).innerText = address;
    row.insertCell(3).innerText = contact;

    const actionsCell = row.insertCell(4);
    actionsCell.innerHTML = `<button onclick="editStudent(this)">Edit</button> <button onclick="deleteStudent(this)">Delete</button>`;

    saveStudents();
  } else {
    // Editing an existing student
    const row = studentsTable.rows[editingIndex];
    row.cells[0].innerText = name;
    row.cells[1].innerText = className;
    row.cells[2].innerText = address;
    row.cells[3].innerText = contact;

    editingIndex = -1;
    document.getElementById("studentForm").reset();

    saveStudents();
  }
}

function editStudent(button) {
  const row = button.parentNode.parentNode;
  const name = row.cells[0].innerText;
  const className = row.cells[1].innerText;
  const address = row.cells[2].innerText;
  const contact = row.cells[3].innerText;

  document.getElementById("name").value = name;
  document.getElementById("class").value = className;
  document.getElementById("address").value = address;
  document.getElementById("contact").value = contact;

  editingIndex = row.rowIndex - 1; // Adjust for the header row
}

function deleteStudent(button) {
  const row = button.parentNode.parentNode;
  const studentsTable = document
    .getElementById("studentsTable")
    .getElementsByTagName("tbody")[0];
  studentsTable.deleteRow(row.rowIndex - 1); // Adjust for the header row

  saveStudents();
}

function saveStudents() {
  const studentsTable = document
    .getElementById("studentsTable")
    .getElementsByTagName("tbody")[0];
  const rows = studentsTable.getElementsByTagName("tr");
  const students = [];

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    students.push({
      name: cells[0].innerText,
      class: cells[1].innerText,
      address: cells[2].innerText,
      contact: cells[3].innerText,
    });
  }

  localStorage.setItem("students", JSON.stringify(students));
}

function loadStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const studentsTable = document
    .getElementById("studentsTable")
    .getElementsByTagName("tbody")[0];

  students.forEach((student) => {
    const row = studentsTable.insertRow();
    row.insertCell(0).innerText = student.name;
    row.insertCell(1).innerText = student.class;
    row.insertCell(2).innerText = student.address;
    row.insertCell(3).innerText = student.contact;

    const actionsCell = row.insertCell(4);
    actionsCell.innerHTML = `<button onclick="editStudent(this)">Edit</button> <button onclick="deleteStudent(this)">Delete</button>`;
  });
}
