"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Phone, PhoneOff, Loader2, Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Store event handler references
  const eventHandlersRef = useRef({
    onCallStart: null as any,
    onCallEnd: null as any,
    onMessage: null as any,
    onSpeechStart: null as any,
    onSpeechEnd: null as any,
    onError: null as any
  });

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, liveTranscript]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

  const getConnectionStatus = () => {
    if (isConnecting) return "Connecting";
    if (callStarted) return "Connected";
    return "Not Connected";
  };

  const getStatusColor = () => {
    if (isConnecting) return "bg-yellow-500";
    if (callStarted) return "bg-green-500";
    return "bg-red-500";
  };

  const StartCall = () => {
    setIsConnecting(true);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessionDetail?.selectedDoctor?.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetail?.selectedDoctor?.agentPrompt,
          },
        ],
      },
    };

    // Define event handlers and store references
    eventHandlersRef.current.onCallStart = () => {
      console.log("Call started");
      setCallStarted(true);
      setIsConnecting(false);
    };

    eventHandlersRef.current.onCallEnd = () => {
      setCallStarted(false);
      setIsConnecting(false);
      console.log("Call ended");
    };

    eventHandlersRef.current.onMessage = (message: any) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType == "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType == "final") {
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    };

    eventHandlersRef.current.onSpeechStart = () => {
      console.log("Assistant started speaking");
      setCurrentRole("Assistant");
    };

    eventHandlersRef.current.onSpeechEnd = () => {
      console.log("Assistant stopped speaking");
      setCurrentRole("User");
    };

    eventHandlersRef.current.onError = (error: any) => {
      console.log("Vapi error:", error);
      setIsConnecting(false);
      setCallStarted(false);
    };

    // Register event listeners
    vapi.on("call-start", eventHandlersRef.current.onCallStart);
    vapi.on("call-end", eventHandlersRef.current.onCallEnd);
    vapi.on("message", eventHandlersRef.current.onMessage);
    vapi.on("speech-start", eventHandlersRef.current.onSpeechStart);
    vapi.on("speech-end", eventHandlersRef.current.onSpeechEnd);
    vapi.on("error", eventHandlersRef.current.onError);

    //@ts-ignore
    vapi.start(VapiAgentConfig);
  };

  const EndCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;
    
    // Remove event listeners using stored references
    if (eventHandlersRef.current.onCallStart) {
      vapiInstance.off("call-start", eventHandlersRef.current.onCallStart);
    }
    if (eventHandlersRef.current.onCallEnd) {
      vapiInstance.off("call-end", eventHandlersRef.current.onCallEnd);
    }
    if (eventHandlersRef.current.onMessage) {
      vapiInstance.off("message", eventHandlersRef.current.onMessage);
    }
    if (eventHandlersRef.current.onSpeechStart) {
      vapiInstance.off("speech-start", eventHandlersRef.current.onSpeechStart);
    }
    if (eventHandlersRef.current.onSpeechEnd) {
      vapiInstance.off("speech-end", eventHandlersRef.current.onSpeechEnd);
    }
    if (eventHandlersRef.current.onError) {
      vapiInstance.off("error", eventHandlersRef.current.onError);
    }

    vapiInstance.stop();
    setCallStarted(false);
    setIsConnecting(false);
    setVapiInstance(null);
    
    // Clear event handler references
    eventHandlersRef.current = {
      onCallStart: null,
      onCallEnd: null,
      onMessage: null,
      onSpeechStart: null,
      onSpeechEnd: null,
      onError: null
    };
    
    const result = await GenerateReport();
    setLoading(false);
    toast.success('Your report is generated!')
    router.replace('/dashboard');
  };

  const GenerateReport = async () => {
    const result = await axios.post('/api/medical-report', {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId
    })
    console.log(result.data);
    return result.data;
  }

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <div className={`h-3 w-3 rounded-full ${getStatusColor()}`} />
          {isConnecting && <Loader2 className="h-3 w-3 animate-spin" />}
          {getConnectionStatus()}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>
      {sessionDetail && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetail?.selectedDoctor?.image}
            alt={sessionDetail?.selectedDoctor?.specialist ?? ""}
            width={120}
            height={120}
            className="object-cover h-[100px] w-[100px] rounded-full"
          />
          <h2 className="mt-2 font-semibold text-lg">
            {sessionDetail?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-6 overflow-y-auto px-10 md:px-28 lg:px-52 xl:px-72 max-h-44">
            {messages?.map((msg: messages, index) => (
              <h2
                key={index}
                className={`p-2 ${
                  msg.role === "assistant" ? "font-bold" : "text-gray-500"
                }`}
              >
                {msg.role === "assistant"
                  ? sessionDetail?.selectedDoctor?.specialist
                  : "You"}
                : {msg.text}
              </h2>
            ))}
            {liveTranscript && liveTranscript?.length > 0 && (
              <h2
                className={`${
                  currentRole === "assistant" ? "font-bold" : "text-gray-400"
                }`}
              >
                {currentRole === "assistant"
                  ? sessionDetail?.selectedDoctor?.specialist
                  : "You"}
                : {liveTranscript}
              </h2>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Connection/Disconnection Button */}
          {!callStarted && !isConnecting && (
            <Button className="mt-20" onClick={StartCall} disabled={loading}>
              {loading ? <Loader className="animate-spin"/> : <Phone />}
              Connect to Doctor
            </Button>
          )}

          {callStarted && (
            <Button variant={"destructive"} className="mt-20" onClick={EndCall} disabled={loading}>
              {loading ? <Loader className="animate-spin"/> : <PhoneOff />}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;