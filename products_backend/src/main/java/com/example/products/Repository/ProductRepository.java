package com.example.products.Repository;

import org.springframework.stereotype.Repository;

import com.example.products.Entity.ProductEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String>   {
	
	@Query("SELECT SUM(p.quantity * p.price) FROM ProductEntity p")
	Optional<Double> getInventoryTotalValue();
	//Optional<Double> - avoids null issues when DB empty

}
