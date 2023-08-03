import { Button } from "primereact/button";
import RegisterForm from "../../components/Auth-Components/RegisterForm";
import InputGroup from "../../components/InputGroup";
import { useForm } from "../../hooks/useForm";
import {
  plainData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";
import { SignUp } from "../../services/auth.service";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function Component() {
  const navigate = useNavigate();

  const {
    email,
    id,
    lastname,
    name,
    secondname,
    secondlastname,
    password,
    phone,
    confirmPassword,
    onChange,
  } = useForm<plainData>({
    name: "",
    lastname: "",
    secondname: "",
    secondlastname: "",
    id: 0,
    phone: 0,
    email: "",
    password: "",
    confirmPassword: "",
  });

  function createUser() {
    const userTransformedData: userSignUpData = {
      id: id.toString(),
      name,
      email,
      password,
      details: {
        lastname,
        secondname,
        secondlastname,
        phone: phone.toString(),
      },
    };

    SignUp(userTransformedData)
      .then((data) => {
        console.log(data);
        navigate("/");
        return data;
      })
      .catch((axiosError: AxiosError) => {
        // const axiosError = error as AxiosError;
        alert(axiosError.response?.data);
        console.error(axiosError.response?.data);
      });

    // try {
    //   const data = await SignUp(userTransformedData);
    // } catch (error) {
    //   const axiosError = error as AxiosError;
    //   alert(axiosError.response?.data);
    //   console.error(axiosError.response?.data);
    // }
  }
  return (
    <section className="flex justify-center">
      <RegisterForm title="Sign Up">
        {/* first name */}
        <InputGroup
          inputType="text"
          label="Name"
          name="name"
          placeholder="Michael"
          value={name}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof plainData)
          }
        />
        {/* second name */}
        <InputGroup
          inputType="text"
          label="Second Name"
          name="secondname"
          placeholder="Sebastián"
          value={secondname}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof plainData)
          }
        />
        {/* last name */}
        <InputGroup
          inputType="text"
          label="Lastname"
          name="lastname"
          placeholder="Ortiz"
          value={lastname}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof plainData)
          }
        />
        {/* second lastname */}
        <InputGroup
          inputType="text"
          label="Second Lastname"
          name="secondlastname"
          placeholder="Jarrin"
          value={secondlastname}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof plainData)
          }
        />
        {/* id number */}
        <InputGroup
          inputType="text"
          label="Id Number"
          name="id"
          placeholder="1754253142"
          keyfilter="number"
          value={id}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof plainData)
          }
        />
        {/* Phone */}
        <InputGroup
          inputType="text"
          label="Phone"
          name="phone"
          placeholder="0992881929"
          keyfilter="number"
          value={phone}
          onChange={(e) =>
            onChange(Number(e.target.value), e.target.id as keyof plainData)
          }
        />
        {/* Email */}
        <InputGroup
          inputType="text"
          label="Email"
          name="email"
          placeholder="example@exp.com"
          value={email}
          keyfilter="email"
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof plainData)
          }
        />
        {/* password */}
        <InputGroup
          inputType="password"
          label="Password"
          name="password"
          placeholder="***********"
          value={password}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof plainData)
          }
        />
        {/* confirm password */}
        <InputGroup
          inputType="password"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="***********"
          value={confirmPassword}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof plainData)
          }
        />
        {/* Submit */}
        <div className="my-3">
          <Button label="Sign Up" className="w-full" onClick={createUser} />
        </div>
      </RegisterForm>
    </section>
  );
}
