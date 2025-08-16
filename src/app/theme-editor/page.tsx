"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// Select component removed - using buttons instead
import { Copy, Palette, Eye, Code, RefreshCw, CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"
import { 
  generateTheme, 
  applyTheme, 
  generateCSSCode,
  DEFAULT_THEME_CONFIG,
  PREDEFINED_FONTS,
  type ThemeConfig
} from "@/lib/theme-generator"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { MainNav } from "@/components/navigation/main-nav"

export default function ThemeEditor() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [paletteKey, setPaletteKey] = useState(0)
  
  // Générer le thème en temps réel
  const generatedTheme = useMemo(() => {
    return generateTheme(themeConfig)
  }, [themeConfig, paletteKey])
  
  const handleConfigChange = (field: keyof ThemeConfig, value: string) => {
    setThemeConfig(prev => ({
      ...prev,
      [field]: value
    }))
    setPaletteKey(prev => prev + 1)
    
    // Appliquer immédiatement si en mode préview
    if (isPreviewMode) {
      // Le thème sera régénéré avec useMemo et appliqué automatiquement
      setTimeout(() => {
        const newTheme = generateTheme({ ...themeConfig, [field]: value })
        applyTheme(newTheme)
      }, 0)
    }
  }
  
  const handleRegenerateTheme = () => {
    setPaletteKey(prev => prev + 1)
    if (isPreviewMode) {
      applyTheme(generatedTheme)
    }
  }
  
  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode)
    if (!isPreviewMode) {
      applyTheme(generatedTheme)
    } else {
      window.location.reload()
    }
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSSCode(generatedTheme))
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
            
            {/* Configuration de base */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Configuration du Thème
                </CardTitle>
                <CardDescription>
                  Créez votre thème personnalisé avec une couleur OKLCH de base
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Nom du thème */}
                <div className="space-y-2">
                  <Label htmlFor="theme-name">Nom du thème</Label>
                  <Input
                    id="theme-name"
                    value={themeConfig.name}
                    onChange={(e) => handleConfigChange('name', e.target.value)}
                    placeholder="Mon Super Thème"
                  />
                </div>

                {/* Couleur de base OKLCH */}
                <div className="space-y-2">
                  <Label htmlFor="base-color">Couleur de base (OKLCH)</Label>
                  <Input
                    id="base-color"
                    value={themeConfig.baseColor}
                    onChange={(e) => handleConfigChange('baseColor', e.target.value)}
                    placeholder="oklch(60% 0.15 220)"
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    Format : oklch(lightness% chroma hue) ou &quot;60% 0.15 220&quot;
                  </p>
                </div>

                {/* Police */}
                <div className="space-y-2">
                  <Label>Police de caractères</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {PREDEFINED_FONTS.slice(0, 4).map((font) => (
                      <Button
                        key={font.value}
                        variant={themeConfig.font === font.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleConfigChange('font', font.value)}
                        className="text-xs"
                      >
                        {font.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Espacement */}
                <div className="space-y-2">
                  <Label>Échelle d&apos;espacement</Label>
                  <div className="flex gap-2">
                    {[
                      { value: 'tight', label: 'Serré' },
                      { value: 'normal', label: 'Normal' },
                      { value: 'relaxed', label: 'Espacé' }
                    ].map((item) => (
                      <Button
                        key={item.value}
                        variant={themeConfig.spacing === item.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleConfigChange('spacing', item.value)}
                        className="text-xs"
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Rayons */}
                <div className="space-y-2">
                  <Label>Rayons de bordure</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'sharp', label: 'Angulaire' },
                      { value: 'rounded', label: 'Arrondi' },
                      { value: 'soft', label: 'Doux' },
                      { value: 'full', label: 'Très arrondi' }
                    ].map((item) => (
                      <Button
                        key={item.value}
                        variant={themeConfig.radius === item.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleConfigChange('radius', item.value)}
                        className="text-xs"
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Ombres */}
                <div className="space-y-2">
                  <Label>Intensité des ombres</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'none', label: 'Aucune' },
                      { value: 'subtle', label: 'Subtile' },
                      { value: 'medium', label: 'Moyenne' },
                      { value: 'strong', label: 'Forte' }
                    ].map((item) => (
                      <Button
                        key={item.value}
                        variant={themeConfig.shadow === item.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleConfigChange('shadow', item.value)}
                        className="text-xs"
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Palette générée */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Palette générée</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRegenerateTheme}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Régénérer
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div key={paletteKey} className="grid grid-cols-3 gap-3">
                  {Object.entries(generatedTheme.colors).map(([name, color]) => (
                    <div 
                      key={name} 
                      className="relative h-20 rounded-lg border transition-all duration-300 flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <div className="text-center">
                        <div className="text-xs font-medium mb-1 text-white drop-shadow-md">
                          {name}
                        </div>
                        <div className="text-xs font-mono text-white drop-shadow-md">
                          {color}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Export */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Export CSS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copier le CSS
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
                    <Label>Code CSS pour votre projet :</Label>
                    <Textarea
                      value={generateCSSCode(generatedTheme)}
                      readOnly
                      className="font-mono text-sm"
                      rows={15}
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
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Mode prévisualisation actif. Votre thème est appliqué à toute la page.
                </AlertDescription>
              </Alert>
            )}

            {/* Boutons de couleurs */}
            <Card>
              <CardHeader>
                <CardTitle>Boutons par couleur</CardTitle>
                <CardDescription>
                  Chaque bouton utilise une couleur fondamentale différente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(generatedTheme.colors).map(([name, color]) => (
                    <Button
                      key={name}
                      data-preview="color-button"
                      style={{ 
                        backgroundColor: color, 
                        color: '#fff',
                        borderRadius: generatedTheme.radius.md,
                        boxShadow: generatedTheme.shadows.sm,
                        fontFamily: generatedTheme.font
                      }}
                      className="text-xs"
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alertes avec couleurs système */}
            <Card>
              <CardHeader>
                <CardTitle>Alertes système</CardTitle>
                <CardDescription>
                  Alertes avec les couleurs success, warning, danger et info
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert 
                  data-preview="alert"
                  style={{ 
                    borderColor: generatedTheme.colors.success, 
                    backgroundColor: `${generatedTheme.colors.success}10`,
                    borderRadius: generatedTheme.radius.md,
                    fontFamily: generatedTheme.font
                  }}
                >
                  <CheckCircle className="h-4 w-4" style={{ color: generatedTheme.colors.success }} />
                  <AlertDescription style={{ color: generatedTheme.colors.success }}>
                    Opération réussie avec la couleur success
                  </AlertDescription>
                </Alert>
                
                <Alert 
                  data-preview="alert"
                  style={{ 
                    borderColor: generatedTheme.colors.warning, 
                    backgroundColor: `${generatedTheme.colors.warning}10`,
                    borderRadius: generatedTheme.radius.md,
                    fontFamily: generatedTheme.font
                  }}
                >
                  <AlertTriangle className="h-4 w-4" style={{ color: generatedTheme.colors.warning }} />
                  <AlertDescription style={{ color: generatedTheme.colors.warning }}>
                    Attention, alerte avec la couleur warning
                  </AlertDescription>
                </Alert>
                
                <Alert 
                  data-preview="alert"
                  style={{ 
                    borderColor: generatedTheme.colors.danger, 
                    backgroundColor: `${generatedTheme.colors.danger}10`,
                    borderRadius: generatedTheme.radius.md,
                    fontFamily: generatedTheme.font
                  }}
                >
                  <XCircle className="h-4 w-4" style={{ color: generatedTheme.colors.danger }} />
                  <AlertDescription style={{ color: generatedTheme.colors.danger }}>
                    Erreur critique avec la couleur danger
                  </AlertDescription>
                </Alert>
                
                <Alert 
                  data-preview="alert"
                  style={{ 
                    borderColor: generatedTheme.colors.info, 
                    backgroundColor: `${generatedTheme.colors.info}10`,
                    borderRadius: generatedTheme.radius.md,
                    fontFamily: generatedTheme.font
                  }}
                >
                  <Info className="h-4 w-4" style={{ color: generatedTheme.colors.info }} />
                  <AlertDescription style={{ color: generatedTheme.colors.info }}>
                    Information importante avec la couleur info
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Cards avec couleurs principales */}
            <Card>
              <CardHeader>
                <CardTitle>Cards thématiques</CardTitle>
                <CardDescription>
                  Formulaires utilisant les couleurs primary, secondary, accent et muted
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                
                <Card 
                  data-preview="card"
                  style={{ 
                    borderRadius: generatedTheme.radius.lg,
                    boxShadow: generatedTheme.shadows.md,
                    fontFamily: generatedTheme.font
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle 
                      className="text-sm"
                      style={{ color: generatedTheme.colors.primary }}
                    >
                      Primary Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="primary-name" className="text-xs">Nom</Label>
                      <Input
                        id="primary-name"
                        placeholder="Votre nom"
                        className="text-xs h-7"
                        style={{
                          borderRadius: generatedTheme.radius.sm,
                          fontFamily: generatedTheme.font
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="primary-email" className="text-xs">Email</Label>
                      <Input
                        id="primary-email"
                        type="email"
                        placeholder="email@exemple.com"
                        className="text-xs h-7"
                        style={{
                          borderRadius: generatedTheme.radius.sm,
                          fontFamily: generatedTheme.font
                        }}
                      />
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs"
                      style={{
                        backgroundColor: generatedTheme.colors.primary,
                        borderRadius: generatedTheme.radius.sm,
                        boxShadow: generatedTheme.shadows.sm,
                        fontFamily: generatedTheme.font
                      }}
                    >
                      Valider
                    </Button>
                  </CardContent>
                </Card>
                
                <Card 
                  data-preview="card"
                  style={{ 
                    borderRadius: generatedTheme.radius.lg,
                    boxShadow: generatedTheme.shadows.md,
                    fontFamily: generatedTheme.font
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle 
                      className="text-sm"
                      style={{ color: generatedTheme.colors.secondary }}
                    >
                      Secondary Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="secondary-title" className="text-xs">Titre</Label>
                      <Input
                        id="secondary-title"
                        placeholder="Votre titre"
                        className="text-xs h-7"
                        style={{
                          borderRadius: generatedTheme.radius.sm,
                          fontFamily: generatedTheme.font
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="secondary-message" className="text-xs">Message</Label>
                      <Input
                        id="secondary-message"
                        placeholder="Votre message"
                        className="text-xs h-7"
                        style={{
                          borderRadius: generatedTheme.radius.sm,
                          fontFamily: generatedTheme.font
                        }}
                      />
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs"
                      style={{
                        backgroundColor: generatedTheme.colors.secondary,
                        borderRadius: generatedTheme.radius.sm,
                        boxShadow: generatedTheme.shadows.sm,
                        fontFamily: generatedTheme.font
                      }}
                    >
                      Envoyer
                    </Button>
                  </CardContent>
                </Card>
                
                <Card 
                  data-preview="card"
                  style={{ 
                    borderRadius: generatedTheme.radius.lg,
                    boxShadow: generatedTheme.shadows.md,
                    fontFamily: generatedTheme.font
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle 
                      className="text-sm"
                      style={{ color: generatedTheme.colors.accent }}
                    >
                      Accent Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="accent-user" className="text-xs">Utilisateur</Label>
                      <Input
                        id="accent-user"
                        placeholder="Nom d'utilisateur"
                        className="text-xs h-7"
                        style={{
                          borderRadius: generatedTheme.radius.sm,
                          fontFamily: generatedTheme.font
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="accent-password" className="text-xs">Mot de passe</Label>
                      <Input
                        id="accent-password"
                        type="password"
                        placeholder="••••••••"
                        className="text-xs h-7"
                        style={{
                          borderRadius: generatedTheme.radius.sm,
                          fontFamily: generatedTheme.font
                        }}
                      />
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs"
                      style={{
                        backgroundColor: generatedTheme.colors.accent,
                        borderRadius: generatedTheme.radius.sm,
                        boxShadow: generatedTheme.shadows.sm,
                        fontFamily: generatedTheme.font
                      }}
                    >
                      Connexion
                    </Button>
                  </CardContent>
                </Card>
                
                <Card 
                  data-preview="card"
                  style={{ 
                    borderRadius: generatedTheme.radius.lg,
                    boxShadow: generatedTheme.shadows.md,
                    fontFamily: generatedTheme.font
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle 
                      className="text-sm"
                      style={{ color: generatedTheme.colors.muted }}
                    >
                      Muted Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="muted-search" className="text-xs">Recherche</Label>
                      <Input
                        id="muted-search"
                        placeholder="Rechercher..."
                        className="text-xs h-7"
                        style={{
                          borderRadius: generatedTheme.radius.sm,
                          fontFamily: generatedTheme.font
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="muted-filter" className="text-xs">Filtre</Label>
                      <Input
                        id="muted-filter"
                        placeholder="Filtrer par..."
                        className="text-xs h-7"
                        style={{
                          borderRadius: generatedTheme.radius.sm,
                          fontFamily: generatedTheme.font
                        }}
                      />
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs"
                      style={{
                        backgroundColor: generatedTheme.colors.muted,
                        borderRadius: generatedTheme.radius.sm,
                        boxShadow: generatedTheme.shadows.sm,
                        fontFamily: generatedTheme.font
                      }}
                    >
                      Appliquer
                    </Button>
                  </CardContent>
                </Card>
                
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}