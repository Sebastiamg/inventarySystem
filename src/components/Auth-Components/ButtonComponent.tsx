import {
  LoginResponseData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";

interface ButtonComponentProps {
  title: string;
  onclickButton?: () => Promise<userSignUpData | LoginResponseData | undefined> | any;
}

export const ButtonComponent = ({
  title,
  onclickButton,
}: ButtonComponentProps) => {
  return (
    <input
      className="w-full font-bold text-xl rounded-md border-2 border-slate-700 bg-slate-600 hover:bg-slate-700 transition-all text-zinc-200 mt-2 p-1"
      type="submit"
      value={title}
      onClick={onclickButton}
    />
  );
};