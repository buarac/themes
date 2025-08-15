"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Calendar } from "@/components/ui/calendar"
import { AdvancedThemeSwitcher } from "@/components/theme/advanced-theme-switcher"
import { MainNav } from "@/components/navigation/main-nav"
import { CalendarIcon, HeartIcon, StarIcon, BellIcon, SettingsIcon, PaletteIcon } from "lucide-react"

export default function DemoPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: true,
    item3: false
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Theme Switcher */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-semibold">Themes</h1>
            <MainNav />
          </div>
          <AdvancedThemeSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="space-y-8 gap-4">
          
          {/* Typography Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Typography</h2>
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                The Joke Tax Chronicles
              </h1>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                The People of the Kingdom
              </h2>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                The Joke Tax
              </h3>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Once upon a time, in a far-off land, there was a very lazy king who
                spent all day lounging on his throne. One day, his advisors came to him
                with a problem: the kingdom was running out of money.
              </p>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                "After all," he said, "everyone enjoys a good joke, so it's only fair
                that they should pay for the privilege."
              </blockquote>
            </div>
          </section>

          {/* Buttons Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button>
                <CalendarIcon className="mr-2 h-4 w-4" />
                With Icon
              </Button>
              <Button variant="outline" size="icon">
                <HeartIcon className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Cards Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Cards</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>
                    A simple card with header and content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the card content area where you can put any information.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Profile Card</CardTitle>
                      <CardDescription>@shadcn</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>A card with avatar and profile information.</p>
                  <div className="flex space-x-2 mt-4">
                    <Badge>React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="outline">Next.js</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 fill-current" />
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Alerts Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Alerts</h2>
            <div className="space-y-4">
              <Alert>
                <BellIcon className="h-4 w-4" />
                <div>
                  <h4 className="font-semibold">Default Alert</h4>
                  <div className="text-sm">This is a default alert message.</div>
                </div>
              </Alert>
              <Alert variant="destructive">
                <div>
                  <h4 className="font-semibold">Destructive Alert</h4>
                  <div className="text-sm">This is a destructive alert message.</div>
                </div>
              </Alert>
            </div>
          </section>

          {/* Form Elements */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Form Elements</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Checkboxes & Toggles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="item1"
                        checked={checkedItems.item1}
                        onCheckedChange={(checked) => 
                          setCheckedItems(prev => ({ ...prev, item1: checked as boolean }))
                        }
                      />
                      <Label htmlFor="item1">Accept terms and conditions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="item2"
                        checked={checkedItems.item2}
                        onCheckedChange={(checked) => 
                          setCheckedItems(prev => ({ ...prev, item2: checked as boolean }))
                        }
                      />
                      <Label htmlFor="item2">Subscribe to newsletter</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="item3"
                        checked={checkedItems.item3}
                        onCheckedChange={(checked) => 
                          setCheckedItems(prev => ({ ...prev, item3: checked as boolean }))
                        }
                      />
                      <Label htmlFor="item3">Enable notifications</Label>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Toggle>
                        <HeartIcon className="h-4 w-4" />
                      </Toggle>
                      <Label>Like</Label>
                    </div>
                    <ToggleGroup type="single" className="justify-start">
                      <ToggleGroupItem value="left">Left</ToggleGroupItem>
                      <ToggleGroupItem value="center">Center</ToggleGroupItem>
                      <ToggleGroupItem value="right">Right</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Text Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      placeholder="Type your message here..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Calendar Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
            <Card className="w-fit">
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </section>

          {/* Avatars & Badges */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Avatars & Badges</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Avatars</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">SM</AvatarFallback>
                    </Avatar>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}