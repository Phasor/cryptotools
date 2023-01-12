import { TrashIcon } from "@heroicons/react/24/solid";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";

export default function DeleteProjectButton({ project }) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    onCompleted: () => {
      console.log("Project deleted");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  });

  return (
    <div className="">
      <button className="" onClick={deleteProject}>
        <TrashIcon title="Delete Project" className="h-5 w-5 transform hover:scale-110 text-black" />
      </button>
    </div>
  );
}
