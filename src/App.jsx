import { MODE } from "./constants"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseTable from "./components/ExpenseTable"
import { useLocalStorage } from "./hooks/useLocalStorage"

function App() {
  const [expenses, setExpenses] = useLocalStorage("expensesData", []);
  const [formState, setFormState] = useLocalStorage("formState", {
    status: MODE.ADD,
    editingRow: null
  });

  return (
    <div className="space-y-8 px-6 py-4">
      <header>
        <h1 className="text-3xl font-semibold">Track Your Expense</h1>
      </header>
      <main className="md:flex md:space-x-6">
        <ExpenseForm setExpenses={setExpenses} formState={formState} setFormState={setFormState} />
        <ExpenseTable expenses={expenses} setExpenses={setExpenses} setFormState={setFormState} />
      </main>
    </div>
  )
}

export default App
