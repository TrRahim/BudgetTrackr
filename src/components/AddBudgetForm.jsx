import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

export default function AddBudgetForm() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const newBudgetRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      newBudgetRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget"></label>
          <input
            type="text"
            id="newBudget"
            name="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={newBudgetRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step={0.01}
            placeholder="e.g., $350"
            inputMode="decimal"
            required
            id="newBudgetAmount"
            name="newBudgetAmount"
          />
        </div>
        <input name={"_action"} type="hidden" value={"createBudget"} />
        <button disabled={isSubmitting} type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
}
