import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        color: "gray.100",
      },
    },
  },
  styles: {
    global: {
      body: {
        minH: "100vh",
        w: "100%",
        background: "gray.700",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
      },
    },
  },
})

export { theme }
