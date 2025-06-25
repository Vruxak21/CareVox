import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import { Button } from "@/components/ui/button";
import moment from 'moment';
import ViewReportDialog from "./ViewReportDialog";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

type Props = {
  historyList: SessionDetail[];
  showAll?: boolean; // New prop to control display mode
};

function HistoryTable({ historyList, showAll = false }: Props) {
  // Show only latest 4 records when not in showAll mode
  const displayList = showAll ? historyList : historyList.slice(0, 4);
  const hasMoreRecords = historyList.length > 4;

  return (
    <div>
      {!showAll && hasMoreRecords && (
        <div className="mt-4 text-right">
          <Link href="/dashboard/history">
            <Button variant="ghost">
              View All History ({historyList.length} total) <IconArrowRight/>
            </Button>
          </Link>
        </div>
      )}
      <Table>
        <TableCaption>
          {showAll ? "All Consultation Reports" : "Recent Consultation Reports"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>AI Medical Specialist</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayList.map((record: SessionDetail, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{record.selectedDoctor.specialist}</TableCell>
              <TableCell>{record.notes}</TableCell>
              <TableCell>{moment(new Date(record.createdOn)).fromNow()}</TableCell>
              <TableCell className="text-right"><ViewReportDialog record={record}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable