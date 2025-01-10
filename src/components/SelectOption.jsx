import React from 'react'

export default function SelectOption({ name, value, onChange, options, error }) {
    return (
        <div>
            <label htmlFor={name} className="block text-lg font-semibold capitalize">{name}</label>
            <select id={name} name={name} value={value} onChange={onChange} className="w-full border-2 border-slate-400 px-2 py-1 capitalize">
                {options.map((option, i) => (
                    (i === 0)
                        ? <option value={option} key={option} hidden>{option}</option>
                        : <option value={option} key={option}>{option}</option>
                ))}
            </select>
            {(error) && (
                <p className="absolute text-xs text-red-400">{error}</p>
            )}
        </div>
    )
}
