package com.nayan.College.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nayan.College.VO.CollegeStudent;
import com.nayan.College.entity.College;
import com.nayan.College.exception.CustomException;

@Service
public interface CollegeService {

	College add(College clg) throws CustomException;
	List<College> list() throws CustomException;
	College edit(long id,College clg) throws CustomException;
	College delete(long id) throws CustomException;
	College getById(long id) throws CustomException;
	String getNameById(long id) throws CustomException;
	List<CollegeStudent> getStudentsByCollege(long id) throws CustomException;
}