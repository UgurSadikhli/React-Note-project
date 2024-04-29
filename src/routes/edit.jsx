import { Form, useLoaderData, redirect, useNavigate, } from "react-router-dom";
import { updateTask } from "../tasks";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateTask(params.taskId, updates);
  return redirect(`/tasks/${params.taskId}`);
}


export default function EditTask() {
  const { task } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Form method="post" id="task-form">
      <p>
        <span className="TaskNamecss">Task Name</span>
        <input
          placeholder="Enter..."
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={task.first}
        />
      </p>
      <label>
        <span className="TaskNamecss">Notes</span>
        <textarea
          name="notes"
          defaultValue={task.notes}
          rows={6}
        />
      </label>
      <p>
        <button className="Save_button" type="submit">Save</button >
        <button
        className="Cancel_button"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}