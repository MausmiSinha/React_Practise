package com.example.products.Service;

import java.lang.reflect.Field;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ReflectionUtils;
import org.springframework.stereotype.Service;

import com.example.products.Entity.ProductEntity;
import com.example.products.Repository.ProductRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ProductServiceImpl implements ProductService  {
	
	private static final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);
	
	@Autowired
	ProductRepository productRepository;
	

	@Override
	public List<ProductEntity> fetchAllProducts() {
		System.out.println("Service layer...");
		Iterable<ProductEntity> Products = productRepository.findAll();
		List<ProductEntity> products = new ArrayList<ProductEntity>();
		for(ProductEntity i: Products)
			products.add(i);
		return products;
	}

	
	@Override
	public ProductEntity findProductByUid(String uid) {
		
		ProductEntity product = productRepository.findById(uid).get();
		//.get() extracts the actual products object from the Optional
		
	    if(product != null) {
	    	return(product);
	    }
	    else {
	    	System.out.println("No product found with UID: "+ uid);
	    	return null;
	    }
		
	}


	@Override
	public double calculateInventoryTotal() {
		double value = productRepository.getInventoryTotalValue().orElse(null);
		DecimalFormat numberFormat = new DecimalFormat("#.00");
		return Double.parseDouble(numberFormat.format(value));
	}


	@Override
	public ProductEntity postProduct(ProductEntity product) {
		log.info("Saving new product: {}", product.toString());
		ProductEntity createProduct = productRepository.save(product);
		log.debug("Saved product : {}", createProduct.getProduct_name());
		return createProduct;
	}


	@Override
	public ProductEntity patchProduct(Map<String, Object> fields) {
		 String uidToSearch = (String) fields.get("uid");
		 log.info("Patching product info with UID: {}", uidToSearch);
		 ProductEntity optionalProduct = productRepository.findById(uidToSearch).get();
		 if (optionalProduct != null) {
		        log.debug("Data before patch {}", optionalProduct.toString());
		        // Iterate on all fields to patch dynamically
	        fields.forEach((key, value) -> {
	            Field field = ReflectionUtils.findField(ProductEntity.class, key);
		            if (field != null) {

		            	field.setAccessible(true);
		                if ("quantity".equals(key) && value instanceof Number) {
		                    ReflectionUtils.setField(field, optionalProduct, ((Number) value).intValue());
		                } else if ("price".equals(key) && value instanceof Number) {
		                    ReflectionUtils.setField(field, optionalProduct, ((Number) value).doubleValue());
		                } else {
		                    ReflectionUtils.setField(field, optionalProduct, value);
		                }
		            }
		            else {
		            	log.warn("Key '{}' not found.", key);
		            }
		        });
	        	log.debug("Patched product successfully: {}", optionalProduct.toString());
		        return productRepository.save(optionalProduct);
		    }
		 	log.warn("Product with UID {} not found.", uidToSearch);
			return null;
	}


	@Override
	public Object deleteProduct(String id) {
		System.out.println("Inside deleteProduct");
		Optional<ProductEntity> product = productRepository.findById(id);
		if(product.isPresent() ) {
			productRepository.deleteById(id);
			System.out.println("Product with UID "+id+" deleted successfully.");
			return "Record Successfully Deleted";
	}
	System.out.println("Product with UID " +id+" not found.");
	return null;
	}

}
