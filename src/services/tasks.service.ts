import { Client } from "@notionhq/client";
import { pageDateParser } from "../helpers/dateparsers/page.dateparser";

export class tasksService {
  notion: Client;

  constructor() {
    const notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

    if (!notion) {
      throw new Error("Notion didn't initialized");
    }

    this.notion = notion;
  }

  async getTodayTasks() {
    try {
      const formattedDate = new Date().toISOString().slice(0, 10);

      const fullOrPartialPages = await this.notion.databases.query({
        database_id: process.env.ALL_TASKS_DATABASE ?? "non-db-id",
        filter: {
          property: "Date",
          date: {
            equals: formattedDate,
          },
        },
      });

      const tasksArray = fullOrPartialPages.results.map((page) => {
        return pageDateParser(page);
      });

      return tasksArray;
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  async getAllTasks() {
    try {
      const fullOrPartialPages = await this.notion.databases.query({
        database_id: process.env.ALL_TASKS_DATABASE ?? "non-db-id",
      });

      const tasksArray = fullOrPartialPages.results.map((page) => {
        return pageDateParser(page);
      });

      return tasksArray;
    } catch (error) {
      console.log("ERROR", error);
    }
  }
}
