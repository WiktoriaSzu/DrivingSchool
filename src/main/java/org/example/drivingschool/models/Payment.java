package org.example.drivingschool.models;

public class Payment {
    private int id;
    private String name;
    private int firstPayment;
    private int secondPayment;

    public Payment(int id, String name, int firstPayment, int secondPayment) {
        this.id = id;
        this.name = name;
        this.firstPayment = firstPayment;
        this.secondPayment = secondPayment;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getFirstPayment() {
        return firstPayment;
    }

    public void setFirstPayment(int firstPayment) {
        this.firstPayment = firstPayment;
    }

    public int getSecondPayment() {
        return secondPayment;
    }

    public void setSecondPayment(int secondPayment) {
        this.secondPayment = secondPayment;
    }
}
