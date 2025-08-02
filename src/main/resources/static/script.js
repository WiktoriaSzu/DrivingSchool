import {getStudents, createStudent, deleteStudent, saveStudent} from "./api.js";

console.log("heelo world");

function callback(){
    console.log("Document is ready");
    const createStudentButton = document.getElementById("addStudentButton");
    createStudentButton.addEventListener("click", handleCreateStudentSubmit);
    const displayStudentsButton = document.getElementById("fetchStudents");
    displayStudentsButton.addEventListener("click", loadStudents);
    // const loginBtn = document.getElementById("loginbtn");
    // loginBtn.addEventListener("click", onLogInClick);
}

document.addEventListener("DOMContentLoaded", callback);

function loadStudents(){
    console.log("dddd");
    getStudents(function(responseData){
        console.log("eeee");
        const tableBody = $("#studentTable");
        // $("#studentTable").addClass("ds-student-table");
        tableBody.empty();
        responseData.forEach((student, i) => {
            const pink = i % 2 === 0 ? "pink-row" : ""
            tableBody.append(`
                    <tr data-id="${student.id}" data-name="${student.name}" data-instructor-name="${student.instructorName}" 
                    data-hours-done="${student.hoursDone}" data-course-id="${student.courseId}">
                        <td>${student.name}</td>
                        <td>${student.courseId}</td>
                        <td>${student.instructorName}</td>
                        <td>${student.hoursDone}</td>
                        <td>${student.id}</td>
                        <td>
                        <button class="btn btn-info btn-sm manage-instructor">Manage Instructor</button>
                        <button class="btn btn-warning btn-sm edit-student">Edit</button>
                        <button class="btn btn-danger btn-sm delete-student">Delete</button>
                        </td>
                    </tr>
            `)
        });
    });
}

export function editStudent(name, courseId, instructorName,hoursDone) {
    console.log("editStudent: ", name, courseId, instructorName, hoursDone);
    $("#editStudentName").val(name);
    $("#editStudentCourseNr").val(courseId);
    $("#editStudentInstructor").val(instructorName);
    $("#editStudentHoursDone").val(hoursDone);
}


export function handleCreateStudentSubmit(event) {
    event.preventDefault();

    alert("TESTING");

    const studentId = $("#studentId").val();
    const studentData = {
        name: $("#studentName").val(),
        courseId: $("#studentCourseNr").val(),
        instructorName: $("#studentInstructor").val(),
        hoursDone: $("#studentHoursDone").val(),
    };
    console.log(studentData)

    createStudent(studentData, function(response){
        console.log(response);
    });

    saveStudent(studentData, studentId, () => {
        alert(studentId ? "Student updated!" : "Student added!");
        $("#studentForm")[0].reset();
        $("#studentName").val("");
        toggleStudentFormButtons(false)
        loadStudents();
    });
}

$("#studentTable").on("click", ".edit-student", function () {
    console.log("edit clicked");
    $('#studentsModal').modal('show');
    const row = $(this).closest("tr");
    toggleStudentFormButtons(true)
    editStudent(
        row.data("name"),
        row.data("course-id"),
        row.data("instructor-name"),
        row.data("hours-done"),
    );
});

$("#cancelStudentEdit").on("click", function(){
    $("#studentForm")[0].reset();
    $("#studentId").val("");
    toggleStudentFormButtons(false);
})

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



