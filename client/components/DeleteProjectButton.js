import { useMutation, useQueryClient } from 'react-query';

export default function DeleteProjectButton({ project }) {
  const client = useQueryClient();

  const deleteProject = async (id) => {
    if(localStorage.getItem("token")){
      try{
        const token = localStorage.getItem("token");
        const response = await fetch('/api/delete-project-by-id', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        return data;
      } catch(err){
        console.log(err);
      }
    } else {
      console.log("No token found");
    }
  }

  const deleteProjectMutation = useMutation(deleteProject, {
    onSuccess: () => {
      // refetch the projects query after a successful mutation
      client.invalidateQueries(["allProjects"]);
    }
  });

  const handleDelete = async() => {
    await deleteProjectMutation.mutate(project._id)
  }

  return (
    <div onClick={handleDelete} className='flex justify-center items-center bg-blue-800 absolute top-0 right-0 rounded-md h-10 w-10 transform hover:scale-105 cursor-pointer'>
      <p className='text-white'>X</p>
    </div>
  );
}
