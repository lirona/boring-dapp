import React from "react";
import Link from "next/link";
import { Quest } from "../utils/SeedsOnEarthContractService";
import { getTokenSymbolFromAddress } from "../utils/helpers";
import { ethers } from "ethers";

type Props = {
  quest: Quest;
};

const QuestCard = ({ quest }: Props) => {
  return (
    <Link href={`/quests/${quest.id}`}>
      <a className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img src={quest.imageUrl || "/placeholder.png"} alt={quest.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{quest.title}</h2>
          <div className="stats stats-vertical shadow">
            <div className="stat text-center px-3">
              <div className="stat-title">Bounty</div>
              <div className="stat-value md:text-xl">
                {quest.token == ethers.constants.AddressZero
                  ? "-"
                  : `${quest.amount} ${getTokenSymbolFromAddress(quest.token)}`}
              </div>
            </div>
            <div className="stat text-center px-3">
              <div className="stat-title">Duration</div>
              <div className="stat-value md:text-xl">
                {quest.timeToComplete.toString()}h
              </div>
            </div>
            <div className="stat text-center px-3">
              <div className="stat-title">Location</div>
              <div className="stat-value md:text-xl">{quest.location}</div>
            </div>
            <div className="stat text-center px-3">
              <div className="stat-title">Members</div>
              <div className="stat-value md:text-xl">{quest.numOfUsers}</div>
              <div className="stat-desc">
                {quest.numOfUsers - quest.users.length > 0
                  ? `${quest.numOfUsers - quest.users.length} remaining`
                  : "Full"}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default QuestCard;
