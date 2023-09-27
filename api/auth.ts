interface AuthPayload {
  email?: string,
  password?: string,
}

const { baseUrl, apikey } = useRuntimeConfig();

export const apiSignin = (payload: AuthPayload) => {
  useFetch("/auth/v1/token?grant_type=password", {
    baseURL: baseUrl,
    method: "POST",
    headers: {
      apikey: apikey,
      "Content-Type": "application/json",
    },
    body: payload,
  })
}