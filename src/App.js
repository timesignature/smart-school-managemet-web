import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Employees from "./pages/Employees";
import AddStudent from "./pages/Students/add";
import {QueryClient,QueryClientProvider} from "react-query";
import EditStudent from "./pages/Students/edit";
import EditEmployee from "./pages/Employees/edit";
import AddEmployee from "./pages/Employees/add";
import Education from "./pages/Employees/education";
import Family from "./pages/Employees/family";
import Term from "./pages/Term";
import Fees from "./pages/Fees";
import Invoice from "./pages/Invoice";
import Registration from "./pages/Registration";
import Salary from "./pages/Salary";
import Expenses from "./pages/Expenses";
import AddExpenses from "./pages/Expenses/add";
import Setting from "./pages/Setting";
import Transactions from "./pages/Transactions";
import Payroll from "./pages/Payroll";
import Payslip from "./pages/Payslip";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import GuardedRoute from "./components/GuardedRoute";

function App() {

  const queryClient = new QueryClient()


  return (
   <QueryClientProvider client={queryClient}>
     <BrowserRouter>
       <Switch>
         <GuardedRoute path={'/'} exact component={Home}/>
         <Route path={'/login'} exact component={Login}/>
         <Route path={'/register'} exact component={Register}/>
         <Route path={'/forgot'} exact component={Forgot}/>
         <Route path={'/reset-password/:token'} exact component={Forgot}/>
         <GuardedRoute path={'/students'} exact component={Students}/>
         <GuardedRoute path={'/students/add'} component={AddStudent}/>
         <GuardedRoute path={'/students/:id/edit'} component={EditStudent}/>
         <GuardedRoute path={'/students/:id/registration'} exact component={Invoice}/>
         <GuardedRoute path={'/employees'} exact component={Employees}/>
         <GuardedRoute path={'/employees/add'} component={AddEmployee}/>
         <GuardedRoute path={'/employees/:id/edit'} component={EditEmployee}/>
         <GuardedRoute path={'/employees/:id/contact'} component={Family}/>
         <GuardedRoute path={'/employees/:id/education'} component={Education}/>
         <GuardedRoute path={'/terms'} exact component={Term}/>
         <GuardedRoute path={'/fees'} exact component={Fees}/>
         <GuardedRoute path={'/registration'} exact component={Registration}/>
         <GuardedRoute path={'/salary'} exact component={Salary}/>
         <GuardedRoute path={'/expenses'} exact component={Expenses}/>
         <GuardedRoute path={'/expenses/add'} exact component={AddExpenses}/>
         <GuardedRoute path={'/setting'} exact component={Setting}/>
         <GuardedRoute path={'/payroll'} exact component={Payroll}/>
         <GuardedRoute path={'/payslip/:id'} exact component={Payslip}/>
         <GuardedRoute path={'/transactions'} exact component={Transactions}/>
         <GuardedRoute path={'/invoice/:f_id/:s_id'} exact component={Invoice}/>
       </Switch>
     </BrowserRouter>
   </QueryClientProvider>
  );
}

export default App;
