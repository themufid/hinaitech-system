'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import DashboardHeader from '@/components/dashboard/header'


export default function NewServicePage() {
  const router = useRouter()
  const { company } = useAppStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    pricing_type: 'fixed',
    base_price: '',
    duration_days: '',
  })

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
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: company?.id,
          ...formData,
          base_price: formData.base_price ? parseFloat(formData.base_price) : null,
          duration_days: formData.duration_days ? parseInt(formData.duration_days) : null,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create service')
      }

      router.push('/dashboard/services')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 p-8">
      <DashboardHeader
        title="Create New Service"
        subtitle="Add a service to your offerings"
      />

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
                Service Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 bg-input text-foreground border-border"
                placeholder="Service Name"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-foreground">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-2 bg-input text-foreground border-border"
                placeholder="Consulting, Development, etc."
              />
            </div>

            <div>
              <Label htmlFor="pricing_type" className="text-foreground">
                Pricing Type
              </Label>
              <select
                id="pricing_type"
                name="pricing_type"
                value={formData.pricing_type}
                onChange={handleChange}
                className="mt-2 w-full rounded bg-input px-3 py-2 text-foreground border border-border"
              >
                <option value="fixed">Fixed</option>
                <option value="hourly">Hourly</option>
                <option value="retainer">Retainer</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <Label htmlFor="base_price" className="text-foreground">
                Base Price ($)
              </Label>
              <Input
                id="base_price"
                name="base_price"
                type="number"
                step="0.01"
                value={formData.base_price}
                onChange={handleChange}
                className="mt-2 bg-input text-foreground border-border"
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="duration_days" className="text-foreground">
                Duration (Days)
              </Label>
              <Input
                id="duration_days"
                name="duration_days"
                type="number"
                value={formData.duration_days}
                onChange={handleChange}
                className="mt-2 bg-input text-foreground border-border"
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 w-full rounded bg-input px-3 py-2 text-foreground border border-border"
              placeholder="Describe this service"
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? 'Creating...' : 'Create Service'}
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
    </div>
  )
}
