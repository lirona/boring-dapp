import React from "react";
import { Quest } from "../utils/SeedsOnEarthContractService";
import QuestCard from "./QuestCard";

type Props = {
  quests: Quest[];
};

const QuestsGrid = ({ quests }: Props) => {
  return quests.length === 0 ? (
    <div className="container alert alert-info shadow-lg h-[fit-content] my-8">
      <div className="">
        <i className="ri-error-warning-fill"></i>
        <span>There are no available quests. :(</span>
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      {quests.map((quest) => (
        <QuestCard quest={quest} key={quest.id} />
      ))}
    </div>
  );
};

export default QuestsGrid;
