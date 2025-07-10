package org.example.drivingschool.models;

public class Course {
    private int course_id;
    private String startdate;
    private int price;


    public Course(int course_id, String startdate, int price) {
        this.course_id = course_id;
        this.startdate = startdate;
        this.price = price;
    }


    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    public String getStartdate() {
        return startdate;
    }

    public void setStartdate(String startdate) {
        this.startdate = startdate;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}

