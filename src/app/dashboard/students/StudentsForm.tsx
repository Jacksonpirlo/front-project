import React, { useState, useEffect } from "react";

interface Student {
  id?: number;
  name: string;
  email: string;
  course: string;
}

interface Props {
  student: Student | null;
  onSave: (student: Student) => void;
  onClose: () => void;
}

export default function StudentsForm({ student, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<Student>({
    name: "",
    email: "",
    course: "",
  });

  useEffect(() => {
    if (student) setFormData(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="students-modal">
      <div className="students-modal-content">
        <h2>{student ? "Edit Student" : "Add Student"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="students-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
