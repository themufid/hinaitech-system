'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface CompanyFormProps {
  initialData?: any
  isEditing?: boolean
  companyId?: string
}

export default function CompanyForm({
  initialData,
  isEditing = false,
  companyId,
}: CompanyFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    legal_name: initialData?.legal_name || '',
    description: initialData?.description || '',
    logo_url: initialData?.logo_url || '',
    website: initialData?.website || '',
    industry: initialData?.industry || '',
    company_size: initialData?.company_size || '',
    status: initialData?.status || 'active',
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
      const url = isEditing && companyId ? `/api/companies/${companyId}` : '/api/companies'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save company')
      }

      router.push('/dashboard/company')
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
              Company Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 bg-input text-foreground border-border"
              placeholder="Your Company"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-foreground">
              Slug
            </Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="your-company"
            />
          </div>

          <div>
            <Label htmlFor="legal_name" className="text-foreground">
              Legal Name
            </Label>
            <Input
              id="legal_name"
              name="legal_name"
              value={formData.legal_name}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="Your Legal Company Name"
            />
          </div>

          <div>
            <Label htmlFor="industry" className="text-foreground">
              Industry
            </Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="Technology, Finance, etc."
            />
          </div>

          <div>
            <Label htmlFor="website" className="text-foreground">
              Website
            </Label>
            <Input
              id="website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              className="mt-2 bg-input text-foreground border-border"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <Label htmlFor="company_size" className="text-foreground">
              Company Size
            </Label>
            <select
              id="company_size"
              name="company_size"
              value={formData.company_size}
              onChange={handleChange}
              className="mt-2 w-full rounded bg-input px-3 py-2 text-foreground border border-border"
            >
              <option value="">Select size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
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
            placeholder="Describe your company"
            rows={4}
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Company' : 'Create Company'}
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
