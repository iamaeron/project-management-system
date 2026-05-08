import { authClient } from "@/lib/auth-client";
import { Button, Card, Center, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { data } = authClient.useSession();
  const nav = useNavigate();

  useEffect(() => {
    if (data) {
      nav("/creator/dashboard");
    }
  }, [data]);

  const handleSignIn = async () => {
    const d = await authClient.signIn.magicLink({
      email,
      callbackURL: `${window.location.origin}/creator/dashboard`,
    });

    if (!d.error) {
      setEmailSent(true);
    }
  };

  return (
    <Center h="100vh" bg="#e4e4e7" style={{ flexDirection: "column" }}>
      {emailSent ? (
        <Card shadow="sm" p="lg" radius="md">
          <Text size="lg" fw={500}>
            Magic link sent. Please check your inbox.
          </Text>
        </Card>
      ) : (
        <>
          <Text fw={600} size="xl">
            ProManSys
          </Text>
          <Text fw={500} mb={20} size="sm">
            Log in to your account.
          </Text>
          <Card w={400}>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              label="Email"
            />
            <Button fullWidth mt="md" onClick={handleSignIn}>
              Continue
            </Button>
          </Card>
        </>
      )}
    </Center>
  );
};

export default Landing;
