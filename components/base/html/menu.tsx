"use client"

/*
jonobase by @jonchius
/app/components/base/html/menu.tsx
the "menu" of the header
*/

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"
import { UtilDOMChildrenProps, UtilMenuFindWrapperProps } from "@/sanity/myprops"
import BlockContent from "@sanity/block-content-to-react"
import { Span } from "./main"
import { colors, text } from "@/app/config"
import FocusTrap from "focus-trap-react"
import MenuFind from "./menu-find"
import { serializers } from "../util/rich"

export default function Menu({myBase} : any) {
  
  const [ showMenu, setShowMenu ] = useState(false)  
  const [ menuOpenedAlready, setMenuOpenedAlready ] = useState(false)  

  /* def hot keys */
  useHotkeys("ctrl+k, meta+k", () => document.getElementById("desktop-search-in-nav")?.focus())
  useHotkeys("ctrl+/, meta+/", () => document.getElementById("open-menu")?.click())
  useHotkeys("escape", () => closeMenu())
  /* end hot keys */

  /* def dark mode */
  const { theme, setTheme } = useTheme()

  const handleTheme = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault()    
    setTheme(theme === "dark" ? "light" : "dark")    
  }
  /* end dark mode */
  
  /* def menu ui */
  const openMenu = () => {
    setShowMenu(true) 
    setMenuOpenedAlready(true)   
  }

  const closeMenu = () => {
    setShowMenu(false)    
  }

  useEffect(() => {
    if (menuOpenedAlready) document.getElementById("open-menu")?.focus()
  }, [showMenu, menuOpenedAlready])

  const MenuButton = () => {
    return (
      <div className={`menu-button ml-2`}>
        <button className={`text-sm uppercase`} onClick={openMenu} id="open-menu">
          <Span className={`mr-1 text-2xl`} ariaHidden={true}>≡</Span>
          <Span className={`mx-1 text-2xl`}>{text["menu"]}</Span>
          <Span className={`ml-1 text-gray-400 hidden sm:inline`}>(⌘/)</Span>
        </button>
      </div>
    )
  }

  const MenuDialog = ({children}: UtilDOMChildrenProps) => {
    return (
      <dialog 
        aria-label={text["menu"]} 
        className={`menu-dialog 
          bg-gradient-to-b from-white to-zinc-200
          dark:from-black dark:to-gray-800
          flex overflow-y-auto 
          w-full h-screen fixed top-0 left-0 p-10 !z-[200]
      `}>
        {children}
      </dialog>
    )
  }

  const MenuWrapper = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`menu-wrapper w-full lg:max-w-4xl mx-auto`}>
        {children}
      </div>
    )
  }

  const MenuHead = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`menu-head 
        flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10
      `}>
        {children}
      </div>
    )
  }

  const MenuHeading = () => {
    return (
      <div className={`menu-heading`}>
        <Span className={`text-3xl font-bold mr-2 uppercase`}>{myBase.title}</Span>
        <Span className={`text-xl font-light`}>{text["menu"]}</Span>
      </div>
    )
  }

  const MenuTagline = () => {
    return (
      <div 
        className={`menu-tagline 
          block sm:hidden text-center my-2
        `}
      >
        <Span>{myBase.tagline}</Span>
      </div>
    )
  }

  const MenuOptions = ({children} : UtilDOMChildrenProps) => {
    return (
      <div 
        className={`menu-options 
          flex justify-center gap-5
        `}
      >
        {children}
      </div>
    )
  }

  const MenuCloseOption = () => {
    return (
      <div 
        className={`menu-close 
          mt-5
        `}
      >
        <button onClick={closeMenu}>
          <Span 
            aria-hidden={true}
            className={`sm:mr-2`}>❌</Span>
          <br className={`sm:hidden`} />
          <Span>{text["close menu"]}</Span>
        </button>
      </div>
    )
  }

  const MenuThemeOption = () => {
    return (
      <div 
        className={`menu-theme
          mt-5
        `}
      >
        <button onClick={handleTheme}>
          <Span 
            aria-hidden={true}
            className={`sm:mr-2`}>
            {theme === "dark" ? "💡" : "🌜" }
          </Span>
          <br className={`sm:hidden`} />
          <Span>
            {theme === "dark" 
              ? text["switch to light mode"] 
              : text["switch to dark mode"] 
            }
          </Span>
        </button>
      </div>
    )
  }

  const MenuContent = () => {
    return (
      <nav
        className={`menu-content 
          pb-10 md:pb-5 text-center prose-h2:my-5 
          prose-h2:text-2xl prose-h3:text-xl prose-p:text-lg 
          md:prose-h2:text-4xl md:prose-h3:text-3xl md:prose-p:text-2xl 
          prose-a:${colors.link} dark:prose-a:${colors.darkLink} 
          hover:prose-a:${colors.linkHover} dark:hover:prose-a:${colors.darkLinkHover} 
          hover:prose-a:font-semibold prose-p:mb-3
        `} 
      >
        <BlockContent 
          blocks={myBase.menu} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </nav>
      
    )
  }

  const MenuFindWrapper = ({children, className}: UtilMenuFindWrapperProps) => {
    return (
      <div 
        className={`menu-find-wrapper 
          ${className}
        `}
      >
        {children}
      </div>
    )
  }
  /* end menu ui */

  return (
    <>      
      <MenuFindWrapper className={`hidden md:block`}>
        <MenuFind 
          showMenu={setShowMenu} 
          inputName={`desktop-search-in-nav`} 
          placeholder={`🔎 ${text.search} (⌘K)`} 
        />
      </MenuFindWrapper>
      <MenuButton />
      { showMenu && (
        <FocusTrap>
          <div>
            <MenuDialog>
              <MenuWrapper>
                <MenuHead>
                  <MenuHeading />
                  <MenuTagline />
                  <MenuOptions>
                    <MenuCloseOption />
                    <MenuThemeOption />
                  </MenuOptions>
                </MenuHead>
                <MenuFindWrapper className={`block md:hidden mb-5`}>                  
                  <MenuFind                     
                    showMenu={setShowMenu} 
                    inputName={`mobile-search-in-menu`} 
                    placeholder={`🔎 ${text["search"]}`} 
                  />
                </MenuFindWrapper>
                <MenuContent />
                <MenuFindWrapper className={`hidden md:block mt-5`}>                
                  <MenuFind                     
                    showMenu={setShowMenu} 
                    inputName={`desktop-search-in-menu`} 
                    placeholder={`🔎 ${text["search"]}`} 
                  />
                </MenuFindWrapper>
              </MenuWrapper>
            </MenuDialog>
          </div>
        </FocusTrap>
      )}
    </>
  )
}