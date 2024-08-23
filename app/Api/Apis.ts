export const URL = "https://147.45.107.174:4000";

// Auth

export const loginAuth = async (username: any, password: any) => {
  const res = await fetch(URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.success) {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("id", data.data.id);
    }
  }

  return data;
};

export const UpdateAuth = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/auth/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ ...value }),
  });

  const data = await res.json();

  return data;
};

export const UpdateAuth2 = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/auth/update/batalyon/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ ...value }),
  });

  const data = await res.json();

  return data;
};
export const updateBatalyon = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/auth/update/batalyon/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ ...value }),
  });

  const data = await res.json();

  return data;
};

export const createAuth = async (
  JWT: any,
  username: any,
  password: any,
  status: any
) => {
  const res = await fetch(URL + "/auth/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ username, password, status }),
  });

  const data = await res.json();

  return data;
};

export const getAuth = async (JWT: any) => {
  const res = await fetch(URL + "/auth/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

// workers
export const getAllWorkers = async (JWT: any, date: any) => {
  const res = await fetch(URL + `/report/get/reports/by/date?date=${date}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getAllWorkers2 = async (JWT: any) => {
  const res = await fetch(URL + "/worker/for/push", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getWorkerById = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/worker/get/one/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getAllBatalyon = async (JWT: any) => {
  const res = await fetch(URL + "/worker/get/all/batalyon", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const createWorker = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/worker/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      workers: value,
    }),
  });

  const data = await res.json();

  return data;
};

export const searchWorker = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/worker/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      fio: value,
    }),
  });

  const data = await res.json();

  return data;
};

export const updateWorker = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/worker/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const deleteWorker = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/report/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const deleteUser = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/auth/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

// contract
export const createContract = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const filterContract = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/filter/by/date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const getAllContract = async (JWT: any, page: any, limet: any) => {
  const res = await fetch(URL + `/contract/get?page=${page}&limit=${limet}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getForBatalyon = async (JWT: any) => {
  const res = await fetch(URL + `/contract/get/all/batalyon`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const deleteContract = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/contract/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const paymentToContract = async (JWT: any, id: any) => {
  const res = await fetch(URL + `/contract/payment/contract/` + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const NotpaymentToContract = async (JWT: any, id: any) => {
  const res = await fetch(URL + `/contract/canel/payment/` + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getToPrint = async (JWT: any, id: any) => {
  const res = await fetch(URL + `/contract/to/print/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getWorkersForWatch = async (JWT: any, id: any, what: any) => {
  const res = await fetch(
    URL + `/contract/print/task/worker/${id}?${what}=true`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};
export const getContractById = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/contract/get/contract/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const updateContract = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/contract/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ ...value }),
  });

  const data = await res.json();

  return data;
};

export const updateContract2 = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/contract/update/info/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ ...value }),
  });

  const data = await res.json();

  return data;
};

//tasks
export const getAllTasks = async (JWT: any, page?: any, limit?: any) => {
  const res = await fetch(URL + `/task/get/tasks?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getByTask = async (JWT: any, id: any) => {
  const res = await fetch(URL + `/task/get/by/id/` + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getWorkersForTask = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/task/get/task/workers/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const filterTasks = async (JWT: any, status: any) => {
  const res = await fetch(URL + `/task/filter/by/status?${status}=true`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const searchTasks = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/task/filter/by/date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const giveTime = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/contract/giving/time/to/task/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ date: value }),
  });

  const data = await res.json();

  return data;
};
// BXM
export const getBXM = async (JWT: any) => {
  const res = await fetch(URL + "/bxm/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const UpdateBXM = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/bxm/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ ...value }),
  });

  const data = await res.json();

  return data;
};

// worker_tasks

export const pushWorkers = async (
  JWT: any,

  value: any
) => {
  const res = await fetch(URL + "/sms/send/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({
      clients: value,
    }),
  });

  const data = await res.json();

  return data;
};

export const getWorkerInfo = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/worker_task//tasks/of/worker/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const filterWorker = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/worker_task/filter/by/date/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

// resoult

export const createResult = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/result/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const filterOtchot = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/result/filter/by/date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const filterOtchot2 = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/special/filter/by/date", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const getComand = async (JWT: any, page: any, limit: any) => {
  const res = await fetch(
    URL + `/result/get/command?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};

export const getByIdComand = async (JWT: any, id: any, percent?: any) => {
  const res = await fetch(
    URL +
      `/result/get/battalion/workers/${id}?percent=${percent ? percent : 100}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};

//spesific Result

export const createResult2 = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/special/create/commands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const getComand2 = async (JWT: any, page: any, limit: any) => {
  const res = await fetch(
    URL + `/special/get/command?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};

export const getByIdComan2 = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/special/get/batalyon/and/contracts/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const exel1 = async (JWT: any, id: any, percent: any) => {
  const res = await fetch(
    URL + `/result/excel/create/${id}?percent=${percent}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JWT,
      },
    }
  );

  const data = await res.blob(); // Fayl blob formatida keladi

  return data;
};

export const excel2 = async (JWT: any) => {
  const res = await fetch(URL + "/worker_task/excel/create", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.blob();
  return data;
};
export const excel23 = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/special/get/data/to/excel/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.blob();
  return data;
};

export const getExcel = async (JWT: any) => {
  const res = await fetch(URL + "/worker_task/for/excel/create/page", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

// Acount Number
export const getAllAcount = async (JWT: any) => {
  const res = await fetch(URL + "/account/number/get/all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const deleteAcount = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/account/number/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const createAcount = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/account/number/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const updateAcount = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/account/number/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const getExcelWorker1 = async (JWT: any) => {
  const res = await fetch(URL + "/worker/excel/create", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.blob();
  return data;
};

export const getExcelWorker2 = async (JWT: any, id: any) => {
  const res = await fetch(
    URL + "/worker/excel/create?battalion=true&id=" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.blob();
  return data;
};
export const getExcelWorker3 = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/special/get/data/to/excel/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.blob();
  return data;
};

export const deleteData1 = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/result/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const deleteData2 = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/special/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getBatalyonUmumiy = async (JWT: any) => {
  const res = await fetch(URL + "/special/get/battalions", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getBatalyonUmumiyData = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/special/get/data/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const getInfo = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/task/get/info/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getBatalyonUmumiySearch = async (
  JWT: any,
  id: any,
  status: any
) => {
  const res = await fetch(
    URL + `/special/get/data/filter/by/status/${id}?${status}=true`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};
export const searchByDateUmumiy = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/special/get/data/filter/by/date/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const searchByDateUmumiy2 = async (
  JWT: any,
  id: any,
  value: any,
  status: any
) => {
  const res = await fetch(
    URL + `/special/get/data/filter/date/and/status/${id}?${status}=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JWT,
      },
      body: JSON.stringify(value),
    }
  );

  const data = await res.json();

  return data;
};

export const searchByClintName = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};

export const searchByNumber1 = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/search/by/number", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ contractNumber: value }),
  });

  const data = await res.json();

  return data;
};

export const searchByClintName1 = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/search/by/client/name", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ clientName: value }),
  });

  const data = await res.json();

  return data;
};

export const searchByAddress1 = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/search/by/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ address: value }),
  });

  const data = await res.json();

  return data;
};

export const getExcelContract3 = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/contract/create/excel/for/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  if (res.status === 200) {
    return res; // Status 200 bo'lsa, javob qaytariladi
  } else {
    throw new Error("Excel faylini yuklashda xatolik");
  }
};

//excutor
export const createShahar = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/executors/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const updateShahar = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/executors/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const deleteShahar = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/executors/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getAllShahar = async (JWT: any) => {
  const res = await fetch(URL + "/executors/get/all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

//leader

export const createBoshliq = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/leaders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const updateBoshliq = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/leaders/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const deleteBoshliq = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/leaders/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getAllBoshliq = async (JWT: any) => {
  const res = await fetch(URL + "/leaders/get/all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

//manzil
export const createManzil = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/region/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const updateManzil = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/region/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const deleteManzil = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/region/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getAllManzil = async (JWT: any) => {
  const res = await fetch(URL + "/region/get", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

//bank
export const createBank = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/banks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const updateBank = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/banks/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const deleteBank = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/banks/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getAllBank = async (JWT: any) => {
  const res = await fetch(URL + "/banks/get/all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
//mfo
export const createMfo = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/mfo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const updateMfo = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/mfo/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const deleteMfo = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/mfo/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getAllMfo = async (JWT: any) => {
  const res = await fetch(URL + "/mfo/get/all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

//str
export const createstr = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/str/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const updatestr = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/str/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const deletestr = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/str/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getAllstr = async (JWT: any) => {
  const res = await fetch(URL + "/str/get/all", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const deltePushWorker = async (JWT: any, id: any, task_id: any) => {
  const res = await fetch(
    URL + `/task/delete/worker/${id}?task_id=${task_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JWT,
      },
    }
  );

  const data = await res.json();

  return data;
};

//clien
export const createClient = async (JWT: any, id: any, value: any) => {
  const res = await fetch(URL + "/client/create/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ clients: value }),
  });

  const data = await res.json();

  return data;
};

export const getAllClients = async (
  JWT: any,
  id: any,
  page: any,
  limet: any
) => {
  const res = await fetch(
    URL + `/client/get/${id}?page=${page}&limit=${limet}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};
export const ForCheked = async (JWT: any) => {
  const res = await fetch(URL + `/client/for/checked`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const getClientsGetById = async (JWT: any, id: any) => {
  const res = await fetch(URL + `/client/get/element/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const updateClient = async (JWT: any, value: any, id: any) => {
  const res = await fetch(URL + "/client/update/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify(value),
  });

  const data = await res.json();

  return data;
};
export const deleteClient = async (JWT: any, id: any) => {
  const res = await fetch(URL + "/client/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const searchClient = async (JWT: any, value: any) => {
  const res = await fetch(URL + "/client/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JWT,
    },
    body: JSON.stringify({ username: value }),
  });

  const data = await res.json();

  return data;
};
export const getClientCheked = async (JWT: any) => {
  const res = await fetch(URL + `/client/for/checked`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
export const cleintExcel = async (JWT: any) => {
  const res = await fetch(URL + `/client/export/to/excel`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.blob();
  return data;
};

export const getDates = async (JWT: any) => {
  const res = await fetch(URL + `/report/get/all/dates`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + JWT,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
