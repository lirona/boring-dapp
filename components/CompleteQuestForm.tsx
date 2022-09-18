import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppState } from "../context/AppStateProvider";
import FileInput from "./FileInput";
import Modal from "./Modal";

type Props = { questId: number };

const CompleteQuestForm = ({ questId }: Props) => {
  const { contractService } = useAppState();
  const [fileUrl, setFileUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const completeQuest = async () => {
    if (fileUrl) {
      setProcessing(true);
      const success = await contractService.completeQuest(questId, fileUrl);
      if (success) {
        toast.success("Quest Completed!");
        router.reload();
      } else {
        toast.error("Something went wrong.");
      }
      setProcessing(false);
    }
  };

  return (
    <>
      <label
        htmlFor="pickup-quest-modal"
        className="btn btn-primary w-full text-white mt-4 modal-button"
      >
        Complete the quest
      </label>
      <Modal
        id="pickup-quest-modal"
        heading="Upload image/video of the final state"
        action={
          <button
            className={`btn ${processing ? "loading" : ""}`}
            onClick={completeQuest}
            disabled={!fileUrl || processing}
          >
            Submit and Complete
          </button>
        }
      >
        <FileInput setfileIpfsUrl={setFileUrl} />
      </Modal>
    </>
  );
};

export default CompleteQuestForm;
