import Image from 'next/image'
import Link from 'next/link'
import { DOMChildrenProps } from '@/lib/types'
import { getBase } from '@/sanity/actions'

export default async function Head() {
  
  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)  
  
  const { title } = base
  
  const links = [ 
    { "label": "home", "url": "/" },
    { "label": "code", "url": "/code" },
    { "label": "docs", "url": "/docs" }
  ]

  const HeadWrap = ({children}: DOMChildrenProps) => {
    return (
      <header className="flex sticky top-0 z-50 w-full border-b-2 border-black-200 p-5 bg-black text-white">
        <nav className="flex items-center justify-between mx-auto w-full max-w-screen-2xl">          
          {children}          
        </nav>
      </header>
    )
  }

  const HeadBranding = () => {
  
    return (
      <div className="head-branding flex justify-between items-center gap-5">
        <Link href="/">
          <Image className="head-logo rounded-full border-4 border-white drop-shadow" src="/images/logo.png" alt="logo" width={50} height={40} />
        </Link>        
        <h1 className="head-title text-4xl uppercase font-sans">{title}</h1>
      </div>      
    )
  }  

  const HeadLinks = () => {
    return (
      <ul className="flex justify-center gap-x-5 max-md:hidden md:gap-x-10">
        {links.map(link => (
          <li>
            <Link href={link.url} target="_blank">{link.label}</Link>
          </li>
        ))}          
      </ul>
    )
  }

  const HeadMenu = () => {
    return (
      <Image className="head-menu block md:hidden" src="/images/menu.svg" alt="menu" width={30} height={30} />
    )
  }

  return (
    <HeadWrap>
      <HeadBranding />
      <HeadMenu />      
      <HeadLinks />      
    </HeadWrap>
  )

}