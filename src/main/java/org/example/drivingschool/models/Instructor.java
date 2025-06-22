package org.example.drivingschool.models;

public class Instructor {
    private String instructorName;
    private String description;
    private int carNr;

    public Instructor(String instructorName, String description, int carNr) {
        this.instructorName = instructorName;
        this.description = description;
        this.carNr = carNr;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCarNr() {
        return carNr;
    }

    public void setCarNr(int carNr) {
        this.carNr = carNr;
    }
}
