package com.nayan.College.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nayan.College.entity.College;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {

}
