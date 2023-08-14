import mongoose from "mongoose";

interface IFileJson {
  name: string;
  local: string;
  data: string;
}

interface IChildFileJson {
  org_file_id: string;
  name: string;
  data?: string;
  local: string;
}

const fileJson = new mongoose.Schema<IFileJson>({
  name: { type: String, required: true },
  local: { type: String, required: true },
  data: { type: String, required: true },
});

const childFileJson = new mongoose.Schema<IChildFileJson>({
  org_file_id: { type: String, required: true },
  name: { type: String, required: true },
  data: { type: String, required: true },
  local: { type: String, required: true },
});

export const FileJson = mongoose.model("file", fileJson);

export const ChildFileJson = mongoose.model("subFile", childFileJson);
