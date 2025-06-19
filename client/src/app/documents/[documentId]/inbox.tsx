"use client";

import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { BellIcon } from "lucide-react";

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative" size="icon">
            <BellIcon className="size-5" />
            {inboxNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white text-bold flex items-center justify-center">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length === 0 ? (
            <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">
              No Notifications
            </div>
          ) : (
            <InboxNotificationList>
              {inboxNotifications.map((notify) => (
                <InboxNotification inboxNotification={notify} key={notify.id} />
              ))}
            </InboxNotificationList>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-6" />
    </Fragment>
  );
};

export const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <Fragment>
          <Button variant="ghost" className="relative" size="icon" disabled>
            <BellIcon className="size-5" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
        </Fragment>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
};
