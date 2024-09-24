import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";

type MessagePayload = {
  data: string;
  msg: string;
};

export const Websocket = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("message", (data: MessagePayload) => {
      console.log("message event received!");
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      console.log("Unregistering events...");
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const onSubmit = () => {
    socket.emit("message", value);
    setValue("");
  };

  return (
    <div>
      <div>
        <h1>Websocket Component</h1>
        <div>
          {messages.length === 0 ? (
            <div>No Messages</div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div>
                  <p>{msg.data}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
