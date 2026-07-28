package org.example.drivingschool.repository;

import java.util.List;
import java.util.Optional;

import org.example.drivingschool.models.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class StudentRepository {

    private final JdbcTemplate jdbcTemplate;

    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<Student> studentRowMapper = (rs, rowNum) ->
            new Student(
                    rs.getString("name"),
                    rs.getInt("courseId"),
                    rs.getString("instructorName"),
                    rs.getInt("hoursDone"),
                    rs.getInt("id"),
                    rs.getBoolean("first_Payment"),
                    rs.getBoolean("second_Payment")
            );

    public List<Student> getAllStudents() {
        String sql = "SELECT * FROM students";
        return jdbcTemplate.query(sql, studentRowMapper);
    }

    public Optional<Student> getStudentById(int id) {
        String sql = "SELECT * FROM students WHERE id = ?";
        Optional<Student> student = jdbcTemplate.query(sql, studentRowMapper, id).stream().findFirst();
        return student;
    }

    public void createStudent(Student student) {
        String sql = "INSERT INTO students (name, courseId, instructorName, hoursDone, first_Payment, second_Payment) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, student.getName(), student.getCourseId(), student.getInstructorName(), student.getHoursDone(), student.isFirstPayment(), student.isSecondPayment());
    }

    public int updateStudent(int id, Student student) {
        String sql = "UPDATE students SET name = ?, courseId = ?, instructorName = ?, hoursDone = ?, first_Payment = ?, second_Payment = ?  WHERE id = ?";
        return jdbcTemplate.update(sql, student.getName(), student.getCourseId(), student.getInstructorName(), student.getHoursDone(), student.isFirstPayment(), student.isSecondPayment(), id);
    }

    public void deleteStudent(int id) {
        String sql = "DELETE FROM students WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public int addHours(int id, int hours) {
    String sql =
        "UPDATE students SET hoursDone = hoursDone + ? WHERE id = ?";

    return jdbcTemplate.update(sql, hours, id);
    }
}
