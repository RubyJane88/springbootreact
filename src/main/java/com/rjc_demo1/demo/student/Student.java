package com.rjc_demo1.demo.student;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;


public class Student {
    private final UUID studentId;

    @NotBlank(message = "First Name is required")
    private final String firstName;

    @NotBlank(message = "LastName is required")
    private final String lastName;

    @NotBlank
    private final String email;

    @NotNull(message = "Gender is required")
    private final Gender gender;

    public enum Gender {
        MALE,
        FEMALE,
        UNKNOWN
    }

    public Student(@JsonProperty("studentId") UUID studentId,
             @JsonProperty("firstName") String firstName,
            @JsonProperty("lastName")  String lastName,
            @JsonProperty("email")  String email,
            @JsonProperty("gender")  Gender gender) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;

    }

    //NO NEED FOR SETTER BECAUSE THESE ARE PERMANENT
    public UUID getStudentId() {
        return studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public Gender getGender() {
        return gender;
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentId=" + studentId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                '}';
    }
}