package org.example.drivingschool.repository;
import org.example.drivingschool.models.InstructorHistory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InstructorHistoryRepository {

    private final JdbcTemplate jdbcTemplate;

    public InstructorHistoryRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<InstructorHistory> instructorHistoryRowMapper = (rs, rowNum) ->
            new InstructorHistory(
                    rs.getInt("history_id"),
                    rs.getInt("student_id"),
                    rs.getString("instructorname"),
                    rs.getInt("hours")
            );

    public List<InstructorHistory> getHistoryForStudent(int studentId) {
        String sql = """
                SELECT history_id, student_id, instructorname, hours
                FROM instructor_history
                WHERE student_id = ?
                ORDER BY history_id
                """;
        return jdbcTemplate.query(sql, instructorHistoryRowMapper, studentId);
    }

    public int updateHistory(int historyId, InstructorHistory history) {
        String sql = """
                UPDATE instructor_history
                SET student_id = ?, instructorname = ?, hours = ?
                WHERE history_id = ?
                """;
        return jdbcTemplate.update(
                sql,
                history.getStudentId(),
                history.getInstructorName(),
                history.getHours(),
                historyId
        );
    }

    public int createHistory(InstructorHistory history) {
    String sql = """
            INSERT INTO instructor_history (student_id, instructorname, hours)
            VALUES (?, ?, ?)
            """;
    return jdbcTemplate.update(
            sql,
            history.getStudentId(),
            history.getInstructorName(),
            history.getHours()
    );
    }

    public int deleteHistoryForStudent(int studentId) {
    String sql = "DELETE FROM instructor_history WHERE student_id = ?";
    return jdbcTemplate.update(sql, studentId);
    }

}