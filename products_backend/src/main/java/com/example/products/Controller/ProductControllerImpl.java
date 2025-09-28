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

import com.example.products.Entity.ProductEntity;
import com.example.products.Service.ProductService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:5173") // allow React dev server
public class ProductControllerImpl implements ProductController {
	
	private static final Logger log = LoggerFactory.getLogger(ProductControllerImpl.class);
	
	@Autowired
	ProductService productservice;

	@Override
	@GetMapping("/getProducts")
	public ResponseEntity<Object> getAllProducts() {
		log.info("Fetching all products from store.");
		List<ProductEntity> allProducts = productservice.fetchAllProducts();
		log.debug("Fetched {} products.", allProducts.size());
		return new ResponseEntity<>(allProducts, HttpStatus.OK);
	}

	@Override
	@GetMapping("/{uid}")
	public ResponseEntity<Object> getProductByUid(@PathVariable("uid") String uid) {
		log.info("Fetching product with UID: {}", uid);
		ProductEntity product = productservice.findProductByUid(uid);
		log.debug("Fetched product details: {}", product.toString());
		return new ResponseEntity<>(product, HttpStatus.OK);
	}

	@Override
	@GetMapping("/getInventoryTotal")
	public ResponseEntity<Object> totalInventory() {
		log.info("Fetching Total Inventory Value.");
		Double totalValue = productservice.calculateInventoryTotal();
		log.debug("Total Inventory Value : {}", totalValue);
		return new ResponseEntity<>(totalValue, HttpStatus.OK);
	}

	@Override
	@PostMapping
	public ResponseEntity<Object> postProduct(@RequestBody ProductEntity product) {
		log.info("Creating New Product: {}", product.toString());
		ProductEntity createProduct = productservice.postProduct(product);
		log.debug("Product Created: {}", createProduct.toString());
		return new ResponseEntity<>(createProduct, HttpStatus.OK);
	}

	
	@Override
	@PatchMapping
	public ResponseEntity<Object> patchProduct(@RequestBody Map<String, Object> request) {
//		log.info("Updating Product Value");
		ProductEntity patchProduct = productservice.patchProduct(request);
		if(patchProduct != null) {
			log.debug("Updated Product: {}", patchProduct.toString());
			return new ResponseEntity<>(patchProduct, HttpStatus.OK);
		}
		log.warn("Product with uid not found");
		return new ResponseEntity<>(patchProduct, HttpStatus.NOT_FOUND);
	}

	@Override
	@DeleteMapping("/{uid}")
	public ResponseEntity<Object> deleteProduct(@PathVariable("uid") String uid) {
		System.out.println("Deleting Product having uid: "+ uid);
		Object result = productservice.deleteProduct(uid);
		if(result == null) {
//			log.warn("Product with uid {} not found.", uid);
			return new ResponseEntity<>("Bad Request", HttpStatus.BAD_REQUEST);
			
		}
//		log.debug("Successfully deleted product with UID: {}", uid);
		return new ResponseEntity<>("Successfully Deleted Product", HttpStatus.OK);
	}

	

	

}
