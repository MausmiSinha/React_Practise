import axios from 'axios';
import {BASE_URL} from './Constant';

export class ProductService {
    BASE_URL ;

    constructor() {
        this.BASE_URL = BASE_URL;
    }

    async getProducts() {
        try{
            const products = await axios({
                method: 'get',
                url: this.BASE_URL+"/product/getProducts"
            });
            
            if(products){
                return products;
            }
            else{
                console.log("No Product in Store");
                return null;
            }

        }
        catch(error){
            console.log("Inside Product Service");
        }
    }

    async postProduct(product) {
        try{
            console.log("Inside Product Service");
            console.log(product);
            const response = await axios({
                method: 'post',
                url: this.BASE_URL+ "/product",
                data: product
            })
            return response;
        }
        catch(error){
            console.log("Inside Product Service, Product not found");
        }
    }

    async patchProduct(product){
        try{
            console.log("Inside Product Service");
            console.log(product);
            const response = await axios({
                method: 'patch',
                url: this.BASE_URL+ "/product",
                data: product
            })

            return response

        } catch(error){
            console.log("Inside Product Service,Something went wrong while updating.");
        }
    }

    async deleteProduct(uid){
        try{
            const response = await axios({
                method: 'delete',
                url: this.BASE_URL+ "/product/"+uid
            })
            return response;
        }
        catch(error){
            console.log("Uid Not Found");
        }
    }

    async getTotalInventory(){
        try{
            const response = await axios({
                method: 'get',
                url: this.BASE_URL+ "/product/getInventoryTotal"
            })

            if(response){
                return response;
            }
            else{
                console.log("No response from backend");
            }
        }
        catch(error){
            console.log("Something went wrong-Didn't get into getTotalInventory")
        }
    }

}

const productService = new ProductService();

export default productService;
