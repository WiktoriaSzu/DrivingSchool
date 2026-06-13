package org.example.drivingschool.models;

public class Student {
    private String name;
    private int courseId;
    private String instructorName;
    private int hoursDone;
    private int id;
    private boolean firstPayment;
    private boolean secondPayment;

    public Student(String name, int courseId, String instructorName, int hoursDone, int id, boolean firstPayment, boolean secondPayment) {
        this.name = name;
        this.courseId = courseId;
        this.instructorName = instructorName;
        this.hoursDone = hoursDone;
        this.id = id;
        this.firstPayment = firstPayment;
        this.secondPayment = secondPayment;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isFirstPayment() {
        return firstPayment;
    }

    public void setFirstPayment(boolean firstPayment) {
        this.firstPayment = firstPayment;
    }

    public boolean isSecondPayment() {
        return secondPayment;
    }

    public void setSecondPayment(boolean secondPayment) {
        this.secondPayment = secondPayment;
    }
}

