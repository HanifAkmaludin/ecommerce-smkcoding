import { defineStore } from "pinia";

export const categoryStore = defineStore("category", {
  state: () => ({
    category: {} as any,
    status: false,
    message: "",
  }),
  actions: {
    async getAllCategory(){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const {data, error} = await useFetch("/rest/v1/category", {
          baseURL: baseUrl,
          method: "GET",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`
          },
        })
        
        if(error.value){
          this.status = false;
          this.message = "Get Products Failed !!!";
        }else if(data){
          this.status = true;
          this.message = "Get Products successfully";
          this.category = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },
    async createCategory(payload: any){
      try{
        const { baseUrl, apikey, secretKey } = useAppConfig();
        const {data, error} = await useFetch("/rest/v1/category", {
          baseURL: baseUrl,
          method: "POST",
          headers: {
            apikey: apikey,
            Authorization: `Bearer ${secretKey}`
          },
          body: payload,
        })
        
        if(error.value){
          this.status = false;
          this.message = "Create Category Failed !!!";
        }else if(data){
          this.status = true;
          this.message = "Create Category successfully";
          this.category = data.value;
        }
      }catch(error){
        console.error(error);
      }
    },
  }
})