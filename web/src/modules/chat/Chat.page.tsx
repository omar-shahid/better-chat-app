import autosize from "autosize";
import Picker from "emoji-picker-react";
import { Formik } from "formik";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
// @ts-ignore
import ReactEmoji from "react-emoji";
import Linkify from "react-linkify";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { chatAPI } from "./chat.api";
import MainLayout from "../../common/layouts/Main";
import { settingsActions } from "../../common/redux/reducers/settings";
import { RootState, useAppDispatch } from "../../common/redux/store";
import { socket } from "../../common/lib/socket";
import { Message } from "../../types";

const ChatPage: React.FC = () => {
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useAppDispatch();

  const scrollAnchor = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery("prevMessages", () => chatAPI.getPrevMessages(id));

  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState("");
  const [emojiModalOpened, setEmojiModalOpened] = useState(false);

  useEffect(() => {
    if (!id) return navigate("/");
    socket.emit("user:initiateChat", id);
    socket.on("roomIdSuccess", (id: string) => {
      console.log("Room ID", id);
      setRoomId(id);
    });
  }, [id, navigate]);

  useLayoutEffect(() => {
    if (scrollAnchor.current)
      scrollAnchor.current.scrollIntoView({ behavior: "smooth" });
    autosize(document.querySelectorAll("textarea"));
  });

  useEffect(() => {
    if (data?.messages.length) setMessages(data.messages);
  }, [data?.messages]);

  useEffect(() => {
    socket.on("user:incomingMessage", (message: Message) => {
      setMessages((p) => p.concat(message));
    });
  }, [user.profile.id]);

  useEffect(() => {
    dispatch(settingsActions.setDarkBg(true));
    return () => {
      dispatch(settingsActions.setDarkBg(false));
    };
  }, [dispatch]);

  return (
    <div className="overflow-hidden ">
      <MainLayout title="Chat" className="h-auto overflow-y-hidden bg-gray-900">
        <div
          className="w-screen pb-4 overflow-y-scroll bg-gray-200"
          style={{ height: "70vh", width: "100%" }}
        >
          <div className="container mx-auto">
            {messages.map((msg) => (
              <Fragment key={msg.createdAt}>
                {user.profile.id === msg.sender ? (
                  <>
                    <div
                      className="p-6 mb-2 ml-auto text-white break-all bg-gray-900 rounded-lg message bg-opacity-80"
                      style={{ maxWidth: "66.666667%" }}
                    >
                      <Linkify>{ReactEmoji.emojify(msg.message)}</Linkify>
                    </div>
                  </>
                ) : (
                  <div
                    className="p-6 mb-2 mr-auto text-gray-900 break-all bg-white rounded-lg message bg-opacity-80"
                    style={{ maxWidth: "66.666667%" }}
                  >
                    <Linkify>{ReactEmoji.emojify(msg.message)}</Linkify>
                  </div>
                )}
              </Fragment>
            ))}
            <div ref={scrollAnchor}></div>
          </div>
        </div>
        <Formik
          initialValues={{
            message: "",
          }}
          onSubmit={(values, helpers) => {
            if (!values.message.trim()) return;
            socket
              .emit("user:sendMessage", roomId, values.message)
              .emit("user:greet", (msg: string) => console.log(msg));

            helpers.resetForm();
          }}
        >
          {({ setFieldValue, handleChange, handleSubmit, values }) => (
            <form
              className="flex items-start h-auto bg-gray-900"
              onSubmit={handleSubmit}
            >
              <textarea
                ref={textArea}
                name="message"
                placeholder="Type A Message Here"
                className="w-10/12 p-4 text-lg border resize-none overscroll-auto max-h-96"
                onChange={handleChange}
                value={values.message}
              />
              <div className="relative">
                {emojiModalOpened && (
                  <Picker
                    preload
                    disableAutoFocus
                    onEmojiClick={(_, emojiObj) => {
                      console.log(emojiObj);
                      setFieldValue(
                        "message",
                        `${values.message}${emojiObj.emoji}`
                      );
                    }}
                  />
                )}
                <button
                  className="w-16 py-2 bg-white text-orange"
                  type="button"
                  style={{ height: "90px" }}
                  onClick={() => setEmojiModalOpened(!emojiModalOpened)}
                >
                  😉
                </button>
              </div>
              <button
                className="flex-1 block px-3 py-2 text-white bg-blue-600 "
                type="submit"
                style={{ height: "90px" }}
              >
                Send
              </button>
            </form>
          )}
        </Formik>
      </MainLayout>
    </div>
  );
};

export default ChatPage;
