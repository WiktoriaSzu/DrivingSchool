import {getStudents, createStudent, deleteStudent, saveStudent} from "./api.js";

console.log("heelo world");

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

export function updateStudentModalFields(id, name, courseId, instructorName, hoursDone) {
    console.log("editStudent: ", name, courseId, instructorName, hoursDone);
    $("#editStudentId").val(id);
    $("#editStudentName").val(name);
    $("#editStudentCourseNr").val(courseId);
    $("#editStudentInstructor").val(instructorName);
    $("#editStudentHoursDone").val(hoursDone);
}

export function handleEditStudentSubmit(event) {
    event.preventDefault();

    const studentId = $("#editStudentId").val();
    const studentData = {
        name: $("#editStudentName").val(),
        courseId: $("#editStudentCourseNr").val(),
        instructorName: $("#editStudentInstructor").val(),
        hoursDone: $("#editStudentHoursDone").val(),
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
    };
    console.log(studentData)

    // createStudent(studentData, function(response){
    //     console.log(response);
    // });

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



