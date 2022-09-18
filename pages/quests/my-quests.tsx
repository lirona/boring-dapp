import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import QuestsGrid from "../../components/QuestsGrid";
import { useAppState } from "../../context/AppStateProvider";
import { Quest } from "../../utils/SeedsOnEarthContractService";
import { QuestStatus } from "../../utils/types";

const tabs = ["PICKEDUP", "COMPLETED"];
const MyQuests = () => {
  const { contractService, user } = useAppState();
  const [tabIndex, setTabIndex] = useState(0);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [upcomingQuests, setUpcomingQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (contractService && user?.address) {
        setLoading(true);
        const quests = await contractService.getQuestsForUser();
        if (quests) {
          const active = [];
          const completed = [];
          const upcoming = [];
          quests.forEach((quest) => {
            if (quest.status == QuestStatus.PICKEDUP) {
              active.push(quest);
            } else if (
              quest.status == QuestStatus.CREATED ||
              quest.status == QuestStatus.READYTOPICKUP ||
              quest.status == QuestStatus.PENDING
            ) {
              upcoming.push(quest);
            } else {
              completed.push(quest);
            }
          });
          setCompletedQuests(completed);
          setActiveQuests(active);
          setUpcomingQuests(upcoming);
        }
      }
      setLoading(false);
    })();
  }, [contractService, user]);

  const getQuestsForCurrentTab = useCallback(() => {
    if (tabIndex == 0) {
      return activeQuests;
    } else if (tabIndex == 1) {
      return upcomingQuests;
    } else {
      return completedQuests;
    }
  }, [tabIndex, activeQuests, upcomingQuests, completedQuests]);

  return (
    <section className="container py-12">
      <div className="tabs tabs-boxed bg-transparent">
        <a
          className={`tab text-lg px-4 py-2 h-auto gap-2 ${
            tabIndex == 0 ? "tab-active" : ""
          }`}
          onClick={() => setTabIndex(0)}
        >
          Active Quests
          <div className="badge badge-info gap-2">{activeQuests.length}</div>
        </a>
        <a
          className={`tab text-lg px-4 py-2 h-auto gap-2 ${
            tabIndex == 1 ? "tab-active" : ""
          }`}
          onClick={() => setTabIndex(1)}
        >
          Upcoming
          <div className="badge badge-warning gap-2">
            {upcomingQuests.length}
          </div>
        </a>
        <a
          className={`tab text-lg px-4 py-2 h-auto gap-2 ${
            tabIndex == 2 ? "tab-active" : ""
          }`}
          onClick={() => setTabIndex(2)}
        >
          Completed Quests
          <div className="badge badge-success gap-2">
            {completedQuests.length}
          </div>
        </a>
      </div>
      {loading ? <Loader /> : <QuestsGrid quests={getQuestsForCurrentTab()} />}
    </section>
  );
};

export default MyQuests;
