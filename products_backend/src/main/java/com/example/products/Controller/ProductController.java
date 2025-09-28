package com.example.products.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.example.products.Entity.ProductEntity;

@RestController
public interface ProductController {
	
	ResponseEntity<Object> getAllProducts();
	
	ResponseEntity<Object> getProductByUid(String uid);
	
	ResponseEntity<Object> totalInventory();
	
	ResponseEntity<Object> postProduct(ProductEntity product);
	
	ResponseEntity<Object> patchProduct(Map<String, Object> request);
	
	ResponseEntity<Object> deleteProduct(String uid);
	

}
