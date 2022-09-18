import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useAppState } from "../../context/AppStateProvider";
import { Quest } from "../../utils/SeedsOnEarthContractService";
import {
  getTokenSymbolFromAddress,
  hasUserJoinedQuest,
} from "../../utils/helpers";
import { QuestStatus } from "../../utils/types";
import SponsorQuestForm from "../../components/SponsorQuestForm";
import PickupQuestForm from "../../components/PickupQuestForm";
import CompleteQuestForm from "../../components/CompleteQuestForm";
import Loader from "../../components/Loader";
import { ethers } from "ethers";
import { toast } from "react-toastify";

function QuestPage() {
  const {
    query: { id },
    reload,
  } = useRouter();
  const { contractService, user, web3Auth } = useAppState();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (contractService) {
        const quest = await contractService.getQuest(parseInt(id as string));
        if (quest) {
          setQuest(quest);
        }
      }
      setLoading(false);
    })();
  }, [contractService, id]);

  const joinQuest = useCallback(async () => {
    setProcessing(true);
    const success = await contractService.joinQuest(parseInt(id as string));
    if (success) {
      toast.success("Quest Sponsored!");
      reload();
    } else {
      toast.error("Something went wrong.");
    }
    setProcessing(false);
  }, [contractService, id]);

  const renderMessage = (message: string) => {
    return (
      <div className="alert alert-info my-4 text-info-content">
        <div>
          <i className="ri-information-fill"></i>
          <span>{message}</span>
        </div>
      </div>
    );
  };

  const renderButton = (quest: Quest) => {
    switch (quest.status) {
      case QuestStatus.CREATED:
        return <SponsorQuestForm id={parseInt(id as string)} />;
      case QuestStatus.PENDING:
        return hasUserJoinedQuest(user?.address, quest) ? (
          renderMessage("Waiting for more members to join.")
        ) : (
          <button
            className={`btn btn-primary w-full text-white mt-4 ${
              processing ? "loading" : ""
            }`}
            onClick={joinQuest}
            disabled={processing}
          >
            I will take the quest
          </button>
        );
      case QuestStatus.READYTOPICKUP:
        return hasUserJoinedQuest(user?.address, quest) ? (
          <PickupQuestForm questId={parseInt(id as string)} />
        ) : (
          renderMessage("You have not joined this quest.")
        );
      case QuestStatus.PICKEDUP:
        return hasUserJoinedQuest(user?.address, quest) ? (
          <CompleteQuestForm questId={parseInt(id as string)} />
        ) : (
          renderMessage("You have not joined this quest.")
        );
      case QuestStatus.COMPLETED || QuestStatus.PAIDOUT:
        return renderMessage("This quest is completed.");
      case QuestStatus.DISMISSED:
        return renderMessage("This quest is currently unavailable.");
      default:
        break;
    }
  };
  if (loading || web3Auth.status === "not_ready")
    return (
      <div className="flex w-full">
        <Loader />
      </div>
    );

  if (!quest)
    return (
      <div className="container alert alert-error shadow-lg h-[fit-content] my-12">
        <div className="">
          <i className="ri-error-warning-fill"></i>
          <span>Could not fetch the quest.</span>
        </div>
      </div>
    );

  return (
    <section className="container flex flex-col md:flex-row py-12">
      <div className="md:w-1/2 py-8 md:py-0">
        <img src={quest.imageUrl || "/placeholder.png"} />
      </div>
      <div className="md:w-1/2 md:px-8">
        <h1 className="text-3xl mb-4">{quest.title}</h1>
        <div className="text-xl">{parse(quest.description)}</div>
        <div className="stats w-full text-center stats-vertical lg:stats-horizontal shadow my-4">
          <div className="stat px-3">
            <div className="stat-title">Bounty</div>
            <div className="stat-value lg:text-xl">
              {quest.token == ethers.constants.AddressZero
                ? "-"
                : `${quest.amount} ${getTokenSymbolFromAddress(quest.token)}`}
            </div>
          </div>
          <div className="stat px-3">
            <div className="stat-title">Duration</div>
            <div className="stat-value lg:text-xl">
              {quest.timeToComplete.toString()}h
            </div>
          </div>
          <div className="stat px-3">
            <div className="stat-title">Location</div>
            <div className="stat-value lg:text-xl">{quest.location}</div>
          </div>
          <div className="stat px-3">
            <div className="stat-title">Members</div>
            <div className="stat-value lg:text-xl">{quest.numOfUsers}</div>
            <div className="stat-desc">
              {quest.numOfUsers - quest.users.length > 0
                ? `${quest.numOfUsers - quest.users.length} remaining`
                : "Full"}
            </div>
          </div>
        </div>
        {quest.additionalInfo && (
          <p className="my-4 text-lg">{quest.additionalInfo}</p>
        )}
        {quest.communicationChannelLink &&
          hasUserJoinedQuest(user?.address, quest) && (
            <p className="my-2 text-lg">
              Communication channel: {quest.communicationChannelLink}
            </p>
          )}
        {renderButton(quest)}
      </div>
    </section>
  );
}

export default QuestPage;
