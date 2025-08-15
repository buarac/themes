import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/navigation/main-nav"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Eye, Palette, Lightbulb, Zap, Paintbrush } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold">Themes</h1>
            <MainNav />
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Générateur de Thèmes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Créez et testez des thèmes personnalisés avec notre système avancé basé sur OKLCH
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="secondary">OKLCH Colors</Badge>
            <Badge variant="secondary">Real-time Preview</Badge>
            <Badge variant="secondary">Shadcn/ui</Badge>
            <Badge variant="secondary">Auto Dark Mode</Badge>
          </div>

          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/demo">
                <Eye className="mr-2 h-5 w-5" />
                Voir la Démo
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/theme-editor">
                <Palette className="mr-2 h-5 w-5" />
                Créer un Thème
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-bold">Fonctionnalités</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les capacités de notre système de thèmes
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Génération Intelligente
              </CardTitle>
              <CardDescription>
                Créez des palettes complètes à partir de seulement 2 couleurs principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Notre algorithme génère automatiquement toutes les variantes nécessaires 
                (light/dark, muted, vibrant) en utilisant l'espace colorimétrique OKLCH.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Prévisualisation Temps Réel
              </CardTitle>
              <CardDescription>
                Testez vos thèmes instantanément sur tous les composants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Visualisez immédiatement l'impact de vos changements sur l'ensemble 
                de l'interface utilisateur avec notre système de prévisualisation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5" />
                Export Facile
              </CardTitle>
              <CardDescription>
                Exportez vos thèmes pour les intégrer facilement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Générez automatiquement le code nécessaire pour intégrer 
                vos thèmes personnalisés dans votre application.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Start */}
      <section className="container py-16 border-t">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-bold">Commencer</h2>
          <p className="text-muted-foreground">
            Explorez nos outils en quelques clics
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <Eye className="h-8 w-8 mx-auto mb-2" />
              <CardTitle>Démonstration</CardTitle>
              <CardDescription>
                Découvrez tous les composants avec différents thèmes prédéfinis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/demo">Voir la Démo</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <Palette className="h-8 w-8 mx-auto mb-2" />
              <CardTitle>Éditeur de Thèmes</CardTitle>
              <CardDescription>
                Créez votre propre thème avec notre éditeur interactif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/theme-editor">Créer un Thème</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
