package com.nayan.Student.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nayan.Student.Enity.Student;
import com.nayan.Student.VO.StudentWithCollege;
import com.nayan.Student.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:3000/")
public class StudentController {

	@Autowired
	private StudentService service;
	
	@GetMapping("/list")
	List<StudentWithCollege> getAll() throws Exception
	{
		return service.allList();
	}
	
	@GetMapping("/{id}")
	StudentWithCollege getById(@PathVariable long id) throws Exception
	{
		try {
			return service.getById(id);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}
	
	@PostMapping(value="/add", consumes = {"multipart/form-data"} )
	String add(@RequestPart("student") Student stu, @RequestPart("file") MultipartFile file) throws Exception
	{
		Student student = service.add(stu, file);
		return student.getName()+" Added Successfully";
	}
	
	@PutMapping("/edit/{id}")
	Student editById(@PathVariable long id,@RequestBody Student stu) throws Exception
	{
		return service.edit(id, stu);
	}
	
	@DeleteMapping("/delete/{id}")
	Student deleteById(@PathVariable long id) throws Exception
	{
		return service.deleteById(id);
	}
	
	@GetMapping("/getByCollege/{id}")
	List<StudentWithCollege> getByCollege(@PathVariable long id) throws Exception
	{
		return service.getByCollege(id);
	}
	
	@GetMapping(value="/file/{imageName}",produces = MediaType.ALL_VALUE)
	void getFile(@PathVariable String imageName,HttpServletResponse response) throws IOException
	{
		InputStream resourse = service.getFile(imageName);
		response.setContentType(imageName);
		StreamUtils.copy(resourse, response.getOutputStream());
	}
}
