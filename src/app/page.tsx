"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Button } from "@/components/ui/button"
import { ProjectView } from "@/features/projects/components/projects-view"

const Home = () => {
  return (
    <ProjectView />
  )
}

export default Home