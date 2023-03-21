import React, { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { POSITIONWINNER } from "./constants"
import {
  Grid,
  GridItem,
  Heading,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  useDisclosure,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react"
const App: React.FC = () => {
  const [tablero, setTablero] = useState<(null | string)[]>(Array(9).fill(null))
  const [turn, setTurn] = useState<"✖️" | "⭕">("✖️")
  const [winner, setWinner] = useState<boolean>(false)

  const { isOpen, onClose, onOpen } = useDisclosure()
  const winnerGame = () => {
    for (let index in POSITIONWINNER) {
      const token = POSITIONWINNER[index]
      if (
        tablero[token.x] &&
        tablero[token.x] === tablero[token.y] &&
        tablero[token.x] === tablero[token.z]
      ) {
        setWinner(true)
        confetti()
        onOpen()
        break
      }
    }
  }

  useEffect(() => {
    winnerGame()
  }, [tablero])

  return (
    <>
      <Heading textAlign={"center"} mb={2}>
        X-0
      </Heading>
      <Text mb={2} fontSize={"2xl"} color={"gray.100"}>
        Turno : {turn}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {tablero.map((item, index) => (
          <GridItem
            key={index}
            border="1px"
            w={"100px"}
            h={"100px"}
            color={"gray.100"}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            fontSize={"2xl"}
            mb={2}
            onClick={() => {
              if (winner) {
                return
              }
              const tableroUpdate = [...tablero]
              if (tableroUpdate[index] !== null) {
                return
              }
              tableroUpdate[index] = turn
              setTablero(() => tableroUpdate)
              setTurn(turn === "✖️" ? "⭕" : "✖️")
            }}
          >
            {item !== null ? item : ""}
          </GridItem>
        ))}
      </Grid>
      <Button
        onClick={() => {
          setTablero(Array(9).fill(null))
          setTurn("✖️")
          setWinner(false)
        }}
      >
        Restar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Text align={"center"} fontSize={"2xl"}>
              Ganador {turn === "✖️" ? "⭕" : "✖️"}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default App
