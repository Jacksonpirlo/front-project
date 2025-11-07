import React from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

interface Props {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export default function StudentsTable({ students, onEdit, onDelete }: Props) {
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.email}</td>
            <td>{s.course}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(s)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => onDelete(s.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
