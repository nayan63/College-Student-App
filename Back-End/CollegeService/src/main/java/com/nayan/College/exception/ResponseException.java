package com.nayan.College.exception;

import java.util.Date;

public class ResponseException {

	private Date date;
	private String message;
	
	public ResponseException() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ResponseException(Date date, String message) {
		super();
		this.date = date;
		this.message = message;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
