import { createThread, findAllThread } from "@/modules/thread/thread.service";
import type { CreateThreadInput } from "@/modules/thread/thread.schema";
import type { Request, Response } from "express";

export const threadController = {
  create: async (req: Request, res: Response) => {
    const authorId = req.user!.id;
    const { title, content, communityId } = req.body as CreateThreadInput;

    const thread = await createThread({
      title,
      content,
      communityId,
      authorId,
    });

    return res.status(201).json({
      success: true,
      message: "thread created succesfully",
      data: thread,
    });
  },

  lists: async (req: Request, res: Response) => {
    const authorId = req.user!.id;
    const { page, limit, search } = req.query;

    const result = await findAllThread({
      authorId,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search: typeof search === "string" ? search : undefined,
    });

    return res.status(200).json({
      success: true,
      message: "thread retrieved succesfully",
      data: result.data,
      meta: result.meta,
    });
  },
};
