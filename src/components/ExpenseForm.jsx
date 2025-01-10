import React, { useEffect, useState } from 'react'
import TextField from './TextField';
import { MODE } from '../constants'
import SelectOption from './SelectOption';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ExpenseForm({ setExpenses, formState, setFormState }) {
    const [expense, setExpense] = useLocalStorage("expense", {
        title: "",
        amount: "",
        category: ""
    });

    useEffect(() => {
        if (formState.status === MODE.EDIT && formState.editingRow) {
            setExpense({ ...formState.editingRow });
        }
    }, [formState]);

    const [errors, setErrors] = useState({});

    const validationConfig = {
        title: [
            { required: true, message: "Please enter title" },
            { minLength: 3, message: "Title should be at least 3 character long" }
        ],
        category: [
            { required: true, message: "Please select a category" }
        ],
        amount: [
            { required: true, message: "Please enter an amount" }
        ]
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm(expense)) {
            if (formState.status === MODE.ADD) {
                setExpenses((prevState) => [
                    ...prevState, {
                        ...expense, id: crypto.randomUUID()
                    }
                ]);
            } else if (formState.status === MODE.EDIT) {
                setExpenses((prevState) => prevState.map((prevExpense) => {
                    if (prevExpense.id === formState.editingRow.id) {
                        return expense;
                    }
                    return prevExpense;
                }));
 
                setFormState({
                    status: MODE.ADD,
                    editingRow: null
                })
            }

            setExpense({
                title: "",
                amount: "",
                category: ""
            })
        }
    }

    const validateForm = (formData) => {
        const formErrors = {};

        for (const [field, value] of Object.entries(formData)) {
            if (!validationConfig[field]) continue;

            for (const rule of validationConfig[field]) {
                if (rule.required && !value) {
                    formErrors[field] = rule.message;
                    break;
                } else if (rule.minLength && value.length < rule.minLength) {
                    formErrors[field] = rule.message;
                    break;
                }
            }
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setExpense((prevData) => {
            return { ...prevData, [name]: value };
        });

        setErrors({});
    }

    return (
        <form className="space-y-6 md:w-1/2" onSubmit={handleSubmit}>
            {["title", "amount"].map(field => (
                <TextField
                    type={(field === "title") ? "text" : "number"}
                    key={field}
                    name={field}
                    error={errors[field]}
                    value={expense[field]}
                    onChange={handleChange}
                />
            ))}
            <SelectOption
                name={"category"}
                onChange={handleChange}
                error={errors.category}
                value={expense.category.toLowerCase()}
                options={["select category", "grocery", "clothes", "bills", "education", "medicine"]}
            />
            <button className="w-full border-2 border-slate-400 bg-slate-200 py-1 text-center font-semibold hover:bg-slate-300 active:bg-slate-100">{
                (formState.status === MODE.ADD) ? "Add" : "Save"
            }</button>
        </form >
    )
}