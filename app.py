from flask import Flask, render_template, request
from openai import OpenAI
import os
import random

app = Flask(__name__)

# Load API key securely
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_haiku(topic, style="traditional", temperature=0.7, num_variations=3):
    """
    Generates multiple AI haikus based on the user's topic and style.
    """
    try:
        prompt = f"Write a {style} haiku about {topic}."
        completions = client.chat.completions.create(
            model="gpt-4o-mini",
            store=True,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature,
            n=num_variations
        )
        return [completion.message.content for completion in completions.choices]
    
    except Exception as e:
        return [f"Error: {e}"]

@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        topic = request.form.get("topic", "").strip()
        style = request.form.get("style", "traditional").strip()
        temp = request.form.get("temperature", "0.7").strip()
        temperature = float(temp) if temp else 0.7

        haikus = generate_haiku(topic, style, temperature)
        return render_template("index.html", topic=topic, style=style, haikus=haikus)

    return render_template("index.html", haikus=[])

if __name__ == "__main__":
    app.run(debug=True)