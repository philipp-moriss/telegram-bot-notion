import { Client } from "@notionhq/client";

export class tasksService {
  notion: Client;

  constructor() {

    const notion = new Client({ auth: secretKey });

    if (!notion) {
      throw new Error("Notion didn't initialized");
    }

    this.notion = notion;
  }

  async getTodayTasks() {
    try {
  
      const fullOrPartialPages = await this.notion.databases.query({
        database_id: allTasksDatabase,
      });
      //@ts-ignore
      const tasksArray = fullOrPartialPages.results.map((page) => {
        //@ts-ignore
        const icon = page?.icon?.emoji;
        //@ts-ignore
        const title = page.properties.Name.title.map((property) => {
          return property["plain_text"];
        })[0];

        const task = {
          icon,
          title,
        };

        return task;
      });

      return tasksArray

    } catch (error) {
      console.log("ERROR", error);
    }
  }
}
