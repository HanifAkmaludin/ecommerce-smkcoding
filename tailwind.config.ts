import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: "#6867C5",
      },
      boxShadow: {
        card: "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
      }
    },
    container: {
      screens: {
          sm: "470px",
          md: "598px",
          lg: "854px",
          xl: "1110px",
      },
      center: true,
    },
  }
}
