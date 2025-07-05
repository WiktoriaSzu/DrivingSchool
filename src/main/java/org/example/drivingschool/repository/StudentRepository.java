package org.example.drivingschool.repository;

import org.example.drivingschool.models.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
                    rs.getInt("id")
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
        String sql = "INSERT INTO students (name, courseId, instructorName, hoursDone) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, student.getName(), student.getCourseId(), student.getInstructorName(), student.getHoursDone());
    }

    public int updateStudent(int id, Student student) {
        String sql = "UPDATE students SET name = ?, courseId = ?, instructorName = ?, hoursDone = ? WHERE Id = ?";
        return jdbcTemplate.update(sql, student.getName(), student.getCourseId(), student.getInstructorName(), student.getHoursDone(), id);
    }

    public void deleteStudent(int id) {
        String sql = "DELETE FROM students WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
