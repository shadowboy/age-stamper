import { UserEvent } from "../types";

const UserEventKey = "UserEventKey";
class UserEventMgr {

  protected greet = "hello";

  // public constructor() {

  // }

  public addNew(event: UserEvent): boolean {
    try {
      const userEvents: UserEvent[] = this.getAll();
      userEvents.push(event);
      localStorage.setItem(UserEventKey, JSON.stringify(userEvents));
      return true;
    } catch (e) {
      return false;
    }
  }

  public addExample(): boolean {
    const userEvent: UserEvent = {
      id: "1",
      entity: "Tom",
      start: "2015-06-03",
      scene: 0,
      image: "scene_company.jpg",
      count: 0,
      status: "",
      timeFormat: "year"
    };
    return this.addNew(userEvent);
  }

  public getAll(): UserEvent[] {
    try {
      if (localStorage.getItem(UserEventKey)) {
        return JSON.parse(localStorage.getItem(UserEventKey) as string) as UserEvent[];
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }
}

export default UserEventMgr;
