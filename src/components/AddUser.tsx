import { useState } from "react";
import useNewUserForm from "../hooks/useAddUser";
import { User } from "../types";

// 1 forma:
// interface FormProps {
//   onNewUser: React.Dispatch<React.SetStateAction<User[]>>; // hacer hover sobre los errores
// }

// 2 forma: para no buscar el tipado de React.disp...
interface FormProps {
  onNewUser: (newUser: User) => void; // hacer hover sobre los errores
}

const AddUser = ({ onNewUser }: FormProps) => {
  // sin el useReducer
  // const [inputValues, setInputValues] = useState<FormState["inputValues"]>({
  //   name: "",
  //   lastName: "",
  //   nick: "",
  //   avatar: "",
  // });

  // useReducer:
  const [inputValues, dispatch] = useNewUserForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 1 forma:
    // onNewUser((users) => [...users, inputValues]);
    // 2 forma:
    onNewUser(inputValues);
    dispatch({ type: "Clear" });
  };

  // Consejo: hacer hover para saber el tipo de elemento y agregarlo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // sin useReducer:
    // setInputValues({
    //   ...inputValues,
    //   [e.target.name]: e.target.value,
    // });

    // useReducer:
    const { name, value } = e.target;
    dispatch({
      type: "Change_value",
      payload: {
        inputName: name,
        inputValue: value,
      },
    });
  };

  // const handleClear = () => {
  //   // setInputValues(INITIAL_STATE)
  // };

  return (
    <div className="p-4">
      <button>X</button>
      <form className="flex flex-col gap-1 mb-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={inputValues.name}
          onChange={handleChange}
          placeholder="Primer nombre"
        />
        <input
          type="text"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleChange}
          placeholder="Apellido"
        />
        <input
          type="text"
          name="nick"
          value={inputValues.nick}
          onChange={handleChange}
          placeholder="@usuario o email@.com"
        />
        <input
          name="avatar"
          value={inputValues.avatar}
          onChange={handleChange}
          placeholder="Ingresa el enlace de la imagen"
        />
        <button type="submit" className="w-full border p-2 rounded-md transition bg-sky-500 hover:bg-sky-700 text-white">Agregar</button>
      </form>
    </div>
  );
};

export default AddUser;
