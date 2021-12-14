package com.rjc_demo1.demo.student;

import com.rjc_demo1.demo.EmailValidator;
import com.rjc_demo1.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService, EmailValidator emailValidator) {
        this.studentDataAccessService = studentDataAccessService;
        this.emailValidator = emailValidator;
    }

    List<Student> getAllStudents() {
     return studentDataAccessService.selectAllStudents();
    }

    //constructor with one parameter
    void addNewStudent(Student student) {
        addNewStudent(null, student);
    }
    //constructor with two parameters
    void addNewStudent(UUID studentId, Student student) {
        //if the student doesn't have an id, then we need to generate one
        UUID newStudentId = Optional.ofNullable(studentId)
                .orElse(UUID.randomUUID());

        //Validate the email
        if (!emailValidator.test(student.getEmail())) {
            throw new ApiRequestException(student.getEmail() + " is not valid");
        }

        //validate email is not yet taken
        if (studentDataAccessService.isEmailTaken(student.getEmail())) {
            throw new ApiRequestException(student.getEmail() + " is taken");
        }

        studentDataAccessService.insertStudent(newStudentId, student);
    }


    List<StudentCourse> getAllCoursesForStudent(UUID studentId) {
        return studentDataAccessService.selectAllStudentCourses(studentId);
    }
}
