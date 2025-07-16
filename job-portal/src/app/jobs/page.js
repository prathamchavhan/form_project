'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Briefcase } from 'lucide-react'
import JobCard from '@/components/JobCard'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock job data - replace with actual API call
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      posted_date: '2 days ago',
      description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing user interface components and implementing them following well-known React.js workflows.',
      skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML']
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DataFlow Solutions',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted_date: '1 day ago',
      description: 'Join our backend team to build scalable and robust server-side applications. Experience with Node.js and database management is required.',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker']
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Creative Studio',
      location: 'Los Angeles, CA',
      type: 'Contract',
      salary: '$80,000 - $100,000',
      posted_date: '3 days ago',
      description: 'We need a creative UX/UI Designer to create amazing user experiences. The ideal candidate should have experience with design tools and user research.',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research']
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: 'CloudTech Systems',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      posted_date: '1 week ago',
      description: 'Looking for a DevOps Engineer to help us scale our infrastructure and improve our deployment processes.',
      skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD']
    },
    {
      id: 5,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$140,000 - $170,000',
      posted_date: '4 days ago',
      description: 'We are seeking a Product Manager to lead our product development initiatives and work closely with engineering and design teams.',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership', 'Communication']
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$125,000 - $155,000',
      posted_date: '5 days ago',
      description: 'Join our data science team to build machine learning models and extract insights from large datasets.',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics']
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs)
      setFilteredJobs(mockJobs)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = jobs

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    if (typeFilter) {
      filtered = filtered.filter(job => job.type === typeFilter)
    }

    setFilteredJobs(filtered)
  }, [searchQuery, locationFilter, typeFilter, jobs])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Job</h1>
          <p className="text-xl text-gray-600">Discover opportunities that match your skills and interests</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>More Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}