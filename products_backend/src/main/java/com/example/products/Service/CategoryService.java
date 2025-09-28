package com.example.products.Service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.products.Entity.CategoryEntity;

@Service
public interface CategoryService {
	List<CategoryEntity> getAllCategory();
	
	CategoryEntity postCategory(CategoryEntity obj);
	
	CategoryEntity patchCategory(Map<String, Object> fields);
	
	Object deleteCategory(String id);

}
