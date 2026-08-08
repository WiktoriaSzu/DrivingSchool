package org.example.drivingschool.models;

public class InstructorHistory {
    private int history_id;
    private int id;
    private String instructorName;
    private int hours;
    


    public InstructorHistory(int history_id, int id, String instructorName, int hours) {
        this.history_id = history_id;
        this.id = id;
        this.instructorName = instructorName;
        this.hours = hours;
    }

    public int getHistoryId() {
        return history_id;
    }

    public void setHistoryId(int history_id) {
        this.history_id = history_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

}
