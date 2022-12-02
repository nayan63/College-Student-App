package com.nayan.Student.impl;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static java.nio.file.Paths.get;
import static java.nio.file.Files.copy;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.nayan.Student.Enity.Student;
import com.nayan.Student.VO.StudentWithCollege;
import com.nayan.Student.repository.StudentRepository;
import com.nayan.Student.service.StudentService;

@Component
public class StudentImplement implements StudentService {

	@Autowired
	private StudentRepository repo;

	@Autowired
	RestTemplate restTemplate;

	private final String UPLOAD_PATH = "F:\\JAVA TUTO\\For REACT\\StudentService\\src\\main\\resources\\static";

	@Override
	public List<StudentWithCollege> allList() {
		List<Student> students = repo.findAll();

		List<StudentWithCollege> swcList = new ArrayList<StudentWithCollege>();

		Iterator<Student> itr = students.iterator();
		while (itr.hasNext()) {
			Student std = itr.next();

			String clgName = restTemplate.getForObject("http://COLLEGE-SERVICE/college/college-name/" + std.getCollege_id(), String.class);
			StudentWithCollege swc = new StudentWithCollege(std.getId(), std.getName(), std.getAge(), clgName,
					std.getBranch(),std.getFilename());
			swcList.add(swc);
		}
		return swcList;

	}

	@Override
	public StudentWithCollege getById(long id) throws Exception {
		Optional<Student> exist = repo.findById(id);

		if (exist.isPresent()) {
			Student student = exist.get();
			String collegeName = restTemplate.getForObject("http://COLLEGE-SERVICE/college/college-name/" + student.getCollege_id(), String.class);
			StudentWithCollege swc = new StudentWithCollege(student.getId(), student.getName(), student.getAge(), collegeName,
					student.getBranch(),student.getFilename());
			return swc;
		} else {
			throw new Exception("No Student Find");
		}
	}

	@Override
	public Student add(Student std, MultipartFile profile) throws Exception {
		try {
			String filename = new Date().getTime() + profile.getOriginalFilename();

			Path fileStorage = get(UPLOAD_PATH, filename).toAbsolutePath().normalize();
			copy(profile.getInputStream(), fileStorage, REPLACE_EXISTING);

			std.setFilename(filename);
			Student save = repo.save(std);
			return save;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public Student edit(long id, Student std) throws Exception {
		try {
			Optional<Student> exist = repo.findById(id);

			if (exist.isPresent()) {
				Student before = exist.get();
				before.setName(std.getName());
				before.setAge(std.getAge());
				before.setCollege_id(std.getCollege_id());
				before.setBranch(std.getBranch());

				return repo.save(before);
			} else {
				throw new Exception("No Student Found");
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public Student deleteById(long id) throws Exception {
		try {
			Optional<Student> exist = repo.findById(id);
			if (exist.isPresent()) {
				Student student = exist.get();
				repo.deleteById(id);
				return student;
			} else {
				throw new Exception("Student Not Found");
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public List<StudentWithCollege> getByCollege(long id) throws Exception {
		try {
			List<StudentWithCollege> swcList = new ArrayList<StudentWithCollege>();
			List<Student> students = repo.getByCollege(id);
			if (students.isEmpty()) {
				throw new Exception("No Student Found with id " + id);
			} else {
				String clgName = restTemplate.getForObject("http://COLLEGE-SERVICE/college/college-name/" + id,
						String.class);

				Iterator<Student> itr = students.iterator();
				while (itr.hasNext()) {
					Student std = itr.next();

					StudentWithCollege swc = new StudentWithCollege(std.getId(), std.getName(), std.getAge(), clgName,
							std.getBranch(),std.getFilename());
					swcList.add(swc);
				}
				return swcList;
			}
		} catch (Exception e) {
			throw new Exception("No Student Found with id " + id);
		}
	}

	@Override
	public InputStream getFile(String fileName) throws FileNotFoundException {
		String fullPath = UPLOAD_PATH + File.separator + fileName;

		InputStream is = new FileInputStream(fullPath);
		return is;
	}

}
