"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AIWriter() {
  const [creativity, setCreativity] = useState(50);
  const [formData, setFormData] = useState({ topic: "", style: "traditional", type: "poem" });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, creativity }),
    });

    const data = await response.json();
    setResult(data.text || "Error generating content");
    setLoading(false);
  };

  const tabTitles = {
    poem: "AI Poem Generator",
    song: "AI Song Lyrics Generator",
    haiku: "AI Haiku Generator",
    acrostic: "AI Acrostic Poem Generator",
    ballad: "AI Ballad Generator",
    other: "AI Custom Lyrics Generator",
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">AI Poetry & Lyrics Generator</h1>
      <p className="text-center text-muted-foreground mb-10">
        Create beautiful lyrics, poems, and more with the power of AI.
      </p>

      <Tabs defaultValue="poem" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          {Object.keys(tabTitles).map((key) => (
            <TabsTrigger key={key} value={key} onClick={() => setFormData({ ...formData, type: key })}>
              {tabTitles[key].replace("AI ", "").replace(" Generator", "")}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(tabTitles).map(([key, title]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Fill in the details below to generate your {key === "other" ? "lyrics" : key}.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Topic Input */}
                <div className="space-y-2">
                  <Label htmlFor={`${key}-topic`}>Topic or Prompt</Label>
                  <Textarea
                    id={`${key}-topic`}
                    name="topic"
                    placeholder={`What should your ${key} be about?`}
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Style Selection */}
                <div className="space-y-2">
                  <Label htmlFor={`${key}-style`}>Style</Label>
                  <Select name="style" value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="traditional">Traditional</SelectItem>
                      <SelectItem value="sad">Sad</SelectItem>
                      <SelectItem value="scifi">Sci-fi</SelectItem>
                      <SelectItem value="mystical">Mystical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Creativity Slider */}
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

                {/* Special Input for Haikus */}
                {key === "haiku" && (
                  <div className="p-4 bg-gray-200 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      A haiku follows a 5/7/5 syllable pattern.
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Generating..." : `Generate ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {result && (
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg text-center">
          <h2 className="font-semibold text-lg">Generated {formData.type}:</h2>
          <p className="mt-2 text-gray-800">{result}</p>
        </div>
      )}
    </div>
  );
}