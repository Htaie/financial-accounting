import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMoneyToAccount } from "../store/accountSlice";

const AccountPage = () => {
 const accounts = useSelector((state: any) => state.account.account);
 const operations = useSelector((state: any) => state.account.operations);
 const [amountSpent, setAmountSpent] = useState("");
 const [selectedAccount, setSelectedAccount] = useState("");
 const dispatch = useDispatch();

 const handleAddAccount = () => {
  dispatch(
   addMoneyToAccount({
    date: new Date().toISOString(),
    accountId: selectedAccount,
    additionalAmount: amountSpent,
   })
  );

  setAmountSpent("");
  setSelectedAccount("");
 };

 const handleAccountChange = (e: any) => {
  setAmountSpent(e.target.value);
 };

 const handlesetSelectedAccount = (e: any) => {
  setSelectedAccount(e.target.value);
 };
 console.log(operations)
 return (
  <div>
   <h1>Транзакции</h1>
   <div className="w-80">
    <label
     htmlFor="accounts"
     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
     Select an account
    </label>
    <select
     id="accounts"
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     onChange={handlesetSelectedAccount}
     value={selectedAccount}
    >
     <option value="">Choose an account</option>
     {accounts.map((elem: any) => (
      <option key={elem.id} value={elem.nameAccount}>
       {elem.nameAccount}
      </option>
     ))}
    </select>
    <label className="mb-4">Сколько потратили:</label>
    <input
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
     name="myInput"
     type="number"
     value={amountSpent}
     onChange={handleAccountChange}
    />
    <div className="flex justify-between mt-10">
     <button
      className="rounded px-4 py-2 text-white bg-gray-300"
      onClick={handleAddAccount}
     >
      Добавить
     </button>
    </div>
   </div>

   <div>
    <h2>Список сохраненных операций</h2>
    {/* <ul>
     {operations.map((operation: any) => (
      <li key={operation.id}>
       Дата и время: {operation.date}, Сумма: {operation.amount}, Аккаунт:{" "}
       {operation.account}
      </li>
     ))}
    </ul> */}
   </div>

   <div>
    <h2>Список счетов и сумм</h2>
    <ul>
     {accounts.map((account: any) => (
      <li key={account.id}>
       Название Счета: {account.nameAccount}, Сумма: {account.fund}
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
};

export default AccountPage;
