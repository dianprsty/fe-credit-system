import { useState } from "react";

/* eslint-disable react/prop-types */
const LoanStatusPill = (props) => {
  const [statusId] = useState(props.statusId);
  const [bg, setBg] = useState("bg-primary");

  useState(() => {
    switch (statusId) {
      case 1:
        setBg("bg-warning");
        break;
      case 2:
        setBg("bg-error");
        break;
      case 3:
        setBg("bg-primary");
        break;
      case 4:
        setBg("bg-secondary");
        break;
      case 5:
        setBg("bg-accent");
        break;
      case 6:
        setBg("bg-success");
        break;

      default:
        break;
    }
  }, []);
  return (
    <>
      <div className={`p-2 text-center text-white rounded-full ${bg}`}>
        {props.status}
      </div>
    </>
  );
};

export default LoanStatusPill;
