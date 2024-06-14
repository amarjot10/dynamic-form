import React, { useState } from "react";
import "./MyForm.css";

const MyForm = () => {
  const initialFormData = { name: "", email: "", message: "" };

  const [forms, setForms] = useState([
    { id: Date.now(), formData: initialFormData },
  ]);
  const [submissions, setSubmissions] = useState([]);
  const [editMode, setEditMode] = useState(null);

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setForms(
      forms.map((form) =>
        form.id === id
          ? { ...form, formData: { ...form.formData, [name]: value } }
          : form
      )
    );
  };

  const handleSubmit = (id, e) => {
    e.preventDefault();
    const form = forms.find((form) => form.id === id);
    setSubmissions([...submissions, form.formData]);
    setForms(forms.filter((form) => form.id !== id));
  };

  const addAnotherForm = () => {
    setForms([...forms, { id: Date.now(), formData: initialFormData }]);
  };

  const handleEdit = (index) => {
    setEditMode(index);
    const submissionToEdit = submissions[index];
    setForms([...forms, { id: Date.now(), formData: submissionToEdit }]);
  };

  const handleUpdate = (id, index, e) => {
    e.preventDefault();
    const updatedSubmission = forms.find((form) => form.id === id).formData;
    const updatedSubmissions = submissions.map((submission, i) =>
      i === index ? updatedSubmission : submission
    );
    setSubmissions(updatedSubmissions);
    setForms(forms.filter((form) => form.id !== id));
    setEditMode(null);
  };

  return (
    <div>
      {forms.map((form) => (
        <form
          key={form.id}
          onSubmit={(e) =>
            editMode !== null
              ? handleUpdate(form.id, editMode, e)
              : handleSubmit(form.id, e)
          }
          className="form-card"
        >
          <div>
            <label htmlFor={`name-${form.id}`}>Name:</label>
            <input
              type="text"
              id={`name-${form.id}`}
              name="name"
              value={form.formData.name}
              onChange={(e) => handleChange(form.id, e)}
            />
          </div>
          <div>
            <label htmlFor={`email-${form.id}`}>Email:</label>
            <input
              type="email"
              id={`email-${form.id}`}
              name="email"
              value={form.formData.email}
              onChange={(e) => handleChange(form.id, e)}
            />
          </div>
          <div>
            <label htmlFor={`message-${form.id}`}>Message:</label>
            <textarea
              id={`message-${form.id}`}
              name="message"
              value={form.formData.message}
              onChange={(e) => handleChange(form.id, e)}
            />
          </div>
          <button type="submit">
            {editMode !== null ? "Update" : "Submit"}
          </button>
        </form>
      ))}

      <button onClick={addAnotherForm} className="add-another-form-button">
        Add Another Form
      </button>

      <div className="submissions-container">
        {submissions.map((submission, index) => (
          <div key={index} className="card">
            <h3>{submission.name || "No Name Provided"}</h3>
            <p>
              <strong>Email:</strong> {submission.email || "No Email Provided"}
            </p>
            <p>
              <strong>Message:</strong>{" "}
              {submission.message || "No Message Provided"}
            </p>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyForm;
