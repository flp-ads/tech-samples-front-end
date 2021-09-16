import { useContext } from "react";
import { createContext, ReactNode } from "react";
import { toast } from "react-toastify";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface Props {
  children: ReactNode;
}

interface FeedbackData {
  sucessFeedback: (message: string) => void;
  errorFeedback: (message: string) => void;
}

const UserFeedbackContext = createContext<FeedbackData>({} as FeedbackData);

export const UserFeedbackProvider = ({ children }: Props) => {
  const sucessFeedback = (message: string) => {
    toast(message, {
      icon: <AiOutlineCheckCircle size={36} />,
      style: {
        color: "#002887",
        fontWeight: "bold",
      },
    });
  };
  const errorFeedback = (message: string) => {
    toast.error(message);
  };
  return (
    <UserFeedbackContext.Provider value={{ sucessFeedback, errorFeedback }}>
      {children}
    </UserFeedbackContext.Provider>
  );
};

export const UseFeedback = () => useContext(UserFeedbackContext);
