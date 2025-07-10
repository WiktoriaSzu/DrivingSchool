package org.example.drivingschool.repository;

import org.example.drivingschool.models.Course;
import org.example.drivingschool.models.Instructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.List;
import java.util.Optional;

public class CourseRepository {
    private final JdbcTemplate jdbcTemplate;

    public CourseRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<Course> courseRowMapper = (rs, rowNum) ->
            new Course(
                    rs.getInt("course_id"),
                    rs.getString("startdate"),
                    rs.getInt("price")
            );

    public List<Course> getAllCourses() {
        String sql = "SELECT * FROM course";
        return jdbcTemplate.query(sql, courseRowMapper);
    }

    public List<Course> getCourseById (int course_id) {
        String sql = " SELECT course WHERE course_id = ?";
        return jdbcTemplate.query(sql, courseRowMapper, course_id);
    }

    public void createCourse(Course course) {
        String sql = "INSERT INTO course (course_id, startdate, price) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, course.getCourse_id(), course.getStartdate(), course.getPrice());
    }
    public Optional<Course> getInstructorByStartdate(String startdate) {
        String sql = "SELECT * FROM course WHERE startdate = ?";
        Optional<Course> course = jdbcTemplate.query(sql, courseRowMapper,  startdate).stream().findFirst();
        return course;
    }

    public int updateCourse(String startdate, Course course) {
        String sql = "UPDATE course SET price = ? WHERE startdate = ?";
        return jdbcTemplate.update(sql, course.getCourse_id(), course.getStartdate(), course.getPrice());
    }

    public void deleteCourse(String startdate) {
        String sql = "DELETE FROM course WHERE startdate = ?";
        jdbcTemplate.update(sql, startdate);
    }
}
