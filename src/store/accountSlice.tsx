import { createSlice } from "@reduxjs/toolkit";

type AccountState = {
  account: { id: string; nameAccount: string; fund: any; imageBg: any }[];
  operations: { date: string; amount: any; account: any }[];
};

const initialState: AccountState = {
  account: [],
  operations: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount(state, action) {
      state.account.push({
        id: new Date().toISOString(),
        nameAccount: action.payload.nameAccount,
        fund: action.payload.fund,
        imageBg: action.payload.selectedImage,
      });
    },
    addMoneyToAccount: (state, action) => {
      const { accountId, additionalAmount } = action.payload;
      const account = state.account.find((acc) => acc.nameAccount === accountId);

      if (account) {
        const currentAmountSpent = parseFloat(account.fund);
        const additionalAmountFloat = parseFloat(additionalAmount);

        if (!isNaN(currentAmountSpent) && !isNaN(additionalAmountFloat)) {
          const newAmountSpent = (
            currentAmountSpent + additionalAmountFloat
          ).toString();

          account.fund = newAmountSpent;
          state.operations.push({
            date: new Date().toISOString(),
            amount: additionalAmountFloat,
            account: accountId,
          });
        }
      }
    },
  },
});

export const { addAccount, addMoneyToAccount } = accountSlice.actions;

export default accountSlice.reducer;
