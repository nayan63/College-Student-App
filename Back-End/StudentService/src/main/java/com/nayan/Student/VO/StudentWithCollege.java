package com.nayan.Student.VO;

public class StudentWithCollege {

	private long id;
	private String name;
	private int age;
	private String college;
	private String branch;
	private String filename;
	public StudentWithCollege() {
		super();
		// TODO Auto-generated constructor stub
	}
	public StudentWithCollege(long id, String name, int age, String college, String branch, String filename) {
		super();
		this.id = id;
		this.name = name;
		this.age = age;
		this.college = college;
		this.branch = branch;
		this.filename = filename;
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
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	
}
