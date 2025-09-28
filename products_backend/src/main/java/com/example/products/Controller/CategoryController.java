package com.example.products.Controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.products.Entity.CategoryEntity;

@RestController
public interface CategoryController  {
	
	ResponseEntity<Object> getCategories();
	
	ResponseEntity<Object> postCategory(CategoryEntity category);
	
	ResponseEntity<Object> patchCategory(Map<String, Object> request);
	
	ResponseEntity<Object> deleteCategory(String id);
 
}
