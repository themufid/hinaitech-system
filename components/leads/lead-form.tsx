'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface LeadFormProps {
  initialData?: any
  isEditing?: boolean
  leadId?: string
}

export default function LeadForm({
  initialData,
  isEditing = false,
  leadId,
}: LeadFormProps) {
  const router = useRouter()
  const { company } = useAppStore()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    company_name: initialData?.company_name || '',
    service_interested_id: initialData?.service_interested_id || '',
    priority: initialData?.priority || 'medium',
    source: initialData?.source || '',
    notes: initialData?.notes || '',
    estimated_value: initialData?.estimated_value || '',
  })

  useEffect(() => {
    const fetchServices = async () => {
      if (!company?.id) return
      try {
        const response = await fetch(`/api/services?company_id=${company.id}`)
        const { data } = await response.json()
        setServices(data || [])
      } catch (error) {
        console.error('[v0] Error fetching services:', error)
      }
    }

    fetchServices()
  }, [company?.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = isEditing && leadId ? `/api/leads/${leadId}` : '/api/leads'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: company?.id,
          ...formData,
          estimated_value: formData.estimated_value ? parseFloat(formData.estimated_value) : null,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save lead')
      }

      router.push('/dashboard/leads')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border border-border bg-card p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg bg-red-950/50 p-4 text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="name" className="text-foreground">
              Lead Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 bg-input text-foreground border-border"
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-foreground">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <Label htmlFor="company_name" className="text-foreground">
              Company Name
            </Label>
            <Input
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="Company Name"
            />
          </div>

          <div>
            <Label htmlFor="service_interested_id" className="text-foreground">
              Interested Service
            </Label>
            <select
              id="service_interested_id"
              name="service_interested_id"
              value={formData.service_interested_id}
              onChange={handleChange}
              className="mt-2 w-full rounded bg-input px-3 py-2 text-foreground border border-border"
            >
              <option value="">Select a service</option>
              {services.map((service: any) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="priority" className="text-foreground">
              Priority
            </Label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-2 w-full rounded bg-input px-3 py-2 text-foreground border border-border"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <Label htmlFor="source" className="text-foreground">
              Source
            </Label>
            <Input
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="Website, Referral, etc."
            />
          </div>

          <div>
            <Label htmlFor="estimated_value" className="text-foreground">
              Estimated Value ($)
            </Label>
            <Input
              id="estimated_value"
              name="estimated_value"
              type="number"
              step="0.01"
              value={formData.estimated_value}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="notes" className="text-foreground">
            Notes
          </Label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-2 w-full rounded bg-input px-3 py-2 text-foreground border border-border"
            placeholder="Add notes about this lead"
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Lead' : 'Create Lead'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
