import { useQuery } from "react-query";


export async function getActiveProjects() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-active-projects`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export async function getAllProjects() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-all-projects`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}


function getProjectById(id) {
  // console.log("id in function ", id);
  return axios
    .get(`/api/get-project-by-id?id=${id}`)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        return Promise.reject(err.response.data);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    });
}

export async function getProjectByName(name) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-project-by-name?name=${name}`);

    if (!res.ok) {
      if (res.status === 404) {
        // project not found
        // need to add spaces between words e.g. "DuneAnalytics" => "Dune Analytics"
        const updatedName = name.split(/(?=[A-Z])/).join(" ");
        console.log("name updated to ", updatedName);

        const updatedRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/get-project-by-name?name=${updatedName}`);

        if (!updatedRes.ok) {
          throw new Error("Something went wrong with finding the project by updated name");
        }
        return updatedRes.json();
      }
      throw new Error("Something went wrong finding the project by name");
    }

    return res.json();
  } catch (err) {
    throw new Error("Something went wrong, in catch block");
  }
}




function editProject({ formData, id }) {
  return axios
    .post(
      "/api/edit-project-by-id",
      { formData, id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        return Promise.reject(err.response.data);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    });
}

export {
  getProjectById,
  editProject,
};
