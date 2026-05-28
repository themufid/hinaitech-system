import CompanyForm from '@/components/company/company-form'
import DashboardHeader from '@/components/dashboard/header'


export default function NewCompanyPage() {
  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Create New Company"
        subtitle="Set up your company profile"
      />
      <CompanyForm />
    </div>
  )
}
