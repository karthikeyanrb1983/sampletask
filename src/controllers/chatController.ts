/** @format */

import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { AppDataSource } from "../data-source";
import { Chat } from "../entities/Chat";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const importChat = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const repo = AppDataSource.getRepository(Chat);

    const chatRecords = data.map((row: any) => {
      const sender = row.sender;
      const message = row.message;
      const timestamp = row.timestamp;

      if (!sender || !message || !timestamp) {
        throw new Error(
          "Each row must include sender, message, and timestamp."
        );
      }

      return repo.create({
        sender: String(sender),
        message: String(message),
        timestamp: new Date(timestamp),
      });
    });

    await repo.save(chatRecords);

    res.status(201).json({
      message: "Chat imported successfully",
      importedCount: chatRecords.length,
    });
  } catch (err: any) {
    console.error("Import Chat Error:", err);
    res.status(400).json({
      message: err.message || "Error importing chat",
    });
  }
};
