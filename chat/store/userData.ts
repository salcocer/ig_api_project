import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// {
//   "id": "26053413067623651",
//   "name": "Alejandro Alcocer",
//   "username": "stalynalejandro_alcocer",
//   "profile_picture_url": "https://scontent.cdninstagram.com/v/t51.82787-19/554558115_18052483499557975_2370044718553376715_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=110&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=MCeC27jZW6QQ7kNvwENUz-d&_nc_oc=AdmRoaf2ukp5XMYpfixt8kU-hv5g7cpTdPnrP-0W0VZ02N-a1ZyYwonalyXlYkvOXPs&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&edm=AP4hL3IEAAAA&_nc_gid=iVQFIqB2c1HWbt9JXJnX9w&_nc_tpa=Q5bMBQHk16BCFRA7dexsQKgAtTuzCA8q1paxDMKWgiD-b4iLhVqOv3hJqEDJHKIYxtZ5oOrAOhqTaPwq&oh=00_AfvztDmezruVFrWWfFLdf2_k4kjQvBoQEnTJpdxVbE38Xg&oe=699729A9",
//   "followers_count": 151,
//   "follows_count": 232,
//   "media_count": 67
// }

type UserData = {
    id: string;
    name: string;
    username: string;
    profile_picture_url: string;
    followers_count: number;
    follows_count: number;
    media_count: number;
};

export const useUserData = create(
    devtools(set => ({
        userData: null as UserData | null,
        setUserData: (newUserData: UserData) => set({ userData: newUserData }),
    }))
);
