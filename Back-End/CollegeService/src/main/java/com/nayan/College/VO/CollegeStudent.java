package com.nayan.College.VO;

public class CollegeStudent {

	private long id;
	private String name;
	private int age;
	private String college;
	private String branch;
	public CollegeStudent() {
		super();
	}
	public CollegeStudent(long id, String name, int age, String college, String branch) {
		super();
		this.id = id;
		this.name = name;
		this.age = age;
		this.college = college;
		this.branch = branch;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getCollege() {
		return college;
	}
	public void setCollege(String college) {
		this.college = college;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	
	
}
