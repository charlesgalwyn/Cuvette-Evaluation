import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/auth_page"
import HomePage from "./pages/home_page"
import Dashboard from "./pages/dashboard"
import Analytics from "./pages/analytics"
import CreateQuize from "./pages/create_quize"
import Loader from "./utils/globalLoader/Loader"
import TakeQuize from "./pages/take_quiz"
import EditQuize from "./pages/edit_quiz"
import QWiseAnalysis from "./pages/q_wise_analysis"
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const App = () => {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/anonymous/:id" element={<TakeQuize />} />
        <Route path="/" element={<HomePage />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/create-quize" element={<CreateQuize />} />
          <Route path="/analytics/edit-quize/:id" element={<EditQuize />} />
          <Route path="/analytics/q-analysis/:id" element={<QWiseAnalysis />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
      />
    </>
  )
}

export default App
