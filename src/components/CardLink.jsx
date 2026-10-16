import { Link } from 'react-router-dom'

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// The Figma-style frame name shown above a project card
export const frameName = (project) => project.frame ?? slugify(project.client.split('·')[1] ?? project.title)

// Cards with a `slug` open their case-study page; others use their external `link`,
// or fall back to the case studies on the home page
export default function CardLink({ project, className = 'group block', children }) {
  if (project.slug)
    return (
      <Link to={`/work/${project.slug}`} className={className}>
        {children}
      </Link>
    )
  if (project.link)
    return (
      <a href={project.link} className={className}>
        {children}
      </a>
    )
  return (
    <Link to="/#work" className={className}>
      {children}
    </Link>
  )
}
