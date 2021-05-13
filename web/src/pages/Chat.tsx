import MainLayout from "../layouts/Main";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { socket } from "./../socket";
import { Formik, Form, Field } from "formik";
import { useQuery } from "react-query";
import { api } from "../api";

type Message = {
  message: string;
  by: string;
  createdAt: string;
};

const ChatPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery("profile", api.user.profile);

  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    if (!id) return navigate("/");
    socket.emit("user:initiateChat", id);
    socket.on("roomIdSuccess", (id: string) => {
      console.log("Room ID", id);
      setRoomId(id);
    });
  }, [id, navigate]);

  useEffect(() => {
    socket.on("user:incomingMessage", (message: Message) => {
      setMessages((p) => p.concat(message));
    });
  }, []);

  return (
    <MainLayout title="Chat">
      {messages.map((msg) => (
        <Fragment key={msg.createdAt}>
          <div className="p-5 bg-gray-200">
            {msg.message} - <b>{msg.by}</b>
          </div>
        </Fragment>
      ))}
      <Formik
        initialValues={{
          message: "",
        }}
        onSubmit={(values, helpers) => {
          socket
            .emit(
              "user:sendMessage",
              roomId,
              values.message,
              data?.profile.name
            )
            .emit("user:greet", (msg: string) => console.log(msg));

          helpers.resetForm();
        }}
      >
        <Form>
          <Field name="message" className="border" />
          <button type="submit"> Submit</button>
        </Form>
      </Formik>
    </MainLayout>
  );
};

export default ChatPage;
