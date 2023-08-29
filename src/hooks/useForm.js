import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
export default function useForm() {
  const [checked, setChecked] = React.useState(false);
  const [name, setName] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [editMode, setEditMode] = useState(false);
  const [data, setDate] = useState(null);
  const [options, setOptions] = React.useState(null);
  const [formDataLoaded, setFormDataLoaded] = useState(false);
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);
      setDate(formData);
      setName(formData.name);
      setSelectedValue(formData.selectedValue);
      setChecked(formData.checked);

      setEditMode(true); // Switch to edit mode when data is loaded
    }
    setFormDataLoaded(true);
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const sectorsDoc = await getDocs(collection(db, "sectors"));
        sectorsDoc.forEach((doc) => {
          const data = doc.data();
          // console.log(`Document ID: ${doc.id}`);
          // console.log("Options:", data.options); // Access the "options" field of the document's data
          setOptions(data.options);
        });
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the form data to localStorage
    const formData = {
      name: name,
      sector: selectedValue,
      agreed: checked,
    };

    localStorage.setItem("formData", JSON.stringify(formData));
    setEditMode(true);
    console.log("Form data saved to localStorage:", formData);
  };

  const changeEdit = () => {
    console.log("helo");
    setEditMode(false);
  };

  const handleDelete = () => {
    localStorage.removeItem("formData");
    setName("");
    setSelectedValue("");
    setChecked(false);
    setEditMode(false);
    console.log("Form data deleted from localStorage");
  };

  return {
    checked,
    name,
    selectedValue,
    editMode,
    data,
    options,
    formDataLoaded,
    handleChange,
    handleSelectChange,
    handleSubmit,
    changeEdit,
    handleDelete,
    setName,
  };
}
