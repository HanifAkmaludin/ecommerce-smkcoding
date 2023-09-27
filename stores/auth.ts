import { defineStore } from "pinia";
import { apiSignin } from "~/api/auth";
import { RegisterPayload } from "~/types/auth";

interface AuthPayload {
  email?: string,
  password?: string,
}

export const authStore = defineStore("auth", {
  state: () => ({
    status: false,
    message: "",
    registerAccount: {} as any,
    account: {} as any,
  }),
  actions: {
    async login(payload: AuthPayload){
      try{
        const { baseUrl, apikey } = useAppConfig();
        const {data, error} = await useFetch("/auth/v1/token?grant_type=password", {
          baseURL: baseUrl,
          method: "POST",
          headers: {
            apikey: apikey,
            "Content-Type": "application/json",
          },
          body: payload,
        })
        
        if(error.value){
          this.status = false;
          this.message = "Login Failed !!!";
        }else if(data){
          this.status = true;
          this.message = "Login Successfully !!!";
          this.account = data.value;
        }

      }catch(error){
        console.log(error);
      }
    },
    async register(payload: AuthPayload){
      try{
        const { baseUrl, apikey } = useAppConfig();
        const {data, error} = await useFetch("/auth/v1/signup", {
          baseURL: baseUrl,
          method: "POST",
          headers: {
            apikey: apikey,
            "Content-Type": "application/json",
          },
          body: payload,
        });

        if(error.value){
          this.status = false;
          this.message = "Register Failed !!!";
        }else if(data){
          this.status = true;
          this.message = "Register Successfully !!!";
          this.registerAccount = data.value;
        }
      }catch(error){
        console.log(error);
      }
    },
    getAccessToken(){
      return localStorage.getItem("access_token");
    }
  }
})