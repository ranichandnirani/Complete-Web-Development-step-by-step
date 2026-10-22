import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "../../generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

export async function GET(request: NextRequest){
    try{
        const videos = await prisma.video.findMany({
            orderBy: {createdAt: "desc"}
        })
        return NextResponse.json(videos)
    } catch (error) {
        return NextResponse.json({error: "Error fetching videos"},
        {status: 500}
        )
    } finally {
        await prisma.$disconnect()
    }
}