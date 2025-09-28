package com.example.products.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.products.Entity.CategoryEntity;
import com.example.products.Service.CategoryService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/category")
public class CategoryControllerImpl implements CategoryController{
	
	private static final Logger log = LoggerFactory.getLogger(CategoryControllerImpl.class);
	
	private void dbg(String msg) {
		log.info("CategoryControllerImpl--->"+msg);
	}
	
	@Autowired
	CategoryService categoryService;

	@Override
	@GetMapping("/getCategories")
	public ResponseEntity<Object> getCategories() {
		dbg("Inside getCategories");
		dbg("Fetching categories in Store.");
		List<CategoryEntity> allCategories = categoryService.getAllCategory();
		if(allCategories != null) {
			dbg("{} Categories in store:: "+allCategories.size());
			return new ResponseEntity<>(allCategories, HttpStatus.OK);
		}
		return new ResponseEntity<>("No Category found", HttpStatus.BAD_REQUEST);
	}

	@Override
	@PostMapping
	public ResponseEntity<Object> postCategory(@RequestBody CategoryEntity category) {
		dbg("Inside postCategory");
		try {
			CategoryEntity newCategory = categoryService.postCategory(category);
			if(newCategory != null) {				
				return new ResponseEntity<>(newCategory, HttpStatus.OK);
			}
			return new ResponseEntity<>(newCategory, HttpStatus.BAD_REQUEST);
		}
		catch(Exception e) {
			dbg("Category Object is empty");
			return new ResponseEntity<>("Category Object is Empty", HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	@PatchMapping
	public ResponseEntity<Object> patchCategory(@RequestBody Map<String, Object> request) {
		dbg("Inside patchCategory");
		try {
			CategoryEntity patchCategory = categoryService.patchCategory(request);
			if(patchCategory != null) {
				dbg("Category with UID: "+patchCategory.getId()+" found");
				return new ResponseEntity<>(patchCategory, HttpStatus.OK);
			}else {
				dbg("Category not found");
				return new ResponseEntity<>("Object Not Found", HttpStatus.BAD_REQUEST);
			}
		}
		catch(Exception e) {
			dbg("request is empty");
			return new ResponseEntity<>("Request is empty", HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteCategory(@PathVariable("id") String id) {
		dbg("Inside deleteCategory");
		Object delete = null;
		try {
			dbg("Deleting Category having id: "+ id);
			delete = categoryService.deleteCategory(id);
			if(delete != null && delete.equals("Record Successfully Deleted")) {
				dbg("Delete Successfull");
				return new ResponseEntity<>("Successfully Deleted Category", HttpStatus.OK);
			}
		}
		catch(Exception e) {
			dbg("Exception --> "+e.getMessage());
		}
		dbg("Failed to Delete");
		return new ResponseEntity<>(delete, HttpStatus.BAD_REQUEST);
	}
}
