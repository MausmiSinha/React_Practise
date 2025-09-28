package com.example.products.Entity;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="products")
public class ProductEntity {
	
	@Id
	@UuidGenerator
	public String uid;

	@Column(name="brand")
	public String brand;
	
	@Column(name="product_name")
	public String product_name;
	
	@Column(name="quantity")
	public int quantity;
	
	@Column(name="price")
	public double price;
	
	@Column(name="category_name")
	public String category_name;


	
	public String getUid() {
		return uid;
	}



	public void setUid(String uid) {
		this.uid = uid;
	}



	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}


	public String getProduct_name() {
		return product_name;
	}



	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}



	public int getQuantity() {
		return quantity;
	}



	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}



	public double getPrice() {
		return price;
	}



	public void setPrice(double price) {
		this.price = price;
	}



	public String getCategory_name() {
		return category_name;
	}



	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}


	@Override
	public String toString() {
		return "ProductEntity [uid=" + uid + ", brand=" + brand + ", productName=" + product_name + ", quantity="
				+ quantity + ", price=" + price + ", category_name=" + category_name + "]";
	}
}
