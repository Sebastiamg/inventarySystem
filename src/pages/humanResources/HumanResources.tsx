/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { GetUsers } from "../../services/user.service";
import {
  UserPlainData,
  defaultUserData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { HumanResourcesLoader } from "../../interfaces/humanResLoader.interface";
import { Dialog } from "primereact/dialog";
import { useForm } from "../../hooks/useForm";
import InputGroup from "../../components/InputGroup";
import { createUser } from "../../services/humanResources.service";
import {
  Hsbuser,
  hsbUserPlainData,
  humanResDefData,
} from "../../interfaces/humanResources.interface";

export default function HumanResources() {
  const [users, setUsers] = useState<userSignUpData[]>(
    (useLoaderData() as HumanResourcesLoader).users
  );

  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const { form, onChange } = useForm<UserPlainData>(defaultUserData);
  const {
    form: updateForm,
    onChange: upOnChange,
    setState: upSetState,
  } = useForm<hsbUserPlainData>(humanResDefData);

  function updateModal(e: DataTableRowClickEvent) {
    console.log(e.data);
    const { details, ...hsbData } = e.data as Hsbuser;
    upSetState({
      ...hsbData,
      ...details,
      name: hsbData.name.split(" ")[0],
    } as hsbUserPlainData);
    setEdit(true);
  }

  const AddUser = () => {
    const userTransformedData: userSignUpData = {
      id: form.id.toString(),
      name: form.name,
      email: form.email,
      password: form.password,
      details: {
        lastname: form.lastname,
        secondname: form.secondname,
        secondlastname: form.secondlastname,
        phone: form.phone.toString(),
      },
    };
    createUser(userTransformedData)
      .then((data) => {
        console.log(data);
        setModal(false);
        console.log(users);
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(async () => await setNewUser());
  };

  const setNewUser = async () => {
    const newUsers = await GetUsers();
    console.log(newUsers);
    setUsers((currentUsers) => ({ ...currentUsers, ...newUsers }));
    setModal(false);
  };

  return (
    <div>
      <div className="m-5">
        <Button label="Add" onClick={() => setModal(true)} />
        <DataTable
          className="shadow-md"
          stripedRows
          value={
            users
              ? users.map(({ name, ...userData }: userSignUpData) => {
                  const userFullName = name.concat(
                    " ",
                    userData.details.secondname,
                    " ",
                    userData.details.lastname,
                    " ",
                    userData.details.secondlastname
                  );

                  return { ...userData, name: userFullName };
                })
              : []
          }
          emptyMessage={"No Users found"}
          selectionMode="single"
          title="Human Resources"
          onRowDoubleClick={(e) => updateModal(e)}
          // paginator
          rows={25}
          rowsPerPageOptions={[25, 50, 75, 100]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column header="Idetification" field="id" style={{ width: "15%" }} />
          <Column header="User Name" field="name" style={{ width: "20%" }} />
          <Column header="Email" field="email" style={{ width: "20%" }} />
          <Column header="Active" field="active" style={{ width: "20%" }} />
        </DataTable>
      </div>
      {/* modal to update user */}
      <Dialog
        visible={edit}
        onHide={() => setEdit(false)}
        header="Edit User"
        className="w-2/5"
      >
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            label="Identification"
            name="id"
            placeholder="1728548544"
            value={updateForm.id}
            onChange={(e) =>
              upOnChange(e.target.value, e.target.id as keyof hsbUserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            label="Phone"
            name="phone"
            placeholder="0979301325"
            value={updateForm.phone}
            onChange={(e) =>
              upOnChange(e.target.value, e.target.id as keyof hsbUserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            label="First Name"
            name="name"
            placeholder="David"
            value={updateForm.name}
            onChange={(e) =>
              upOnChange(e.target.value, e.target.id as keyof hsbUserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            label="Second Name"
            name="secondname"
            placeholder="Mateo"
            value={updateForm.secondname}
            onChange={(e) =>
              upOnChange(e.target.value, e.target.id as keyof hsbUserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            label="Surname"
            name="lastname"
            placeholder="Castro"
            value={updateForm.lastname}
            onChange={(e) =>
              upOnChange(e.target.value, e.target.id as keyof hsbUserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            label="Second Surname"
            name="secondlastname"
            placeholder="Castro"
            value={updateForm.secondlastname}
            onChange={(e) =>
              upOnChange(e.target.value, e.target.id as keyof hsbUserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex">
          <InputGroup
            inputType="text"
            keyfilter={"email"}
            label="Email"
            name="email"
            placeholder="example@exam.com"
            value={updateForm.email}
            onChange={(e) =>
              upOnChange(e.target.value, e.target.id as keyof hsbUserPlainData)
            }
            className="p-2 w-4/6"
          />
          {/* falta check box aqui */}
        </div>
      </Dialog>
      {/* Modal to create user */}
      <Dialog
        visible={modal}
        onHide={() => setModal(false)}
        header="Create User"
        className="w-2/5 flex"
      >
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            label="Identification"
            name="id"
            placeholder="1728548544"
            value={form.id}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            label="Phone"
            name="phone"
            placeholder="0979301325"
            value={form.phone}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            label="First Name"
            name="name"
            placeholder="David"
            value={form.name}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            label="Second Name"
            name="secondname"
            placeholder="Mateo"
            value={form.secondname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            label="Surname"
            name="lastname"
            placeholder="Castro"
            value={form.lastname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            label="Second Surname"
            name="secondlastname"
            placeholder="Castro"
            value={form.secondlastname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <InputGroup
          inputType="text"
          keyfilter={"email"}
          label="Email"
          name="email"
          placeholder="example@exam.com"
          value={form.email}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
          className="p-2"
        />
        <InputGroup
          inputType="text"
          label="Password"
          name="password"
          placeholder="*******"
          value={form.password}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
          className="p-2"
        />
        <InputGroup
          inputType="text"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="*******"
          value={form.confirmPassword}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
          className="p-2"
        />
        <div className="w-full p-2 mt-2">
          <Button
            label="Create User"
            className="w-full p-2"
            onClick={AddUser}
          />
        </div>
      </Dialog>
    </div>
  );
}

export async function HumanResourcesLoader(): Promise<HumanResourcesLoader> {
  const users: userSignUpData[] = await GetUsers();

  return {
    users,
  };
}