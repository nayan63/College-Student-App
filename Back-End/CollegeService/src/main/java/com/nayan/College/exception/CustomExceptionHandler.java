package com.nayan.College.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler{

	@ExceptionHandler(CustomException.class)
	ResponseEntity<Object> notFound(Exception e)
	{
		ResponseException re = new ResponseException(new Date(), e.getMessage());
		return new ResponseEntity<>(re,HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
