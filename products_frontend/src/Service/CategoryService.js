import axios from 'axios';
import {BASE_URL} from './Constant';

export class CategoryService {
    BASE_URL ;

    constructor() {
        this.BASE_URL = BASE_URL;
    }

    async getCategory(){
        try{
            const categories = await axios({
                method: 'get',
                url: this.BASE_URL+"/category/getCategories"
            });

            if(categories){
                return categories;
            }
            else{
                console.log("No Categories found");
                return null;
            }
        }
        catch(error){
            console.log("Category in store is empty.");
            return null;
        }
    }
    
    async postCategory(category){
        try{
            const response = await axios({
                method: 'post',
                url: this.BASE_URL+"/category",
                data: category
            })
            return response;
        }
        catch(error){
            console.log("Category Cannot be created");
        }
    }

    async deleteCategory(id){
        try{
            console.log("id"+ id);
            const response = await axios({
                method: 'delete',
                url: this.BASE_URL+"/category/"+id,
            })
            return response;
        }
        catch(error){
            console.log("Something went wrong, maybe Id not found");
        }
    }

    async patchCategory(editCategoryData){
        try{
            console.log("Inside service level.")
            console.log(editCategoryData)
            const editCategory = await axios({
                method: 'patch',
                url: this.BASE_URL+"/category",
                data: editCategoryData
            })

            return editCategory;

        }
        catch(error){
            console.log(error) ;
            return error;
        }
    }

}

const categoryService = new CategoryService();

export default categoryService;
