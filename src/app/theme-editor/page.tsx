"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Palette, Eye, Code, Lightbulb, RefreshCw } from "lucide-react"
import { generateTheme, applyTheme } from "@/lib/theme-generator"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { MainNav } from "@/components/navigation/main-nav"

interface ColorPicker {
  primary: string;
  secondary: string;
  name: string;
}

export default function ThemeEditor() {
  const [themeConfig, setThemeConfig] = useState<ColorPicker>({
    name: "Mon Thème",
    primary: "#3b82f6",
    secondary: "#06b6d4"
  })
  
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [paletteKey, setPaletteKey] = useState(0) // Pour forcer le re-render de la palette
  
  // Générer le thème en temps réel avec invalidation forcée
  const generatedTheme = useMemo(() => {
    return generateTheme(themeConfig.primary, themeConfig.secondary)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeConfig.primary, themeConfig.secondary, paletteKey])
  
  const handleColorChange = (type: 'primary' | 'secondary', value: string) => {
    setThemeConfig(prev => ({
      ...prev,
      [type]: value
    }))
    // Forcer la régénération de la palette
    setPaletteKey(prev => prev + 1)
  }
  
  const handleRegenerateTheme = () => {
    // Force la régénération complète du thème
    setPaletteKey(prev => prev + 1)
    if (isPreviewMode) {
      // Re-appliquer le thème si on est en mode préview
      applyTheme(generatedTheme, 'light')
    }
  }
  
  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode)
    if (!isPreviewMode) {
      // Appliquer le thème généré
      applyTheme(generatedTheme, 'light')
    } else {
      // Revenir au thème par défaut
      window.location.reload()
    }
  }
  
  const generateThemeCode = () => {
    return `{
  name: "${themeConfig.name}",
  value: "${themeConfig.name.toLowerCase().replace(/\s+/g, '-')}",
  primary: "${themeConfig.primary}",
  secondary: "${themeConfig.secondary}"
}`
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateThemeCode())
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold">Themes</h1>
            <MainNav />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={isPreviewMode ? "default" : "outline"} 
              size="sm"
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? "Arrêter Préview" : "Prévisualiser"}
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Panel de Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Configuration du Thème
                </CardTitle>
                <CardDescription>
                  Créez votre thème personnalisé en choisissant deux couleurs principales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Nom du thème */}
                <div className="space-y-2">
                  <Label htmlFor="theme-name">Nom du thème</Label>
                  <Input
                    id="theme-name"
                    value={themeConfig.name}
                    onChange={(e) => setThemeConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Mon Super Thème"
                  />
                </div>

                {/* Couleur Principale */}
                <div className="space-y-3">
                  <Label>Couleur Principale</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="color"
                        value={themeConfig.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-16 h-16 rounded-lg border-2 border-border cursor-pointer"
                        style={{ backgroundColor: themeConfig.primary }}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        value={themeConfig.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        placeholder="#3b82f6"
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Utilisée pour les boutons, liens et éléments d&apos;action
                      </p>
                    </div>
                  </div>
                </div>

                {/* Couleur Secondaire */}
                <div className="space-y-3">
                  <Label>Couleur Secondaire</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <input
                        type="color"
                        value={themeConfig.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-16 h-16 rounded-lg border-2 border-border cursor-pointer"
                        style={{ backgroundColor: themeConfig.secondary }}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        value={themeConfig.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        placeholder="#06b6d4"
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Utilisée pour les accents et éléments secondaires
                      </p>
                    </div>
                  </div>
                </div>

                {/* Palette générée */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Palette générée automatiquement</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRegenerateTheme}
                      className="h-8"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Régénérer
                    </Button>
                  </div>
                  <div key={paletteKey} className="grid grid-cols-8 gap-2">
                    {Object.entries(generatedTheme.light).slice(0, 8).map(([key, color]) => (
                      <div key={key} className="text-center">
                        <div 
                          className="w-full h-8 rounded border border-border transition-all duration-300"
                          style={{ backgroundColor: color }}
                          title={`${key}: ${color}`}
                        />
                        <span className="text-xs text-muted-foreground">{key.split('-')[0]}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    La palette se met à jour automatiquement. Utilisez &quot;Régénérer&quot; pour forcer le rafraîchissement.
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Export */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Export & Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copier le Code
                  </Button>
                  <Button 
                    onClick={() => setShowCode(!showCode)} 
                    variant="outline" 
                    size="sm"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    {showCode ? "Masquer" : "Voir"} Code
                  </Button>
                </div>
                
                {showCode && (
                  <div className="space-y-2">
                    <Label>Code à ajouter dans PREDEFINED_THEMES :</Label>
                    <Textarea
                      value={generateThemeCode()}
                      readOnly
                      className="font-mono text-sm"
                      rows={6}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Panel de Prévisualisation */}
          <div className="space-y-6">
            
            {isPreviewMode && (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <div>
                  <h4 className="font-semibold">Mode Prévisualisation Actif</h4>
                  <div className="text-sm">Votre thème est appliqué à toute la page. Testez les composants ci-dessous.</div>
                </div>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Aperçu du Thème</CardTitle>
                <CardDescription>
                  Prévisualisation des composants avec votre thème
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Buttons Preview */}
                <div className="space-y-3">
                  <Label>Boutons</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button>Bouton Principal</Button>
                    <Button variant="secondary">Secondaire</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>

                {/* Cards Preview */}
                <div className="space-y-3">
                  <Label>Cartes</Label>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Carte d'exemple</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Contenu de la carte avec le nouveau thème
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Badge>Badge 1</Badge>
                          <Badge variant="secondary">Badge 2</Badge>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Statistiques</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>75%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Form Preview */}
                <div className="space-y-3">
                  <Label>Formulaires</Label>
                  <div className="space-y-3">
                    <div className="grid gap-2">
                      <Label htmlFor="demo-input">Champ de saisie</Label>
                      <Input id="demo-input" placeholder="Tapez quelque chose..." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="demo-textarea">Zone de texte</Label>
                      <Textarea id="demo-textarea" placeholder="Message..." rows={3} />
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}