"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UploadVideo from "./forms/UploadVideo";
import CreateGroup from "./forms/CreateGroup";
import { H4 } from "@/components/common/typography";
type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

interface dialogsData {
  btnText: string;
  dialogTitle: string;
  btnVariant: Variant;
  dialogForm: React.ComponentType<any>;
}

const dialogsData: dialogsData[] = [
  {
    btnText: "Upload video",
    dialogTitle: "Upload Video",
    btnVariant: "secondary",
    dialogForm: UploadVideo,
  },
  {
    btnText: "Create group",
    dialogTitle: "Create Group",
    dialogForm: CreateGroup,
    btnVariant: "default",
  },
];

export default function MainActions() {
  return (
    <div className="space-x-4">
      {dialogsData.map((data, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Button
              variant={data.btnVariant}
              type="button"
              className="p-8 active:scale-90 transition-transform"
            >
              <H4>{data.btnText}</H4>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{data.dialogTitle}</DialogTitle>
            </DialogHeader>
            <data.dialogForm />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
