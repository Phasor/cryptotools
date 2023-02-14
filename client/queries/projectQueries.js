import { useQuery } from "react-query";

// const { dbConnect, MONGODB_URI } = require('../utils/dbConnect');

// async function getActiveProjects() {
//   return axios
//     .get(`${BASE_API_URL}/api/get-active-projects`)
//     .then((res) => res.data)
//     .catch((err) => {
//       if (err.response) {
//         return Promise.reject(err.response.data);
//       } else {
//         return Promise.reject(new Error(err));
//       }
//     });
// }

export async function getActiveProjects() {
  const response = await fetch(`${process.env.BASE_API_URL}/api/get-active-projects`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}



async function getAllProjects() {
  await dbConnect();
  return axios
    .get("/api/get-all-projects")
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        return Promise.reject(err.response.data);
      } else {
        return Promise.reject(new Error("Something went wrong"));
      }
    });
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

// function getProjectByName(name) {
//   return axios
//     .get(`/api/get-project-by-name?name=${name}`)
//     .then((res) => res.data)
//     .catch((err) => {
//       if (err.response && err.response.status === 404) {
//         // project not found
//         // need to add spaces between words e.g. "DuneAnalytics" => "Dune Analytics"
//         const updatedName = name.split(/(?=[A-Z])/).join(" ");
//         console.log("name updated to ", updatedName);
//         return axios
//           .get(`/api/get-project-by-name?name=${updatedName}`)
//           .then((res) => res.data)
//           .catch((err) => {
//             if (err.response) {
//               return Promise.reject(err.response.data);
//             } else {
//               return Promise.reject(new Error("Something went wrong"));
//             }
//           });
//       } else {
//         return Promise.reject(err.response.data);
//       }
//     });
// }

async function getProjectByName(name) {
  try {
    const res = await fetch(`${process.env.BASE_API_URL}/api/get-project-by-name?name=${name}`);

    if (!res.ok) {
      if (res.status === 404) {
        // project not found
        // need to add spaces between words e.g. "DuneAnalytics" => "Dune Analytics"
        const updatedName = name.split(/(?=[A-Z])/).join(" ");
        console.log("name updated to ", updatedName);

        const updatedRes = await fetch(`${process.env.BASE_API_URL}/api/get-project-by-name?name=${updatedName}`);

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
  getAllProjects,
  getProjectById,
  editProject,
  getProjectByName,
};
