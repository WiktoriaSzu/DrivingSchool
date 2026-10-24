package org.example.drivingschool.repository;

import java.util.List;
import java.util.Optional;

import org.example.drivingschool.models.Instructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class InstructorRepository {

    private final JdbcTemplate jdbcTemplate;

    public InstructorRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<Instructor> instructorRowMapper = (rs, rowNum) ->
            new Instructor(
                    rs.getString("instructorName"),
                    rs.getString("description"),
                    rs.getInt("carNr")
            );

    public List<Instructor> getAllInstructors() {
        String sql = "SELECT * FROM instructor";
        return jdbcTemplate.query(sql, instructorRowMapper);
    }

    public List<Instructor> getInstructorByStudentName (String name) {
        String sql = """
                SELECT instructor.instructorname, description, carnr FROM instructor\s
                LEFT JOIN students
                ON instructor.instructorname = students.instructorname
                WHERE NAME = ?""";
        return jdbcTemplate.query(sql, instructorRowMapper, name);
    }

    public void createInstructor(Instructor instructor) {
        String sql = "INSERT INTO instructor (instructorName, description, carNr) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, instructor.getInstructorName(), instructor.getDescription(), instructor.getCarNr());
    }
    public Optional<Instructor> getInstructorById(String instructorName) {
        String sql = "SELECT * FROM instructor WHERE instructorname = ?";
        Optional<Instructor> instructor = jdbcTemplate.query(sql, instructorRowMapper,  instructorName).stream().findFirst();
        return instructor;
    }

    public int updateInstructor(String instructorName, Instructor instructor) {
        String sql = "UPDATE instructor SET instructorName = ?, description = ?, carNr = ? WHERE instructorName = ?";
        return jdbcTemplate.update(sql, instructor.getInstructorName(), instructor.getDescription(), instructor.getCarNr(), instructorName);
    }

    public int deleteInstructor(String instructorName) {
        String sql = "DELETE FROM instructor WHERE instructorName = ?";
        return jdbcTemplate.update(sql, instructorName);
    }
}
