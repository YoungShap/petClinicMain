// EditForm.tsx
import { IPatient } from "@/lib/interfaces";
import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const EditForm = (props: { handleClose: () => void, patientId?: string }) => {
    const [formData, setFormData] = useState<IPatient>({
        name: "",
        phone: "",
        petName: "",
        petAge: "",
        petType: "",
    });

    useEffect(() => {
        if (
            !props.patientId
        ) return
        const fetchPatientById = async () => {
            try {
                const response = await fetch(`/api/patients?id=${props.patientId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch patient data');
                }
                const data = await response.json();
                setFormData(data.patient);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };
        fetchPatientById();
    }, [props.patientId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const newObj: any = formData
            delete newObj._id
            const response = await fetch(`/api/patients?id=${props.patientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObj),
            });

            if (response.ok) {
                console.log('Patient data updated successfully!');
                props.handleClose();
            } else {
                console.error('Failed to update patient data:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating patient data:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form className="crud-form"
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px",
                width:"500px",
            }}
        >
            <h1 className="form-h1 text-primary font-bold text-2xl p-8">Edit Patient</h1>
            <TextField sx={{ width: "100%", marginBottom: '10px' }}
                label="Name"
                variant="filled"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <TextField sx={{ width: "100%", marginBottom: '10px' }}
                label="Phone"
                variant="filled"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />
            <TextField sx={{ width: "100%", marginBottom: '10px' }}
                label="Pet Name"
                variant="filled"
                required
                name="petName"
                value={formData.petName}
                onChange={handleChange}
            />
            <TextField sx={{ width: "100%", marginBottom: '10px' }}
                label="Pet Age"
                type="number"
                variant="filled"
                required
                name="petAge"
                value={formData.petAge}
                onChange={handleChange}
            />
            <TextField sx={{ width: "100%", marginBottom: '10px' }}
                label="Pet Type"
                type="text"
                variant="filled"
                required
                name="petType"
                value={formData.petType}
                onChange={handleChange}
            />
            <div>
                <Button sx={{}} onClick={() => props.handleClose()}>
                    Close
                </Button>
                <Button
                    color="primary"
                    type="submit"
                    sx={{}}
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default EditForm;
