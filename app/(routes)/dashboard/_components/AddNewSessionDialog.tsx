"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

function AddNewSessionDialog() {
    const [note, setNote] = useState<string>();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">
          <IconPlus />
          Start a Consultation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2>Add Symptoms or Any Other Details</h2>
              <Textarea placeholder="Add details here..." className="h-[200px] mt-1" onChange={(e)=>setNote(e.target.value)}/>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant={'outline'}>Cancel</Button>
            </DialogClose>
            <Button disabled={!note}>Next <ArrowRight/></Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
