import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppState } from "../context/AppStateProvider";
import FileInput from "./FileInput";
import Modal from "./Modal";

type Props = { questId: number };

const PickupQuestForm = ({ questId }: Props) => {
  const [processing, setProcessing] = useState(false);
  const { contractService } = useAppState();
  const [fileUrl, setFileUrl] = useState("");
  const router = useRouter();

  const pickupQuest = async () => {
    if (fileUrl) {
      setProcessing(true);
      const success = await contractService.pickupQuest(questId, fileUrl);
      if (success) {
        toast.success("Quest Started!");
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
        Start the quest
      </label>
      <Modal
        id="pickup-quest-modal"
        heading="Upload image/video of the initial state"
        action={
          <button
            className={`btn ${processing ? "loading" : ""}`}
            onClick={pickupQuest}
            disabled={!fileUrl || processing}
          >
            Submit and Start
          </button>
        }
      >
        <FileInput setfileIpfsUrl={setFileUrl} />
      </Modal>
    </>
  );
};

export default PickupQuestForm;
