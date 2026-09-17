import {getStudents, createStudent, deleteStudent, saveStudent, getInstructors} from "./api.js";

console.log("heelo world");
loadInstructors();

function callback(){
    console.log("Document is ready");
    const createStudentButton = document.getElementById("addStudentButton");
    createStudentButton.addEventListener("click", handleCreateStudentSubmit);
    const displayStudentsButton = document.getElementById("fetchStudents");
    displayStudentsButton.addEventListener("click", loadStudents);
    document.getElementById("editStudentForm").addEventListener("submit", handleEditStudentSubmit); // ADDED
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

const CourseNrInput = document.getElementById("courseNrInput")
CourseNrInput.addEventListener("keyup", searchByCourseNr);

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

export function searchByCourseNr() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("courseNrInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("studentTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
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


/**
 * Fetches all students from the API and renders them into the student table.
 * Clears the existing table rows before populating with updated data.
 * Each row is styled based on payment status via getStudentRowClass.
 */
function createTextCell(value, rowClass = "") {
    return $("<td>")
        .addClass(rowClass)
        .text(value ?? "");
}

function createActionCell(rowClass = "") {
    return $("<td>")
        .addClass("action-cell")
        .addClass(rowClass)
        .append(
            $("<button>")
                .addClass("btn btn-info btn-sm edit-student")
                .text("Edit"),
            $("<button>")
                .addClass("btn btn-warning btn-sm delete-student")
                .text("Delete")
        );
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

            const row = $("<tr>")
                .attr("data-id", student.id)
                .attr("data-name", student.name)
                .attr("data-instructor-name", student.instructorName)
                .attr("data-hours-done", student.hoursDone)
                .attr("data-course-id", student.courseId)
                .attr("data-first-payment", student.firstPayment)
                .attr("data-second-payment", student.secondPayment);

            row.append(
                createTextCell(student.name, rowClass),
                createTextCell(student.courseId, rowClass),
                createTextCell(student.instructorName, rowClass),
                createTextCell(student.hoursDone, rowClass),
                createActionCell(rowClass)
            );

            tableBody.append(row);
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
            formOptions.append(
                $("<option>")
                    .val(instructor.instructorName)
                    .text(instructor.instructorName)
            );
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
    $("#editSecondPayment").prop("checked", secondPayment);
}

export function handleEditStudentSubmit(event) {
    event.preventDefault();

    const studentId = $("#editStudentId").val();
    const addHours = Number($("#editStudentAddHours").val());
    const studentData = {
        name: $("#editStudentName").val(),
        courseId: $("#editStudentCourseNr").val(),
        instructorName: $("#editStudentInstructor").val(),
        hoursDone: Number($("#editStudentHoursDone").val()) + addHours,
        firstPayment: $("#editFirstPayment").is(":checked"),
        secondPayment: $("#editSecondPayment").is(":checked"),
    };
    console.log(studentData)

    saveStudent(studentData, studentId, () => {
        alert("Student updated!");

        
    if (addHours > 0) {
        fetch("/api/instructor-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                studentId: Number(studentId),
                instructorName: studentData.instructorName,
                hours: addHours
            })
        }).then(() => loadStudentHistory(studentId));;
    }

        loadStudents();
        $("#editStudentAddHours").val("");
        updateStudentModalFields(
            studentId,
            studentData.name,
            studentData.courseId,
            studentData.instructorName,
            studentData.hoursDone,
            studentData.firstPayment,
            studentData.secondPayment
        );


    }
);
}


export function handleCreateStudentSubmit(event) {
    event.preventDefault();

    alert("TESTING");

    const studentId = $("#addStudentId").val();
    const studentData = {
        name: $("#addStudentName").val(),
        courseId: $("#addStudentCourseNr").val(),
        instructorName: $("#addStudentInstructor").val(),
        hoursDone: Number($("#addStudentHoursDone").val()),
        firstPayment: $("#addFirstPayment").is(":checked"),
        secondPayment: $("#addSecondPayment").is(":checked"),
    };
    console.log(studentData)

    // createStudent(studentData, function(response){
    //     console.log(response);
    // });

    saveStudent(studentData, studentId, (response) => {
        alert(studentId ? "Student updated!" : "Student added!");

        // adding a student creates instructor history if added already with hours
        if (!studentId && studentData.hoursDone > 0) {    
        fetch("/api/instructor-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                studentId: response.id,
                instructorName: studentData.instructorName,
                hours: studentData.hoursDone
            })
        });
    }

        $("#addStudentForm")[0].reset();
        $("#addStudentName").val("");
        toggleStudentFormButtons(false)
        loadStudents();
    });
}

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

// Instructor history part


$("#studentTable").on("click", ".edit-student", function () {
    console.log("edit clicked");
    $('#studentsModal').modal('show');
    const row = $(this).closest("tr");
    toggleStudentFormButtons(true);
    updateStudentModalFields(
        row.data("id"),
        row.data("name"),
        row.data("course-id"),
        row.data("instructor-name"),
        row.data("hours-done"),
        row.data("first-payment"),
        row.data("second-payment")
    );
    loadStudentHistory(row.data("id")); // load history when edit opens
});

async function loadStudentHistory(studentId) {
    const tbody = $("#editStudentHistoryBody");
    tbody.empty();
    tbody.append(
        $("<tr>").append(
            $("<td>").attr("colspan", "3").text("Loading...")
        )
    );

    const res = await fetch(`/api/instructor-history/student/${studentId}`);
    const rows = await res.json();

    tbody.empty();

    if (!rows.length) {
        tbody.append(
            $("<tr>").append(
                $("<td>").attr("colspan", "3").text("No history found.")
            )
        );
        return;
    }

    rows.forEach((rowData) => {
        const row = $("<tr>");
        row.append(
            $("<td>").text(rowData.historyId ?? ""),
            $("<td>").text(rowData.instructorName ?? rowData.instructorname ?? ""),
            $("<td>").text(rowData.hours ?? 0)
        );
        tbody.append(row);
    });
}





