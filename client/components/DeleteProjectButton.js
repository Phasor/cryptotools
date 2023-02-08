import { useMutation, useQueryClient } from 'react-query';
import Router from 'next/router';

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
      // redirect to admin page
      Router.push('/admin');
    }
  });

  const handleDelete = async() => {
     deleteProjectMutation.mutate(project._id)
  }

  return (
    <div onClick={handleDelete} className='absolute top-0 right-0 bg-blue-800 flex justify-center items-center rounded-md h-10 w-10'>
      <p className='text-white'>X</p>
    </div>
  );
}
