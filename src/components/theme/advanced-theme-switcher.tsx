"use client"

import * as React from "react"
import { Check, Palette } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { PREDEFINED_THEMES, generateTheme, applyTheme } from "@/lib/theme-generator"

export function AdvancedThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState("default")

  React.useEffect(() => {
    // Appliquer le thème sélectionné
    const themeConfig = PREDEFINED_THEMES.find(t => t.value === selectedTheme)
    
    if (themeConfig) {
      // Générer le thème complet à partir des deux couleurs
      const generatedTheme = generateTheme(themeConfig.primary, themeConfig.secondary)
      
      // Appliquer le thème selon le mode actuel
      const currentMode = theme === 'dark' ? 'dark' : 'light'
      applyTheme(generatedTheme, currentMode)
      
      // Supprimer les anciennes classes de thème
      const root = document.documentElement
      PREDEFINED_THEMES.forEach(t => {
        root.classList.remove(`theme-${t.value}`)
      })
      // Ajouter la nouvelle classe de thème
      root.classList.add(`theme-${themeConfig.value}`)
    }
  }, [selectedTheme, theme])

  const handleThemeSelect = (themeValue: string) => {
    setSelectedTheme(themeValue)
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Color Themes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {PREDEFINED_THEMES.map((themeOption) => (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => handleThemeSelect(themeOption.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div 
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: themeOption.primary }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: themeOption.secondary }}
                  />
                </div>
                <span>{themeOption.name}</span>
              </div>
              {selectedTheme === themeOption.value && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Mode</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Badge variant="secondary" className="text-xs">
        {PREDEFINED_THEMES.find(t => t.value === selectedTheme)?.name || "Default"}
      </Badge>
    </div>
  )
}