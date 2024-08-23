import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios'; // Assuming you are using axios for data fetching

const CreateTask = () => {
  const [users, setUsers] = useState<{ _id: string; email: string }[]>([]);
  
  useEffect(() => {
    // Fetch user data from the backend
    // axios.get('/api/users') // Replace with your actual endpoint
    //   .then(response => {
    //     setUsers(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user data:', error);
    //   });
  }, []);

  const initialValues = {
    title: '',
    description: '',
    assignedTo: [{ userId: '' }],
    createdBy: '',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '',
    progress: { percentage: 0 },
    activities: [{ type: '', comment: '' }],
    subtasks: [{ title: '', status: 'To Do', createdBy: '', assignedTo: [], comments: [] }],
    comments: [{ userId: '', comment: '' }],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    assignedTo: Yup.array().of(
      Yup.object({
        userId: Yup.string().required('User ID is required'),
      })
    ),
    createdBy: Yup.string().required('Created By is required'),
    status: Yup.string().oneOf(['To Do', 'In Progress', 'Completed']).required('Status is required'),
    priority: Yup.string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
    dueDate: Yup.date(),
    progress: Yup.object({
      percentage: Yup.number().min(0).max(100),
    }),
    activities: Yup.array().of(
      Yup.object({
        type: Yup.string().oneOf(['Bug', 'Feature', 'Comment', 'In Progress', 'Completed']).required('Activity type is required'),
        comment: Yup.string(),
      })
    ),
    subtasks: Yup.array().of(
      Yup.object({
        title: Yup.string().required('Subtask title is required'),
        status: Yup.string().oneOf(['To Do', 'In Progress', 'Completed']).required('Subtask status is required'),
        createdBy: Yup.string().required('Subtask creator is required'),
        assignedTo: Yup.array().of(
          Yup.object({
            userId: Yup.string().required('Assigned user ID is required'),
          })
        ),
        comments: Yup.array().of(
          Yup.object({
            userId: Yup.string().required('Comment user ID is required'),
            comment: Yup.string().required('Comment is required'),
          })
        ),
      })
    ),
    comments: Yup.array().of(
      Yup.object({
        userId: Yup.string().required('Comment user ID is required'),
        comment: Yup.string().required('Comment is required'),
      })
    ),
  });

  const handleSubmit = (values: any) => {
    // Handle form submission
    console.log('Form Values:', values);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-6">
            <div className="flex flex-col space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.title && touched.title ? <div className="text-red-500 text-sm">{errors.title}</div> : null}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  rows="4"
                />
              </div>

              {/* Assigned To */}
              <FieldArray name="assignedTo">
                {({ push, remove }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    {values.assignedTo.map((_, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <Field
                          as="select"
                          name={`assignedTo.${index}.userId`}
                          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        >
                          <option value="">Select User</option>
                          {users.map(user => (
                            <option key={user._id} value={user._id}>{user.email}</option>
                          ))}
                        </Field>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ userId: '' })}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Add User
                    </button>
                  </div>
                )}
              </FieldArray>

              {/* Created By */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="createdBy">Created By</label>
                <Field
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.createdBy && touched.createdBy ? <div className="text-red-500 text-sm">{errors.createdBy}</div> : null}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status</label>
                <Field as="select" id="status" name="status" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Field>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="priority">Priority</label>
                <Field as="select" id="priority" name="priority" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Field>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="dueDate">Due Date</label>
                <Field
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

          
              <FieldArray name="activities">
                {({ push, remove }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Activities</label>
                    {values.activities.map((_, index) => (
                      <div key={index} className="flex flex-col space-y-2 mb-2">
                        <Field as="select" name={`activities.${index}.type`} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                          <option value="">Select Activity Type</option>
                          <option value="Bug">Bug</option>
                          <option value="Feature">Feature</option>
                          <option value="Comment">Comment</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </Field>
                        <Field
                          type="text"
                          name={`activities.${index}.comment`}
                          placeholder="Comment"
                          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ type: '', comment: '' })}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Add Activity
                    </button>
                  </div>
                )}
              </FieldArray>

              {/* Subtasks */}
              {/* <FieldArray name="subtasks">
                {({ push, remove }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subtasks</label>
                    {values.subtasks.map((_, index) => (
                      <div key={index} className="flex flex-col space-y-2 mb-2">
                        <Field
                          type="text"
                          name={`subtasks.${index}.title`}
                          placeholder="Subtask Title"
                          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        <Field as="select" name={`subtasks.${index}.status`} className="block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </Field>
                        <Field
                          type="text"
                          name={`subtasks.${index}.createdBy`}
                          placeholder="Subtask Creator"
                          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        <FieldArray name={`subtasks.${index}.assignedTo`}>
                          {({ push, remove }) => (
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                              {values.subtasks[index].assignedTo.map((_, subIndex) => (
                                <div key={subIndex} className="flex items-center space-x-2 mb-2">
                                  <Field
                                    as="select"
                                    name={`subtasks.${index}.assignedTo.${subIndex}.userId`}
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                  >
                                    <option value="">Select User</option>
                                    {users.map(user => (
                                      <option key={user._id} value={user._id}>{user.email}</option>
                                    ))}
                                  </Field>
                                  <button
                                    type="button"
                                    onClick={() => remove(subIndex)}
                                    className="bg-red-600 text-white px-3 py-1 rounded-md"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => push({ userId: '' })}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                              >
                                Add User
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        <FieldArray name={`subtasks.${index}.comments`}>
                          {({ push, remove }) => (
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Comments</label>
                              {values.subtasks[index].comments.map((_, subIndex) => (
                                <div key={subIndex} className="flex flex-col space-y-2 mb-2">
                                  <Field
                                    type="text"
                                    name={`subtasks.${index}.comments.${subIndex}.userId`}
                                    placeholder="Comment User ID"
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                  />
                                  <Field
                                    type="text"
                                    name={`subtasks.${index}.comments.${subIndex}.comment`}
                                    placeholder="Comment"
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(subIndex)}
                                    className="bg-red-600 text-white px-3 py-1 rounded-md"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => push({ userId: '', comment: '' })}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                              >
                                Add Comment
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-600 text-white px-3 py-2 rounded-md mt-2"
                        >
                          Remove Subtask
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({
                        title: '',
                        status: 'To Do',
                        createdBy: '',
                        assignedTo: [],
                        comments: [],
                      })}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Add Subtask
                    </button>
                  </div>
                )}
              </FieldArray> */}

              {/* Comments */}
              <FieldArray name="comments">
                {({ push, remove }) => (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comments</label>
                    {values.comments.map((_, index) => (
                      <div key={index} className="flex flex-col space-y-2 mb-2">
                        <Field
                          type="text"
                          name={`comments.${index}.userId`}
                          placeholder="Comment User ID"
                          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        <Field
                          type="text"
                          name={`comments.${index}.comment`}
                          placeholder="Comment"
                          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ userId: '', comment: '' })}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Add Comment
                    </button>
                  </div>
                )}
              </FieldArray>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => console.log('Form Reset')}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTask;
