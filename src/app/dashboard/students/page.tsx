"use client";

import React, { useEffect, useState } from "react";
import StudentsTable from "./StudentsTable";
import StudentsForm from "./StudentsForm";
import "./students.css";

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Obtener estudiantes
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Crear o actualizar
  const handleSave = async (student: Partial<Student>) => {
    const method = student.id ? "PUT" : "POST";
    const url = student.id
      ? `${API_URL}/api/students/${student.id}`
      : `${API_URL}/api/students`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(student),
      });

      if (res.ok) {
        await fetchStudents();
        setIsModalOpen(false);
        setSelectedStudent(null);
      }
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  // Eliminar estudiante
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/api/students/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="students-container">
      <h1 className="students-title">Students Management</h1>

      <button
        className="students-btn"
        onClick={() => {
          setSelectedStudent(null);
          setIsModalOpen(true);
        }}
      >
        + Add Student
      </button>

      <StudentsTable
        students={students}
        onEdit={(student) => {
          setSelectedStudent(student);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <StudentsForm
          student={selectedStudent}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
