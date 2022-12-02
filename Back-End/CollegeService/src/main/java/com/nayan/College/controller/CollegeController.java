package com.nayan.College.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nayan.College.VO.CollegeStudent;
import com.nayan.College.entity.College;
import com.nayan.College.exception.CustomException;
import com.nayan.College.service.CollegeService;

@RestController
@RequestMapping("/college")
@CrossOrigin("http://localhost:3000/")
public class CollegeController {

	@Autowired
	private CollegeService service;

	@PostMapping("/add")
	ResponseEntity<Object> add(@RequestBody College clg) throws CustomException {
		try {
			College college = service.add(clg);
			return new ResponseEntity<Object>(college.getName() + " Added Successfully", HttpStatus.OK);
		} catch (CustomException e) {
			throw new CustomException(e.getMessage());
		}
	}

	@GetMapping("/list")
	ResponseEntity<List<College>> list() throws CustomException {
		try {
			List<College> colleges = service.list();
			return new ResponseEntity<List<College>>(colleges, HttpStatus.OK);
		} catch (CustomException e) {
			throw new CustomException(e.getMessage());
		}
	}

	@PutMapping("/edit/{id}")
	ResponseEntity<Object> edit(@PathVariable Long id, @RequestBody College clg) throws CustomException {
		try {
			College college = service.edit(id, clg);
			return new ResponseEntity<Object>(college.getName() + " Edited Successfully", HttpStatus.OK);
		} catch (CustomException e) {
			throw new CustomException(e.getMessage());
		}
	}

	@DeleteMapping("/delete")
	ResponseEntity<Object> delete(@RequestParam Long id) throws CustomException {
		try {
			College college = service.delete(id);
			return new ResponseEntity<Object>(college.getName() + " Deleted Successfully", HttpStatus.OK);
		} catch (CustomException e) {
			throw new CustomException(e.getMessage());
		}
	}

	@GetMapping("/{id}")
	ResponseEntity<College> getById(@PathVariable Long id) throws CustomException {
		try {
			College college = service.getById(id);
			return new ResponseEntity<College>(college, HttpStatus.OK);
		} catch (CustomException e) {
			throw new CustomException(e.getMessage());
		}
	}

	@GetMapping("/students/{id}")
	ResponseEntity<List<CollegeStudent>> getStudentsByCollege(@PathVariable long id) throws CustomException {
		try {
			List<CollegeStudent> students = service.getStudentsByCollege(id);
			return new ResponseEntity<List<CollegeStudent>>(students, HttpStatus.OK);

		} catch (CustomException e) {
			throw new CustomException(e.getMessage());
		}
	}
	
	@GetMapping("/college-name/{id}")
	public String getNameById(@PathVariable long id) throws CustomException {
		return service.getNameById(id);
	}
}
