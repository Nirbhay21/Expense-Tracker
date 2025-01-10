import React from 'react'
import { MODE } from "../constants"
import { useFilter } from "../hooks/useFilter"
import ArrowIcon from "../assets/ArrowIcon";
import { useContextMenu } from '../hooks/useContextMenu';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ExpenseTable({ expenses, setExpenses, setFormState }) {
    const [contextMenu, showContextMenu, hideContextMenu] = useContextMenu();
    const [filter, filteredExpenses, setFilter] = useFilter(expenses);
    const [sortCallbackStr, setSortCallbackStr] = useLocalStorage("sortCallback", (() => { }).toString());

    const totalAmount = filteredExpenses.reduce((total, expense) => total + parseInt(expense.amount, 10) || 0, 0);
    return (
        <>
            {contextMenu}
            <table className="my-8 w-full table-fixed self-start md:my-0 md:w-1/2" onClick={hideContextMenu}>
                <thead>
                    <tr>
                        <th className="border-2 border-gray-600 px-2 py-1 text-start font-semibold">
                            <div className="flex items-center justify-between">
                                <span>Title</span>
                                <div className="flex">
                                    <div title="Descending Order" className="cursor-pointer transition-transform duration-75 active:translate-y-1" onClick={() => { setSortCallbackStr(((a, b) => b.title.localeCompare(a.title)).toString()) }}>
                                        <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
                                    </div>
                                    <div title="Ascending Order" className="cursor-pointer transition-transform duration-75 active:-translate-y-1" onClick={() => { setSortCallbackStr(((a, b) => a.title.localeCompare(b.title)).toString()) }}>
                                        <ArrowIcon className="h-3.5 w-3.5" />
                                    </div>
                                </div>
                            </div>
                        </th>
                        <th className="border-2 border-gray-600 px-2 py-1 text-start font-semibold">
                            <select
                                name="filterCategory"
                                id="filterCategory"
                                value={filter.value}
                                onChange={(event) => {
                                    setFilter({
                                        value: event.target.value,
                                        filterProperty: "category"
                                    });
                                }}
                                className="w-full capitalize">
                                {["all", "grocery", "clothes", "bills", "education", "medicine"].map((option, i) => (
                                    (i === 0)
                                        ? <option value="" key={option}>{option}</option>
                                        : <option value={option} key={option}>{option}</option>
                                ))}
                            </select>
                        </th>
                        <th className="border-2 border-gray-600 px-2 py-1 text-start font-semibold">
                            <div className="flex items-center justify-between">
                                <span>Amount</span>
                                <div className="flex">
                                    <div title="Descending Order" className="cursor-pointer transition-transform duration-75 active:translate-y-1" onClick={() => {
                                        setSortCallbackStr(((a, b) => b.amount - a.amount).toString());
                                    }}>
                                        <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
                                    </div>
                                    <div title="Ascending Order" className="cursor-pointer transition-transform duration-75 active:-translate-y-1" onClick={() => {
                                        setSortCallbackStr(((a, b) => a.amount - b.amount).toString());
                                    }}>
                                        <ArrowIcon className="h-3.5 w-3.5" />
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(expenses.length) ? [...filteredExpenses].sort(new Function("return " + sortCallbackStr)()).map(({ id, title, category, amount }) => (
                        <tr key={id} onContextMenu={(event) => {
                            event.preventDefault();
                            showContextMenu(event, {
                                edit: () => {
                                    setFormState({ status: MODE.EDIT, editingRow: { id, title, category, amount } });
                                },
                                delete: () => {
                                    setExpenses((prevState) => prevState.filter((expense) => expense.id !== id));
                                }
                            });
                        }}>{[title, category, Number(amount)].map((item, i) => (
                            <td className="border-2 border-gray-600 px-2 py-1" key={`${item}-${i}`}>{typeof item === "number" ? Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR"
                            }).format(item) : item}</td>
                        ))}
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="3" className="border-2 border-gray-600 px-2 py-4 text-center">Your expense table is empty. Add data to see it here!</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="cursor-pointer select-none border-2 border-gray-600 px-2 py-1 font-semibold active:text-slate-500" onClick={() => { setSortCallbackStr((() => () => { }).toString()) }}>Clear Order</td>
                        <td className="border-2 border-gray-600 px-2 py-1 font-semibold">Total</td>
                        <td className="border-2 border-gray-600 px-2 py-1 font-semibold">{Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR"
                        }).format(totalAmount)}</td>
                    </tr>
                </tfoot>
            </table >
        </>
    )
}