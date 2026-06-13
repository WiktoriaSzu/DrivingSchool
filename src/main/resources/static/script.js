import {getStudents, createStudent, deleteStudent, saveStudent, getInstructors} from "./api.js";

console.log("heelo world");
loadInstructors();

function callback(){
    console.log("Document is ready");
    const createStudentButton = document.getElementById("addStudentButton");
    createStudentButton.addEventListener("click", handleCreateStudentSubmit);
    const displayStudentsButton = document.getElementById("fetchStudents");
    const editStudentButton = document.getElementById("updateStudentButton");
    editStudentButton.addEventListener("click", handleEditStudentSubmit);
    displayStudentsButton.addEventListener("click", loadStudents);
    // const loginBtn = document.getElementById("loginbtn");
    // loginBtn.addEventListener("click", onLogInClick);
}

document.addEventListener("DOMContentLoaded", callback);

const NameInput = document.getElementById("nameInput")
NameInput.addEventListener("keyup", searchName);

export function searchName() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("nameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("studentTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const InstructorInput = document.getElementById("instructorInput")
InstructorInput.addEventListener("keyup", searchByInstructor);

export function searchByInstructor() {
    let instructorInput, instructorFilter, instructorTable, instructorTr, instructorTd, instructorI, instructorTxtValue;
    instructorInput = document.getElementById("instructorInput");
    instructorFilter = instructorInput.value.toUpperCase();
    instructorTable = document.getElementById("studentTable");
    instructorTr = instructorTable.getElementsByTagName("tr");
    for (instructorI = 0; instructorI < instructorTr.length; instructorI++) {
        instructorTd = instructorTr[instructorI].getElementsByTagName("td")[2];
        if (instructorTd) {
            instructorTxtValue = instructorTd.textContent || instructorTd.innerText;
            if (instructorTxtValue.toUpperCase().indexOf(instructorFilter) > -1) {
                instructorTr[instructorI].style.display = "";
            } else {
                instructorTr[instructorI].style.display = "none";
            }
        }
    }
}

const CourseNrHeader = document.getElementById("CourseNr")
const HoursDoneHeader = document.getElementById("HoursDone")
CourseNrHeader.addEventListener("click", function () {sortColumn(1)});
HoursDoneHeader.addEventListener("click", function () {sortColumn(3)});

function sortColumn(n){
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("studentTable");
    switching=true;
    dir = "asc";
    while (switching){
        switching = false;
        rows = table.rows;
        for (i=0; i<(rows.length -1); i++){
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            if (dir === "asc") {
                if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir === "desc") {
                if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function loadStudents(){
    console.log("dddd");
    getStudents(function(responseData){
        console.log("eeee");
        const tableBody = $("#studentTable");
        tableBody.empty();
        responseData.forEach((student) => {
            const rowClass = getStudentRowClass(student);
            console.log("student:", student)
            tableBody.append(`
                    <tr  data-id="${student.id}" data-name="${student.name}" data-instructor-name="${student.instructorName}" 
                    data-hours-done="${student.hoursDone}" data-course-id="${student.courseId}">
                        <td class="${rowClass}">${student.name}</td>
                        <td class="${rowClass}">${student.courseId}</td>
                        <td class="${rowClass}">${student.instructorName}</td>
                        <td class="${rowClass}">${student.hoursDone}</td>
                        <td class="${rowClass}">
                        <button class="btn btn-info btn-sm edit-student">Edit</button>
                        <button class="btn btn-warning btn-sm delete-student">Delete</button>
                        </td>
                    </tr>
            `)
        });
    });
}

function getStudentRowClass(student) {
    if (student.hoursDone > 10 && !student.secondPayment) {
        return "payment-warning-row";
    }
    return "";
}

function loadInstructors(){
    getInstructors(function(responseData){
        const formOptions = $("#addStudentInstructor");
        formOptions.empty();
        responseData.forEach((instructor) => {
            formOptions.append(`
                <option value="${instructor.instructorName}">${instructor.instructorName}</option>
        `)
        })
    })
}


export function updateStudentModalFields(id, name, courseId, instructorName, hoursDone, firstPayment, secondPayment) {
    console.log("editStudent: ", name, courseId, instructorName, hoursDone, firstPayment, secondPayment);
    $("#editStudentId").val(id);
    $("#editStudentName").val(name);
    $("#editStudentCourseNr").val(courseId);
    $("#editStudentInstructor").val(instructorName);
    $("#editStudentHoursDone").val(hoursDone);
    $("#editFirstPayment").prop("checked", firstPayment);
    $("#editSecondPaymentStudent").prop("checked", secondPayment);
}

export function handleEditStudentSubmit(event) {
    event.preventDefault();

    const studentId = $("#editStudentId").val();
    const studentData = {
        name: $("#editStudentName").val(),
        courseId: $("#editStudentCourseNr").val(),
        instructorName: $("#editStudentInstructor").val(),
        hoursDone: $("#editStudentHoursDone").val(),
        firstPayment: $("#editFirstPayment").is(":checked"),
        secondPayment: $("#editSecondPayment").is(":checked"),
    };
    console.log(studentData)

    saveStudent(studentData, studentId, () => {
        alert("Student updated!");
        $('#studentsModal').modal('hide');
        loadStudents();
    });
}


export function handleCreateStudentSubmit(event) {
    event.preventDefault();

    alert("TESTING");

    const studentId = $("#addStudentId").val();
    const studentData = {
        name: $("#addStudentName").val(),
        courseId: $("#addStudentCourseNr").val(),
        instructorName: $("#addStudentInstructor").val(),
        hoursDone: $("#addStudentHoursDone").val(),
        firstPayment: $("#addFirstPayment").is(":checked"),
        secondPayment: $("#addSecondPayment").is(":checked"),
    };
    console.log(studentData)

    // createStudent(studentData, function(response){
    //     console.log(response);
    // });

    saveStudent(studentData, studentId, () => {
        alert(studentId ? "Student updated!" : "Student added!");
        $("#addStudentForm")[0].reset();
        $("#addStudentName").val("");
        toggleStudentFormButtons(false)
        loadStudents();
    });
}

$("#studentTable").on("click", ".edit-student", function () {
    console.log("edit clicked");
    $('#studentsModal').modal('show');
    const row = $(this).closest("tr");
    toggleStudentFormButtons(true)
    updateStudentModalFields(
        row.data("id"),
        row.data("name"),
        row.data("course-id"),
        row.data("instructor-name"),
        row.data("hours-done"),
    );
});

$("#studentTable").on("click", ".delete-student", function () {
    const id = $(this).closest("tr").data("id");
    deleteStudent(id, loadStudents);
});

$("#cancelStudentEdit").on("click", function(){
    $("#studentForm")[0].reset();
    $("#studentId").val("");
    toggleStudentFormButtons(false);
})

export function toggleStudentFormButtons(isEditing) {
    $("#cancelStudentEdit").toggleClass("d-none", !isEditing);
    $("#createStudentButton").toggleClass("d-none", isEditing);
    $("#updateStudentButton").toggleClass("d-none", !isEditing);
}




