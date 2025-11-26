"use client"

import { useState } from "react"
import { UserProvider } from "@/components/user-context"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import DashboardPage from "@/components/pages/dashboard-page"
import ProjectsPage from "@/components/pages/projects-page"
import CalendarPage from "@/components/pages/calendar-page"
import VacationsPage from "@/components/pages/vacations-page"
import EmployeesPage from "@/components/pages/employees-page"
import MessengerPage from "@/components/pages/messenger-page"
import InfoPortalPage from "@/components/pages/info-portal-page"
import FinancesPage from "@/components/pages/finances-page"
import LoginPage from "@/components/pages/login-page"

function HomeContent() {
  const [currentPage, setCurrentPage] = useState("Dashboard")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} onLogout={() => setIsLoggedIn(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={() => setIsLoggedIn(false)} />
        <main className="flex-1 overflow-auto">
          {currentPage === "Dashboard" && <DashboardPage onNavigate={setCurrentPage} />}
          {currentPage === "Projects" && <ProjectsPage />}
          {currentPage === "Finances" && <FinancesPage />}
          {currentPage === "Calendar" && <CalendarPage />}
          {currentPage === "Vacations" && <VacationsPage />}
          {currentPage === "Employees" && <EmployeesPage />}
          /* {currentPage === "Messenger" && <MessengerPage />} */
          {currentPage === "Info Portal" && <InfoPortalPage />}
        </main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  )
}
