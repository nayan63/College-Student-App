package com.nayan.College.implementation;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.nayan.College.VO.CollegeStudent;
import com.nayan.College.entity.College;
import com.nayan.College.exception.CustomException;
import com.nayan.College.repository.CollegeRepository;
import com.nayan.College.service.CollegeService;

@Component
public class CollegeImpl implements CollegeService {

	@Autowired
	private CollegeRepository repo;
	@Autowired
	RestTemplate restTemplate;
	
	@Autowired
	WebClient.Builder webClient;
	
	@Override
	public College add(College clg) throws CustomException {
		try {
			College college = repo.save(clg);
			return college;
		}
		catch(Exception e)
		{
			throw new CustomException("Something is wrong");
		}
	}

	@Override
	public List<College> list() throws CustomException {
		try
		{
			List<College> listCollege = repo.findAll();
			return listCollege;
		}
		catch(Exception e)
		{
			throw new CustomException(e.getMessage());
		}
	}

	@Override
	public College edit(long id, College clg) throws CustomException {
		try
		{
			Optional<College> find = repo.findById(id);
			if(find.isPresent())
			{
				College oldRec = find.get();
				oldRec.setName(clg.getName());
				oldRec.setCapacity(clg.getCapacity());
				
				return repo.save(oldRec);
			}
			else
			{
				throw new CustomException("College Not Found");
			}
		}
		catch(Exception e)
		{
			throw new CustomException("College Not Found");
		}
	}

	@Override
	public College delete(long id) throws CustomException {
		
		try
		{
			Optional<College> find = repo.findById(id);
			if(find.isPresent())
			{
				College clg = find.get();
				repo.deleteById(id);
				return clg;
			}
			else
			{
				throw new CustomException("College Not Found");
			}
		}
		catch(Exception e)
		{
			throw new CustomException("College Not Found");
		}
	}

	@Override
	public College getById(long id) throws CustomException {
		try
		{
			Optional<College> find = repo.findById(id);
			if(find.isPresent())
			{
				College clg = find.get();
				return clg;
			}
			else
			{
				throw new CustomException("College Not Found");
			}
		}
		catch(Exception e)
		{
			throw new CustomException("College Not Found");
		}
	}

//	RestTemplate
	@Override
	public List<CollegeStudent> getStudentsByCollege(long id) throws CustomException {
		try { 
			CollegeStudent[] students = restTemplate.getForObject("http://STUDENT-SERVICE/student/getByCollege/"+id, CollegeStudent[].class);
			List<CollegeStudent> list = Arrays.asList(students);
			
			return list;
		}
		catch(Exception e)
		{
			throw new CustomException(e.getMessage());
		}
		
	}
	
//	WebClient
//	@Override
//	public List<CollegeStudent> getStudentsByCollege(long id) throws CustomException {
//		try { 
//			List<CollegeStudent> students = webClient.build()
//			.get()
//			.uri("http://localhost:9000/student/getByCollege/"+id)
//			.retrieve()
//			.bodyToMono(new ParameterizedTypeReference<List<CollegeStudent>>() {})
//			.block();
//			
//			return students;
//		}
//		catch(Exception e)
//		{
//			throw new CustomException(e.getMessage());
//		}
//		
//	}

	@Override
	public String getNameById(long id) throws CustomException {
		College clg = repo.findById(id).get();
		return clg.getName();
	}

}
