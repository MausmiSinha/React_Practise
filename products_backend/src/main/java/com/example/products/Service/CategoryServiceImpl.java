package com.example.products.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.example.products.Entity.CategoryEntity;
import com.example.products.Repository.CategoryRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	private static final Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);
	
	private void dbg(String msg) {
		log.info("CategoryServiceImpl--->"+msg);
	}
	
	
	@Autowired
	CategoryRepository categoryRepository;

	@Override
	public List<CategoryEntity> getAllCategory() {
		dbg("Inside getAllCategory");
		try {
			Iterable<CategoryEntity> allCategory = categoryRepository.findAll();
			if(allCategory != null) {
				dbg("All Category Fetched.");
				return (List<CategoryEntity>) allCategory;
			}
			else {
				dbg("No Record Found");
				return null;
			}
		}
		catch(Exception e) {
			dbg("Something went wrong");
			return null;
		}
		
	}

	@Override
	public CategoryEntity postCategory(CategoryEntity obj) {
		dbg("Inside postCategory");
		try {
			
			CategoryEntity post = categoryRepository.save(obj);
			dbg("Created New Category: {}"+ post.getName());
			return post;
		}
		catch(Exception e) {
			dbg("Something went wrong");
			return null;
		}
	}

	@Override
	public CategoryEntity patchCategory(Map<String, Object> fields) {
		dbg("Inside patchCategory");
		String idToSearch = (String) fields.get("id");
		 dbg("Patching category info with id: {}"+ idToSearch);
		 Optional<CategoryEntity> optionalCategory = categoryRepository.findById(idToSearch);
		 if (optionalCategory.isPresent()) {
		 
		        CategoryEntity existingCategory = optionalCategory.get();
		        dbg("Data before patch {}"+ existingCategory.toString());
		        // Iterate on all fields to patch dynamically
	        fields.forEach((key, value) -> {
	            Field field = ReflectionUtils.findField(CategoryEntity.class, key);
		            if (field != null) {

		            	field.setAccessible(true);
		            	ReflectionUtils.setField(field, existingCategory, value);
		            }
		            else {
		            	log.warn("Key '{}' not found.", key);
		            }
		        });
	        	dbg("Patched product successfully: {}"+existingCategory.toString());
		        return categoryRepository.save(existingCategory);
		    }
		 	dbg("Category with id {} not found."+ idToSearch);
			return null;
	}

	@Override
	public Object deleteCategory(String id) {
		dbg("Inside deleteCategory");
		String errMsg = null;
		try {
			boolean deleteid = categoryRepository.existsById(id);
			if(deleteid) {
				categoryRepository.deleteById(id);
				dbg("Category with id {} deleted successfully."+ id);
				return "Record Successfully Deleted";
			}else {
				errMsg = id+" Not Found.";
			}
			
		}
		catch(Exception e){
			dbg("Nothing Found");
			errMsg = e.getMessage();
		}
		return errMsg;
	}

}
