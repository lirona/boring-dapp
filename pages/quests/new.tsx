import { ethers } from "ethers";
import React, { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { tokenList } from "../../constants";
import { useAppState } from "../../context/AppStateProvider";
import { getTokenAddressFromSymbol, getUrlFromCid } from "../../utils/helpers";
import IpfsService from "../../utils/IpfsService";
import { QuestDetails } from "../../utils/types";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function NewQuestPage() {
  const [processing, setProcessing] = useState(false);
  const { contractService } = useAppState();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numOfUsers: 1,
      title: "",
      description: "",
      image: null,
      location: "",
      bountyToken: "",
      bountyAmount: "",
      timeToComplete: "",
      additionalInfo: "",
      communicationChannelLink: "",
    },
  });
  const ipfsService = useMemo(() => new IpfsService(), []);
  const numOfUsers = watch("numOfUsers");

  const onSubmit = useCallback(
    async (data) => {
      if (contractService) {
        setProcessing(true);
        const imageUrl = await uploadImageToIpfs(data.image);
        const detailsObj: QuestDetails = {
          title: data.title,
          description: data.description,
          location: data.location,
          additionalInfo: data.additionalInfo,
          communicationChannelLink: data.communicationChannelLink,
          imageUrl: imageUrl,
        };
        const detailsIpfsCid = await ipfsService.pinFile(
          JSON.stringify(detailsObj)
        );
        const tokenSelected = data.bountyToken != "" && !!data.bountyAmount;
        const success = await contractService.createQuest({
          ipfsHash: detailsIpfsCid,
          timeToComplete: data.timeToComplete,
          tokenAddress: tokenSelected
            ? getTokenAddressFromSymbol(data.bountyToken)
            : ethers.constants.AddressZero,
          tokenAmount: tokenSelected ? data.bountyAmount : 0,
          numberOfUsers: data.numOfUsers,
        });
        if (success) {
          toast.success("Quest created!");
          router.push("/quests");
        } else {
          toast.error("Something went wrong.");
        }
        setProcessing(false);
      } else {
        toast.error("Sign in to continue.");
      }
    },
    [contractService, ipfsService]
  );

  const [uploadedFile, setUploadedFile] = useState("");

  const removeImage = async () => {
    setUploadedFile(null);
  };

  const uploadImageToIpfs = async (image: File): Promise<string> =>
    new Promise((resolve, _) => {
      try {
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(image);
        reader.onloadend = async () => {
          const cid = await ipfsService.pinFile(reader.result as string);
          resolve(getUrlFromCid(cid));
        };
      } catch (err) {
        console.log(err);
        resolve(null);
      }
    });

  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue("image", acceptedFiles[0]);
      setUploadedFile(URL.createObjectURL(acceptedFiles[0]));
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <section className="container">
      <div className="bg-base-100 w-full rounded-xl my-12 p-8">
        <h1 className="text-3xl text-primary text-center font-semibold mb-8">
          Create New Quest
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-8 "
        >
          <div className="md:w-1/3">
            <div
              {...getRootProps({
                className: `border-dashed ${
                  isDragActive ? "border-blue-300" : "border-base-200"
                } border-2 w-full h-80 rounded flex flex-col justify-center items-center`,
              })}
            >
              <input {...getInputProps()} {...register("image")} />
              <i className="ri-upload-cloud-2-line text-4xl text-base-300"></i>

              <span className="block text-xl text-base-300">
                Drop your files here
              </span>
            </div>

            {uploadedFile && (
              <div className="relative flex flex-col justify-center items-center border border-base-200 mt-4">
                <button
                  className="absolute right-0 top-0 w-4 h-4 flex justify-center items-center translate-x-1/2 -translate-y-1/2 p-[10px] bg-red-500 text-white rounded-full"
                  onClick={removeImage}
                >
                  <i className="ri-close-line text-base"></i>
                </button>
                <img src={uploadedFile} />
              </div>
            )}
          </div>
          <div className="md:w-2/3">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                {...register("title", { required: "This field is required." })}
                type="text"
                placeholder="Enter quest title"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-error text-sm">
                  {errors.title?.message}
                </span>
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: "This field is required.",
                })}
                rows={3}
                placeholder="Enter detailed quest description"
                className="input input-bordered w-full h-auto"
              />
              <label className="label">
                <span className="label-text-alt text-error text-sm">
                  {errors.description?.message}
                </span>
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Number of participants</span>
              </label>
              <input
                {...register("numOfUsers", {
                  required: "This field is required.",
                  min: {
                    message: "1 or more participants required.",
                    value: 1,
                  },
                })}
                type="number"
                placeholder="Enter detailed quest description"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-error text-sm">
                  {errors.numOfUsers?.message}
                </span>
              </label>
            </div>
            {!!numOfUsers && numOfUsers > 1 && (
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Communication channel link for co-ordination
                  </span>
                </label>
                <input
                  {...register("communicationChannelLink", {
                    required: {
                      message: "This field is required.",
                      value: !!numOfUsers && numOfUsers > 1,
                    },
                  })}
                  placeholder="Discord/Telegram/Whatsapp invite link"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  <span className="label-text-alt text-error text-sm">
                    {errors.communicationChannelLink?.message}
                  </span>
                </label>
              </div>
            )}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                {...register("location", {
                  required: "This field is required.",
                })}
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-error text-sm">
                  {errors.location?.message}
                </span>
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Estimated time to complete</span>
              </label>
              <input
                {...register("timeToComplete", {
                  required: "This field is required.",
                  min: {
                    message: "1 or more hours required.",
                    value: 1,
                  },
                })}
                type="number"
                step="any"
                placeholder="Enter estimated hours"
                className="input input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-error text-sm">
                  {errors.timeToComplete?.message}
                </span>
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Additional info</span>
              </label>
              <textarea
                {...register("additionalInfo")}
                rows={3}
                placeholder="Additional info"
                className="input input-bordered w-full h-auto"
              />
            </div>
            <div
              tabIndex={0}
              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-8"
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Sponsor the quest (Optional)
              </div>
              <div className="collapse-content">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Bounty token</span>
                  </label>
                  <select
                    {...register("bountyToken")}
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
              </div>
            </div>
            <div className="form-control w-full mt-4">
              <button
                className={`btn btn-primary text-white ${
                  processing ? "loading" : ""
                }`}
                type="submit"
                disabled={processing}
              >
                Create Quest
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default NewQuestPage;
