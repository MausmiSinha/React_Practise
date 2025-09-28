package com.example.products.Service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.products.Entity.ProductEntity;

@Service
public interface ProductService {
	
	List<ProductEntity> fetchAllProducts();
	
	ProductEntity findProductByUid(String uid);

	double calculateInventoryTotal();
	
	ProductEntity postProduct(ProductEntity product);
	
	ProductEntity patchProduct(Map<String, Object> fields);
	
	Object deleteProduct(String uid);
}


