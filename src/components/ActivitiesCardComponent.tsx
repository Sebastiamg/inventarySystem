import { Link } from "react-router-dom";
import { Card } from "primereact/card";

interface ActivitiesCardComponentProps {
  title: string;
  icon: JSX.Element;
  navigateTo: string;
}

export default function ActivitiesCardComponent({
  icon,
  title,
  navigateTo,
}: ActivitiesCardComponentProps) {
  const cardHeader = (
    <div className="rounded-t-md w-full h-72 flex items-center justify-center">
      {icon}
    </div>
  );

  return (
    <li className="w-3/12 h-3/5 flex flex-col justify-between mx-2 rounded-lg hover:scale-[102%] transition-all">
      <Link to={navigateTo} className="w-full h-full">
        <Card header={cardHeader} className="text-center w-full h-full">
          <span className="font-bold text-xl">{title}</span>
        </Card>
      </Link>
    </li>
  );
}
