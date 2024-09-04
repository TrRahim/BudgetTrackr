// react imports
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef } from "react";
// rrd imports
import { useFetcher } from "react-router-dom";

export default function AddExpenseForm({ budgets }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 &&
            `${budgets.map((budget) => {
              return budget.name;
            })}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" ref={formRef} className="grid-sm">
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Name</label>
            <input
              type="text"
              id="newExpense"
              name="newExpense"
              placeholder="e.g., Coffe"
              required
              ref={focusRef}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              required
              step={0.01}
              placeholder="e.g., 35.00"
              id="newExpenseAmount"
              name="newExpenseAmount"
              inputMode="decimal"
            />
          </div>
        </div>
        {budgets.length === 1 ? null : (
          <div className="grid-xs">
            <select name="expenseBudgets" id="expenseBudgets" required>
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .reduce((uniqueNames, budget) => {
                  if (!uniqueNames.includes(budget.name)) {
                    uniqueNames.push(budget.name);
                    return uniqueNames;
                  }
                  return uniqueNames;
                }, [])
                .map((name) => {
                  const budget = budgets.find((budget) => budget.name === name);
                  return (
                    <option value={budget.id} key={budget.id}>
                      {budget.name}
                    </option>
                  );
                })}
            </select>
          </div>
        )}

        <input type="hidden" name="_action" value={"newExpense"} />
        <button disabled={isSubmitting} type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}
