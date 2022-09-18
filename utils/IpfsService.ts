import { create, IPFSHTTPClient } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

class IpfsService {
  private client: IPFSHTTPClient;

  constructor() {
    this.client = create({
      host: process.env.NEXT_PUBLIC_IPFS_HOST,
      port: 5001,
      protocol: process.env.NODE_ENV === "development" ? "http" : "https",
      headers:
        process.env.NODE_ENV === "development"
          ? null
          : {
              authorization: auth,
            },
    });
  }

  async pinFile(file: string): Promise<string> {
    try {
      const created = await this.client.add(Buffer.from(file), {});
      return created.path;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getJson(url: string) {
    try {
      const resp = await fetch(url);
      return resp.json();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default IpfsService;
