import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom'

export function Nav() {
  return (
    <nav className='nav'>
      <CustomLink to='home'>Home</CustomLink>
      <CustomLink to='signin'>Sign in</CustomLink>
      <CustomLink to='checks'>Special checks</CustomLink>
    </nav>
  )
}

function CustomLink({ children, to, ...props }: LinkProps) {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname })

  const className = `nav-link${match ? ' active' : ''}`
  return (
    <div>
      <Link className={className} to={to} {...props}>
        {children}
      </Link>
    </div>
  )
}
