package com.nayan.Student.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nayan.Student.Enity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{

	@Query(value = "SELECT * FROM tbl_student WHERE college_id=:clg_id",nativeQuery = true)
	List<Student> getByCollege(long clg_id);
}
