import { UserEvent } from '@/types';
import UserEventMgr from "../../src/utils/UserEventMgr"

describe("user events management", () => {
    it('test add items and reset', () => {
        const um = new UserEventMgr();
        const event1: UserEvent = {
            id: '1',
            entity: "Demo",
            start: "2015-06-03",
            scene: 1,
            image: "scene_company.jpg",
            count: 0,
            status: "",
            timeFormat: "year"
        };

        const event2 = {
            id: '2',
            entity: "Demo",
            start: "2015-08-05",
            scene: 2,
            image: "scene_company.jpg",
            count: 0,
            status: "",
            timeFormat: "year"
        };
        um.addNew(event1);
        um.addNew(event2);
        expect(um.load().length).toBe(2);
        um.reset();
        expect(um.load().length).toBe(0);
    });
    it('test remove item ', () => {
        const um = new UserEventMgr();
        for (let i = 0; i < 4; i++) {
            const event: UserEvent = {
                id: i + '',
                entity: "Demo",
                start: "2015-06-03",
                scene: 1,
                image: "scene_company.jpg",
                count: 0,
                status: "",
                timeFormat: "year"
            };
            um.addNew(event);
        }
        um.remove('2');
        expect(um.load().length).toBe(3);
        um.reset();
    });
    it('get specific item ', () => {
        const um = new UserEventMgr();
        for (let i = 0; i < 4; i++) {
            const event: UserEvent = {
                id: i + '',
                entity: "Demo",
                start: "2015-06-03",
                scene: 1,
                image: "scene_company.jpg",
                count: 0,
                status: "",
                timeFormat: "year"
            };
            um.addNew(event);
        }
        const item: UserEvent = um.getBy('2');
        expect(item.entity).toBe('Demo');
        um.reset();
    });

    it('modify specific item ', () => {
        const um = new UserEventMgr();
        for (let i = 0; i < 4; i++) {
            const event: UserEvent = {
                id: i + '',
                entity: "Demo",
                start: "2015-06-03",
                scene: 1,
                image: "scene_company.jpg",
                count: 0,
                status: "",
                timeFormat: "year"
            };
            um.addNew(event);
        }
        const item: UserEvent = um.getBy('2');
        const newEventItem: UserEvent = {
            id: '2',
            entity: "Happy",
            start: "2015-06-03",
            scene: 1,
            image: "scene_company.jpg",
            count: 0,
            status: "",
            timeFormat: "year"
        };

        um.update('2', newEventItem);
        const updatedItem: UserEvent = um.getBy('2');
        expect(updatedItem.entity).toBe('Happy');
        um.reset();
    });
});