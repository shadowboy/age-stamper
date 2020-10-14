import { UserEvent } from "../types";

const UserEventKey = "UserEventKey";
class UserEventMgr {

  protected greet = "hello";

  // public constructor() {

  // }

  public addNew(event: UserEvent): boolean {
    try {
      const userEvents: UserEvent[] = this.load();
      userEvents.push(event);
      localStorage.setItem(UserEventKey, JSON.stringify(userEvents));
      return true;
    } catch (e) {
      return false;
    }
  }

  public remove(id: string) {
    try {
      const userEvents: UserEvent[] = this.load();
      const results = userEvents.filter(item => item.id !== id);
      localStorage.setItem(UserEventKey, JSON.stringify(results));
      return true;
    } catch (e) {
      return false;
    }
  }
  public getBy(id: string): UserEvent {
    const userEvents: UserEvent[] = this.load();
    return userEvents.filter(item => item.id === id)[0];
  }

  public update(id: string, newItem: UserEvent) {
    const userEvents: UserEvent[] = this.load();
    // let item: UserEvent = userEvents.filter(item => item.id === id)[0];
    const index: number = userEvents.findIndex(item => item.id === id);
    userEvents[index] = newItem;
    // console.log('item', item);
    // console.log('newItem', newItem);
    console.log('userEvents', userEvents);
    this.save(userEvents);
    // console.log('userEvents', userEvents);
  }

  public load(): UserEvent[] {
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

  public save(data: UserEvent[]) {
    try {
      localStorage.setItem(UserEventKey, JSON.stringify(data));
    } catch (error) {
      return false;
    }
  }

  public reset(): void {
    localStorage.setItem(UserEventKey, JSON.stringify([]));
  }

  public addExample(): boolean {
    const userEvent: UserEvent = {
      id: "1",
      entity: "Demo",
      start: "2015-06-03",
      scene: 1,
      image: "scene_company.jpg",
      count: 0,
      status: "",
      timeFormat: "year"
    };
    return this.addNew(userEvent);
  }
}

export default UserEventMgr;
