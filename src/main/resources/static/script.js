import {createStudent, deleteStudent} from "./api.js";

console.log("heelo world");

function callback(){
    console.log("Document is ready");
    const createStudentButton = document.getElementById("createStudentButton");
    createStudentButton.addEventListener("click", handleCreateStudentSubmit);
    const displayStudentsButton = document.getElementById("fetchStudents");
    displayStudentsButton.addEventListener("click", loadStudents);
    const loginBtn = document.getElementById("loginbtn");
    loginBtn.addEventListener("click", onLogInClick);
}

document.addEventListener("DOMContentLoaded", callback);

function loadStudents(){
    console.log("dddd");
    $.get("http://localhost:8080/api/students", function(responseData){
        console.log("eeee");
        const tableBody = $("#studentTable");
        // $("#studentTable").addClass("ds-student-table");
        tableBody.empty();
        responseData.forEach((student, i) => {
            const pink = i % 2 === 0 ? "pink-row" : ""
            tableBody.append(`
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.courseId}</td>
                        <td>${student.instructorName}</td>
                        <td>${student.hoursDone}</td>
                        <td>
                        <button class="btn btn-info btn-sm manage-enhancements">Manage Instructor</button>
                        <button class="btn btn-warning btn-sm edit-cyborg">Edit</button>
                        <button class="btn btn-danger btn-sm delete-cyborg">Delete</button>
                        </td>
                    </tr>
            `)
        });
    });
}

export function editStudent(name, course, instructorname,hours) {
    $("#studentNameb").val(name);
    $("#studentCourse").val(course);
    $("#studentInstructorName").val(instructorname);
    $("#studentHours").val(hours);
}


export function handleCreateStudentSubmit(event) {
    event.preventDefault();

    alert("TESTING");


    const studentData = {
        name: $("#studentName").val(),
        courseId: $("#studentCourseNr").val(),
        instructorName: $("#studentInstructor").val(),
        hoursDone: $("#studentHoursDone").val()
    };
    console.log(studentData)

    createStudent(studentData, function(response){
        console.log(response);
    });
    /*saveStudent(studentData, studentName, () => {
        alert(studentName ? "Student updated!" : "Student added!");
        $("#studentForm")[0].reset();
        $("#studentName").val("");
        toggleCyborgFormButtons(false)
        loadStudents();
    });*/
}

function login(logInData, callback) {
    $.ajax({
        url: `http://localhost:8080/api/login`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(logInData),
        success: callback,
        error: loginerror
    })
}

function loginerror(){
        alert("incorrect credentials");
}



function onLogInClick(event) {
    event.preventDefault();
    const logInData = {
        password: $("#password").val(),
        username: $("#username").val(),
    }
    login(logInData, loginsuccess);
}

function loginsuccess(){
    alert("welcome!")
}

$("#studentTable").on("click", ".delete-cyborg", function () {
    const name = $(this).closest("tr").data("name");
    deleteStudent(name, loadStudents);
});

