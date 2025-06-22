package org.example.drivingschool.models;

public class LogIn {
    public String username;
    public String password;

    public LogIn(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPasssword(String passsword) {
        this.password = passsword;
    }
}



