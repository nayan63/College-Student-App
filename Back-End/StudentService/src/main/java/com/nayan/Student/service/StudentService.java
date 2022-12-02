package com.nayan.Student.service;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nayan.Student.Enity.Student;
import com.nayan.Student.VO.StudentWithCollege;

@Service
public interface StudentService {
	
	List<StudentWithCollege> allList() throws Exception;
	Student getById(long id) throws Exception;
	Student add(Student std,MultipartFile profile) throws Exception;
	Student deleteById(long id) throws Exception;
	List<StudentWithCollege> getByCollege(long id) throws Exception;
	
	InputStream getFile(String fileName) throws FileNotFoundException;
	StudentWithCollege getByIdWithCollege(long id) throws Exception;
	Student edit(long id, Student std, MultipartFile file) throws Exception;
}
