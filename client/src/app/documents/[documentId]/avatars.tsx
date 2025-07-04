/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";
import {
  ClientSideSuspense,
  useOthers,
  useSelf,
} from "@liveblocks/react/suspense";

interface AvatarProps {
  src: string;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      style={{ width: 36, height: 36 }}
      className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-document-background rounded-full bg-gray-400"
    >
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
        {name}
      </div>
      <img
        src={src}
        alt={name}
        className="size-full rounded-full"
        loading="lazy"
      />
    </div>
  );
};

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length + (currentUser ? 1 : 0) <= 1) {
    return null;
  }

  return (
    <Fragment>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar name="You" src={currentUser.info.avatar} />
          </div>
        )}
        <div className="flex">
          {users.map(({ connectionId, info }) => {
            return (
              <Avatar key={connectionId} name={info.name} src={info.avatar} />
            );
          })}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </Fragment>
  );
};

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};
