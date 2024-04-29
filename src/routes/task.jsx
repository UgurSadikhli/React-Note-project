import { Form, useLoaderData, useFetcher, } from "react-router-dom";
import { getTask, updateTask } from "../tasks";

export async function loader({ params }) {
  const task = await getTask(params.taskId);
  return { task };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateTask(params.taskId, {
    favorite: formData.get("favorite") === "true",
  });
}



export default function Task() {
  const { task } = useLoaderData();

  return (
    <div id="task">
     
      <div>
        <h1>
          {task.first  ? (
            <>
              {task.first}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite task={task} />
        </h1>

        {task.notes && <p className="taskNotes">{task.notes}</p>}

        <div>
          <Form action="edit">
            <button className="Edit_button" type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button className="Delete_button" type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ task }) {
  const fetcher = useFetcher();
  let isFavorite = task.favorite;
  return (
    <fetcher.Form method="post">
      <button className="isFavorite_button"
        name="favorite"
        value={isFavorite ? "false" : "true"}
        aria-label={
            isFavorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {isFavorite ? "☑" : "☐"}
      </button>
      </fetcher.Form>
  );
}