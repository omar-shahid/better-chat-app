import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Props {}

const Home: React.FC<Props> = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.emit("user:greet");
    socket.on("an", (m: string) => {
      setMessage(m);
    });
  }, []);
  return (
    <>
      <h1>Hello World</h1> <p className="italic text-gray-500">{message}</p>
    </>
  );
};

export default Home;
