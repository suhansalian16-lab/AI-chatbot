import { GoogleGenAI } from "@google/genai"


const apiKey = process.env.GEMINI_API_KEY

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null


export async function POST(request) {


  try {
    const { message } = await request.json()

    if (!apiKey) {
      return Response.json(
        { error: "GEMINI_API_KEY is missing. Add it to my-app/.env.local and restart the development server." },
        { status: 500 }
      )
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message
    })


    const reply = response.text


    return Response.json({
      reply: reply
    })


  } catch (error) {


    console.log(error)

return Response.json(
      { error: error.message },
      { status: 500 }
    )


  }
}
