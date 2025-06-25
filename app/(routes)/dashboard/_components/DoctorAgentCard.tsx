"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string; 
  subscriptionRequired: boolean;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();
  const paidUser = has && has({plan: 'pro'})
  const onStartConsultation = async () => {
      setLoading(true);
      const result = await axios.post("/api/session-chat", {
        notes: 'New Query',
        selectedDoctor: doctorAgent,
      });
      console.log(result.data);
      if (result.data?.sessionId) {
        console.log(result.data.sessionId);
        router.push("/dashboard/medical-agent/" + result.data.sessionId);
      }
      setLoading(false);
    };
  return (
    <div className="relative">
      {doctorAgent.subscriptionRequired && <Badge className="absolute m-2 right-0">Pro</Badge>}
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full object-cover h-[250px] rounded-xl"
      />
      <h2 className="font-bold mt-1">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-500">{doctorAgent.description}</p>
      <Button className="w-full mt-2" onClick={onStartConsultation} disabled={!paidUser && doctorAgent.subscriptionRequired}>Start Consultation {loading ? <Loader2 className="animate-spin"/> : <IconArrowRight/>}</Button>
    </div>
  );
}

export default DoctorAgentCard;
