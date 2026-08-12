import { avatars } from "@/models/client/config";
import { users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import convertDateToRelativeTime from "@/utils/relativeTime";
import React from "react";
import EditButton from "./EditButton";
import Navbar from "./Navbar";
import { IconClockFilled, IconUserFilled } from "@tabler/icons-react";

const Layout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ userId: string; userSlug: string }>;
}) => {
    const { userId } = await params;
    const user = await users.get<UserPrefs>(userId);

    return (
        <div className="container mx-auto w-full space-y-5 px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
                <div className="h-24 w-24 shrink-0 sm:h-32 sm:w-32">
                    <picture className="block w-full">
                        <img
                            src={avatars.getInitials(user.name, 200, 200)}
                            alt={user.name}
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </picture>
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 space-y-0.5">
                            <h1 className="break-words text-2xl font-bold sm:text-3xl">{user.name}</h1>
                            <p className="break-all text-base text-gray-500 sm:text-lg">{user.email}</p>
                            <p className="flex flex-wrap items-center gap-1 text-sm font-bold text-gray-500">
                                <IconUserFilled className="w-4 shrink-0" /> Dropped{" "}
                                {convertDateToRelativeTime(new Date(user.$createdAt))},
                            </p>
                            <p className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
                                <IconClockFilled className="w-4 shrink-0" /> Last activity&nbsp;
                                {convertDateToRelativeTime(new Date(user.$updatedAt))}
                            </p>
                        </div>
                        <div className="shrink-0 self-start">
                            <EditButton />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex min-w-0 flex-col gap-4 lg:flex-row">
                <Navbar />
                <div className="min-w-0 flex-1">{children}</div>
            </div>
        </div>
    );
};

export default Layout;