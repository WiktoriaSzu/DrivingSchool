export const apiBaseUrl = "/api/students";
export const instructorsApiUrl = "/api/instructor";

export function getStudents(callback) {
    $.get(apiBaseUrl, callback);
}

export function getInstructors(callback) {
    $.get(instructorsApiUrl, callback);
}

export function createStudent (studentData, callback){
    $.ajax({
        url: apiBaseUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(studentData),
        success: callback
    })
}

export function deleteStudent(id, callback) {
    if (confirm("Are you sure you want to delete this student?")) {
        $.ajax({
            url: `${apiBaseUrl}/${id}`,
            type: "DELETE",
            success: callback,
            error: function (xhr) {
                console.error("Failed to delete student:", xhr.responseText);
                alert("The student could not be deleted.");
            }
        });
    }
}

export function saveStudent (studentData, id, callback){
    const url = id ? `${apiBaseUrl}/${id}` : apiBaseUrl;
    const method = id ? "PUT" : "POST";

    $.ajax({
        url: url,
        type: method,
        contentType: "application/json",
        data: JSON.stringify(studentData),
        success: callback
    });
    console.log("student saved?")
}