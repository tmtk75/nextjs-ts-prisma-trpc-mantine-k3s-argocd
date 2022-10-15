import { Box, Button, Container, TextInput, List } from "@mantine/core";
import { PrismaClient, User } from "@prisma/client";
import type { NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

interface Props {
  users: User[];
}

const Home: NextPage<Props> = (props: Props) => {
  const { users } = props;
  const hello = trpc.hello.useQuery({ text: "Alice" });
  const createUser = trpc.createUser.useMutation();
  const [name, setName] = useState("");

  if (!hello.data) {
    return <>Loading...</>;
  }
  return (
    <Container>
      <div>posts.length: {users?.length}</div>
      <List withPadding>
        {users?.map((p) => (
          <List.Item key={p.id}>
            {p.id}: {p.name} ({p.email})
          </List.Item>
        ))}
      </List>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextInput
          placeholder="Your name"
          value={name}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setName(e.target.value);
          }}
        />
        <Button
          onClick={async () => {
            await createUser.mutateAsync({ name });
          }}
        >
          create a new user
        </Button>
      </Box>
      <div>greeting: {hello?.data?.greeting}</div>
    </Container>
  );
};

export default Home;

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  prisma.$disconnect();
  return {
    props: { users },
  };
}
