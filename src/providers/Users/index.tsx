import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import api from "../../services/api";
// import { useAuth } from "../Auth";

interface Props {
  children: ReactNode;
}

interface UserData {
  email: string;
  password: string;
  username: string;
  type: string;
  id: number;
}

interface UsersProviderData {
  getUsers: () => void;
  delUsers: (id: number) => void;
  users: UserData[];
  setUsers: Dispatch<SetStateAction<UserData[]>>;
}

const UsersContext = createContext<UsersProviderData>({} as UsersProviderData);

export const UsersProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<UserData[]>([]);
  //   const { token } = useAuth();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwiaWF0IjoxNjMxNTY2NTY3LCJleHAiOjE2MzE1NzAxNjcsInN1YiI6IjEifQ.79s7fI1V8xNm2Y5fvvRXMN7ZthYz_Mg_e7XbZDVIg4g";

  const getUsers = () => {
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(`Não Foi!: ${err}`));
  };

  const delUsers = (userId: number) => {
    api
      .delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.log(err));
  };

  return (
    <UsersContext.Provider value={{ getUsers, delUsers, users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
