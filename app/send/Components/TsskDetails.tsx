"use client";
import React, { useEffect, useState } from "react";
import Status from "../../Components/Status";

const TaskDetails: React.FC<any> = ({ data }) => {
  const [status, setStatus] = useState<any>();

  useEffect(() => {
    if (data) {
      const filtStat = data.done
        ? "bajarildi"
        : data.notDone
        ? "bajarilmagan"
        : data.inProgress
        ? "bajarilmoqda"
        : "";

      setStatus(filtStat);
    }
  }, [data]);
  return (
    <>
      {data && (
        <div className="w-full mx-auto p-4 text-xl ">
          <h2 className="text-5xl font-bold mb-6">Топшириқ тафсилотлари</h2>
          <p className="mb-4">
            <strong>{data.address}</strong>
          </p>
          <p className="mb-4">
            <strong>{data.batalon} </strong>
          </p>
          <p className="mb-4">
            <strong>{data.contractnumber} </strong>
          </p>
          <p className="mb-4">
            <strong>{data.clientname} </strong>
          </p>
          <p className="mb-4">
            <strong>{data.taskdate}</strong>
          </p>

          <p className="mb-4">
            <strong>{data.timemoney}</strong>
          </p>
          <p className="mb-4">
            <strong>{data.tasktime}</strong>
          </p>

          <p className="mb-4">
            <strong>{data.timelimit + " "}</strong>
          </p>
          <p className="mb-4">
            <strong>{data.workernumber}</strong>
          </p>
          <div className="mt-6">
            <Status status={status} />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskDetails;
