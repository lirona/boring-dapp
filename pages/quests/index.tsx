import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import QuestsGrid from "../../components/QuestsGrid";
import { useAppState } from "../../context/AppStateProvider";
import { hasUserJoinedQuest } from "../../utils/helpers";
import { Quest } from "../../utils/SeedsOnEarthContractService";
import { QuestStatus } from "../../utils/types";

function QuestListPage() {
  const { contractService, user } = useAppState();
  const [tabIndex, setTabIndex] = useState(0);
  const [sponsoredQuests, setSponsoredQuests] = useState<Quest[]>([]);
  const [nonSponsoredQuests, setNonSponsoredQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (contractService) {
        setLoading(true);
        const quests = await contractService.getQuests();
        console.log(quests);
        const sponsored = [];
        const nonSponsored = [];
        for (const quest of quests) {
          if (hasUserJoinedQuest(user?.address, quest)) {
            continue;
          }
          if (quest.status == QuestStatus.CREATED) {
            nonSponsored.push(quest);
          } else {
            sponsored.push(quest);
          }
        }
        setSponsoredQuests(sponsored);
        setNonSponsoredQuests(nonSponsored);
      }
      setLoading(false);
    })();
  }, [contractService, user]);

  return (
    <section className="container py-12">
      <div className="flex justify-between">
        <div className="tabs tabs-boxed bg-transparent">
          <a
            className={`tab text-lg px-4 py-2 h-auto gap-2 ${
              tabIndex == 0 ? "tab-active" : ""
            }`}
            onClick={() => setTabIndex(0)}
          >
            Join a Quest
            <div className="badge badge-neutral gap-2">
              {sponsoredQuests.length}
            </div>
          </a>
          <a
            className={`tab text-lg px-4 py-2 h-auto gap-2 ${
              tabIndex == 1 ? "tab-active" : ""
            }`}
            onClick={() => setTabIndex(1)}
          >
            Sponsor a Quest
            <div className="badge badge-neutral gap-2">
              {nonSponsoredQuests.length}
            </div>
          </a>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <QuestsGrid
          quests={tabIndex == 0 ? sponsoredQuests : nonSponsoredQuests}
        />
      )}
    </section>
  );
}

export default QuestListPage;
