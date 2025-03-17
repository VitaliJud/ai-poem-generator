import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function LyricsGenerator() {
  const [creativity, setCreativity] = useState(50)

  const tabTitles = {
    poem: "AI Poem Generator",
    song: "AI Song Lyrics Generator",
    haiku: "AI Haiku Generator",
    acrostic: "AI Acrostic Poem Generator",
    ballad: "AI Ballad Generator",
    other: "AI Custom Lyrics Generator",
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">AI Lyrics Generator</h1>
      <p className="text-center text-muted-foreground mb-10">
        Create beautiful lyrics, poems, and more with the power of AI
      </p>

      <Tabs defaultValue="poem" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="poem">Poem</TabsTrigger>
          <TabsTrigger value="song">Song</TabsTrigger>
          <TabsTrigger value="haiku">Haiku</TabsTrigger>
          <TabsTrigger value="acrostic">Acrostic</TabsTrigger>
          <TabsTrigger value="ballad">Ballad</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        {Object.entries(tabTitles).map(([key, title]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  Fill in the details below to generate your {key === "other" ? "lyrics" : key}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor={`${key}-topic`}>Topic or Prompt</Label>
                  <Textarea
                    id={`${key}-topic`}
                    placeholder={`What would you like your ${key} to be about?`}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${key}-style`}>Style</Label>
                  <Select>
                    <SelectTrigger id={`${key}-style`}>
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="traditional">Traditional</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="scifi">Sci-fi</SelectItem>
                      <SelectItem value="mystical">Mystical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor={`${key}-creativity`}>Creativity</Label>
                    <span className="text-muted-foreground">{creativity}%</span>
                  </div>
                  <Slider
                    id={`${key}-creativity`}
                    min={0}
                    max={100}
                    step={1}
                    value={[creativity]}
                    onValueChange={(value) => setCreativity(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Experimental</span>
                  </div>
                </div>

                {key === "song" && (
                  <div className="space-y-6 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="song-genre">Genre</Label>
                      <Select>
                        <SelectTrigger id="song-genre">
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rap">Rap</SelectItem>
                          <SelectItem value="broadway">Broadway</SelectItem>
                          <SelectItem value="pop">Pop</SelectItem>
                          <SelectItem value="acoustic">Acoustic</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="song-artists">Similar Artists</Label>
                      <Input id="song-artists" placeholder="e.g. Taylor Swift, Ed Sheeran" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="song-tempo">Tempo</Label>
                      <RadioGroup defaultValue="normal" id="song-tempo">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="upbeat" id="upbeat" />
                            <Label htmlFor="upbeat">Upbeat</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="slow" id="slow" />
                            <Label htmlFor="slow">Slow</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="relaxed" id="relaxed" />
                            <Label htmlFor="relaxed">Relaxed</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="normal" />
                            <Label htmlFor="normal">Normal</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="song-baseline">Baseline</Label>
                      <RadioGroup defaultValue="normal" id="song-baseline">
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="strong" id="strong" />
                            <Label htmlFor="strong">Strong</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="low" />
                            <Label htmlFor="low">Low</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="normal" id="normal-baseline" />
                            <Label htmlFor="normal-baseline">Normal</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="song-vocals">Vocals</Label>
                      <RadioGroup defaultValue="mixed" id="song-vocals">
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mixed" id="mixed" />
                            <Label htmlFor="mixed">Mixed</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {key === "haiku" && (
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">
                      A haiku is a three-line poem with seventeen syllables, written in a 5/7/5 syllable count pattern.
                    </p>
                  </div>
                )}

                {key === "acrostic" && (
                  <div className="space-y-2">
                    <Label htmlFor="acrostic-word">Acrostic Word</Label>
                    <Input id="acrostic-word" placeholder="Enter the word for your acrostic poem" />
                    <p className="text-xs text-muted-foreground">
                      Each line of your poem will begin with a letter from this word.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Generate {key === "other" ? "Lyrics" : key.charAt(0).toUpperCase() + key.slice(1)}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

