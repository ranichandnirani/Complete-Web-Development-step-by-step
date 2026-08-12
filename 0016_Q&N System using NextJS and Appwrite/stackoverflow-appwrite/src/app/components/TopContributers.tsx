import { cn } from "@/lib/utils";

import { AnimatedList } from "@/components/magicui/animated-list";
import { users } from "@/models/server/config";
import { Models, Query } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";
import { avatars } from "@/models/client/config";
import Link from "next/link";
import slugify from "@/utils/slugify";

const Notification = ({ user }: { user: Models.User<UserPrefs> }) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-100 transform cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
            )}
        >
            <div className="flex min-w-0 flex-row items-center gap-3">
                <picture className="shrink-0">
                    <img
                        src={avatars.getInitials(user.name, 40, 40)}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                    />
                </picture>
                <div className="flex min-w-0 flex-1 flex-col">
                    <figcaption className="flex min-w-0 flex-wrap items-center gap-x-1 text-lg font-medium dark:text-white">
                        <Link
                            href={`/users/${user.$id}/${slugify(user.name)}`}
                            className="truncate text-sm hover:text-orange-500 sm:text-lg"
                        >
                            {user.name}
                        </Link>
                        <span aria-hidden="true" className="text-gray-500">·</span>
                        <span className="text-xs text-gray-500">
                            {convertDateToRelativeTime(new Date(user.$updatedAt))}
                        </span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        <span>Reputation</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{user.prefs.reputation}</span>
                    </p>
                </div>
            </div>
        </figure>
    );
};

export default async function TopContributers() {
    const topUsers = await users.list<UserPrefs>([Query.limit(10)]);

    return (
        <div className="bg-background relative flex max-h-100 min-h-100 w-full max-w-lg flex-col overflow-hidden rounded-lg p-6 shadow-lg">
            <AnimatedList>
                {topUsers.users.map(user => (
                    <Notification user={user} key={user.$id} />
                ))}
            </AnimatedList>
        </div>
    );
}