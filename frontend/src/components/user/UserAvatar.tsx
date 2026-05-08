import { authClient } from "@/lib/auth-client";
import { Image, type MantineRadius } from "@mantine/core";

interface AvatarProps {
  size?: number;
  radius?: string | MantineRadius;
}

const UserAvatar = ({ size = 30, radius = "100%" }: AvatarProps) => {
  const { data } = authClient.useSession();

  return (
    <div>
      <Image
        src={
          data?.user.image ??
          "https://64.media.tumblr.com/c09da35c8071e842fd4df4a5fb492bbe/bd3be9c1b99ed113-4f/s400x600/e493c13b9fec973ea8d14b8629e069e3c06b0b58.jpg"
        }
        h={size}
        w={size}
        fit="cover"
        radius={radius}
      />
    </div>
  );
};

export default UserAvatar;
