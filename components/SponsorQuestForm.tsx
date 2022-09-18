import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { tokenList } from "../constants";
import { useAppState } from "../context/AppStateProvider";
import { getTokenAddressFromSymbol } from "../utils/helpers";

type Props = {
  id: number;
};

const SponsorQuestForm = ({ id }: Props) => {
  const [processing, setProcessing] = useState(false);
  const { contractService } = useAppState();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bountyToken: "CELO",
      bountyAmount: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      if (data.bountyToken != "" && !!data.bountyAmount) {
        setProcessing(true);
        const success = await contractService.sponsorQuest({
          questId: id,
          tokenAddress: getTokenAddressFromSymbol(data.bountyToken),
          tokenAmount: data.bountyAmount,
        });
        if (success) {
          toast.success("Quest Sponsored!");
          router.reload();
        } else {
          toast.error("Something went wrong.");
        }
        setProcessing(false);
      }
    },
    [contractService, id]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col my-8">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Bounty token</span>
        </label>
        <select
          {...register("bountyToken", { required: "Token is required." })}
          className="select select-bordered w-full"
          defaultValue="CELO"
        >
          <option value="">Select token</option>
          {tokenList.map((token) => (
            <option value={token.symbol} key={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
        <label className="label">
          <span className="label-text-alt text-error text-sm">
            {errors.bountyToken?.message}
          </span>
        </label>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Bounty amount</span>
        </label>
        <input
          {...register("bountyAmount", {
            required: "Amount is required.",
            min: {
              message: "Amount should be more than 0",
              value: 0.000001,
            },
          })}
          type="number"
          step="any"
          placeholder="Enter bounty"
          className="input input-bordered w-full"
        />
        <label className="label">
          <span className="label-text-alt text-error text-sm">
            {errors.bountyAmount?.message}
          </span>
        </label>
      </div>
      <div className="form-control w-full mt-4">
        <button
          className={`btn btn-primary text-white ${
            processing ? "loading" : ""
          }`}
          disabled={processing}
          type="submit"
        >
          Sponsor Quest
        </button>
      </div>
    </form>
  );
};

export default SponsorQuestForm;
