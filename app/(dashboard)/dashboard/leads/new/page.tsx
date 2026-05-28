import LeadForm from '@/components/leads/lead-form'
import DashboardHeader from '@/components/dashboard/header'


export default function NewLeadPage() {
  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Add New Lead"
        subtitle="Create a new sales lead"
      />
      <LeadForm />
    </div>
  )
}
