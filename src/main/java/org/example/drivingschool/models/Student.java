package org.example.drivingschool.models;

public class Student {
    private String name;
    private int courseId;
    private String instructorName;
    private int hoursDone;

    public Student(String name, int courseId, String instructorName, int hoursDone) {
        this.name = name;
        this.courseId = courseId;
        this.instructorName = instructorName;
        this.hoursDone = hoursDone;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public int getHoursDone() {
        return hoursDone;
    }

    public void setHoursDone(int hoursDone) {
        this.hoursDone = hoursDone;
    }
}

