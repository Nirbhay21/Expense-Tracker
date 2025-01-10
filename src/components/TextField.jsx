import React from 'react'

export default function TextField({ type, name, value, onChange, error }) {
    return (
        <div>
            <label htmlFor={name} className="block text-lg font-semibold capitalize">{name}</label>
            <input type={type} id={name} name={name} value={value} onChange={onChange} className="w-full border-2 border-slate-400 px-2 py-1" />
            {(error) && (
                <p className="absolute text-xs text-red-400">{error}</p>
            )}
        </div>
    )
}
