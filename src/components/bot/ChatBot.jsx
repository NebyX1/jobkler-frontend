import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/chatbot.module.css";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { FiSend, FiTrash2 } from "react-icons/fi";

const ChatBot = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      message:
        "¡Hola! Soy el asistente de Jobkler. ¿En qué puedo ayudarte hoy?",
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const getResponse = async () => {
    if (!value.trim()) {
      setError("¡Error! Por favor escribe una pregunta");
      return;
    }

    setIsLoading(true); // Inicia carga

    const updatedChatHistory = [
      ...chatHistory,
      { role: "user", message: value },
    ];

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: updatedChatHistory.filter(
            (chat) => chat.role !== "assistant"
          ),
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("https://chat-server.jobkler.com/api/gemini", options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        { role: "user", message: value },
        { role: "assistant", message: data },
      ]);

      setValue("");
      setError("");
    } catch (err) {
      setError("¡Algo salió mal! Por favor intenta más tarde.");
      console.error(err);
    } finally {
      setIsLoading(false); // Finaliza carga
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([
      {
        role: "assistant",
        message:
          "¡Hola! Soy el asistente de Jobkler. ¿En qué puedo ayudarte hoy?",
      },
    ]);
  };

  return (
    <Container className={styles.chatContainer}>
      <Card className={styles.chatHeader}>
        <Card.Body className="text-center p-2">
          <Card.Title className="m-0 text-white">
            Asistente de Jobkler
          </Card.Title>
        </Card.Body>
      </Card>

      <Card className={styles.messagesContainer}>
        <Card.Body className={styles.messagesBody}>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                chat.role === "user" ? styles.user : styles.assistant
              }`}
            >
              {chat.role === "assistant" ? (
                <ReactMarkdown>{chat.message}</ReactMarkdown>
              ) : (
                <p>{chat.message}</p>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>
      </Card>

      <Card className={styles.inputSection}>
        <Card.Body className="p-2">
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Form onSubmit={(e) => e.preventDefault()}>
            <InputGroup className={styles.inputGroup}>
              <Form.Control
                type="text"
                value={value}
                placeholder="Escribe tu pregunta..."
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && getResponse()}
                className={styles.input}
                disabled={isLoading} // Deshabilita input
              />
            </InputGroup>
            <div className={styles.buttonGroup}>
              <Button
                variant="primary"
                className={styles.sendBtn}
                onClick={getResponse}
                disabled={isLoading} // Deshabilita botón
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Enviando...
                  </>
                ) : (
                  <>
                    <FiSend size={18} /> Enviar
                  </>
                )}
              </Button>
              {chatHistory.length > 1 && (
                <Button
                  variant="secondary"
                  className={styles.clearBtn}
                  onClick={clear}
                  disabled={isLoading} // Deshabilita botón
                >
                  <FiTrash2 size={18} /> Limpiar
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChatBot;