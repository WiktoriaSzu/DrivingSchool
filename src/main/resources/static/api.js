export const apiBaseUrl = "http://localhost:8080/api/students";
export const instructorsApiUrl = "http://localhost:8080/api/instructor";

export function getStudents(callback) {
    $.get(apiBaseUrl, callback);
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

export function deleteStudent(name, callback) {
    if (confirm("Are you sure you want to delete this student?")) {
        $.ajax({
            url: `${apiBaseUrl}/${name}`,
            type: "DELETE",
            success: callback
        });
        console.log("wiwiwi")
    }
}